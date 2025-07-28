import type { Plugin } from "../api-types.ts";

const removeTelemetryHeaders: Plugin = {
  name: "remove-telemetry-headers",
  transformHeaders(args) {
    const keys = Array.from(args.headers.keys());
    for (const key of keys) {
      if (key.toLowerCase().startsWith("x-stainless-")) {
        console.log(key);
        args.headers.delete(key);
      }
    }
  },
};
export default removeTelemetryHeaders;
