import type { Server } from "bun";
import type { PluginStateStorage } from "../plugins/types.js";
import { ALL_KNOWN_ROUTES, type KnownRouteInfo, type KnownRouteNames } from "../well-known/known-routes.js";
import { prepareProxyReqToUpstream, proxyReqToUpstream } from "./base/proxy.js";
import type { StorageManager } from "../storage/index.js";
import type { ParsedAIUpstream } from "../config/parsers/ai-upstream.js";
import { RESP_METHOD_NOT_ALLOWED, RESP_NOT_FOUND } from "./base/basic-responses.js";
import { printIncomingForProxy } from "./base/incoming-print.js";

export function createWellKnownRouteProxy(storage: StorageManager, routeName: KnownRouteNames) {
  const routeInfo = ALL_KNOWN_ROUTES[routeName] as KnownRouteInfo;

  let allowPOST = false;
  let shouldBeForm = false;
  let shouldBeJSON = false;
  const allowedMethod: Uppercase<string>[] = [];

  if (routeInfo.POST_ANY) {
    allowPOST = true;
  } else {
    if (routeInfo.POST_FORM) {
      allowPOST = true;
      shouldBeForm = true;
    }
    if (routeInfo.POST_JSON) {
      allowPOST = true;
      shouldBeJSON = true;
    }
  }
  if (routeInfo.GET) allowedMethod.push("GET");
  if (allowPOST) allowedMethod.push("POST");
  if (routeInfo.DELETE) allowedMethod.push("DELETE");
  if (routeInfo.PUT) allowedMethod.push("PUT");

  return async function wellKnownRoute(this: Server, req: Request, server: Server): Promise<Response> {
    const state: PluginStateStorage = {};

    const prepare = await prepareProxyReqToUpstream(storage, state, req, routeName, {
      allowedMethod,
      shouldBeForm,
      shouldBeJSON,
    });
    if ("resp" in prepare) return prepare.resp;

    const { body, method, url } = prepare;
    let info_key = method as keyof KnownRouteInfo;
    if (method === "POST") {
      if (body.json) info_key = "POST_JSON";
      else if (body.form) info_key = "POST_FORM";
      else info_key = "POST_ANY";
    }

    const info = routeInfo[info_key];
    if (!info) return RESP_METHOD_NOT_ALLOWED;
    const [_, ...types] = info;

    let upstream: ParsedAIUpstream | undefined;
    if (body.modelId) upstream = storage.getUpstreamByModel(body.modelId);
    if (!upstream) {
      const filtered = storage.filterUpstreamsByTypes(types);
      if (filtered.length === 0) {
        printIncomingForProxy(routeName, method, url, undefined, body.modelId);
        return RESP_NOT_FOUND;
      }

      let picked = filtered[0];
      for (const f of filtered) {
        if (!f.fallback) continue;
        picked = f;
        break;
      }
      upstream = picked;

      console.warn(`Picked the upstream "${upstream.name}" for the request "${method} ${routeName}"`);
    }

    url.pathname = url.pathname.replace(/^\/v1\//, "/");
    return await proxyReqToUpstream(storage, state, upstream, method, url, req.headers, body, routeName);
  };
}
