import type { StorageManager } from "../storage/index.js";

export function createHomePageRoute(storage: StorageManager) {
  return async function (req: Bun.BunRequest<"/">): Promise<Response> {
    let keyword: string | null = null;
    try {
      keyword = new URL(req.url).searchParams.get("q");
      if (typeof keyword === 'string') {
        keyword = keyword.trim().toLowerCase();

        const resp = storage.models.getResponse(storage.config.override_model_owned_by);
        if (keyword) resp.data = resp.data.filter((it) => it.id.toLowerCase().includes(keyword!));
        return Response.json(resp);
      }
    } catch {
      // noop
    }

    return new Response('Welcome to the AI hub server', { status: 200 });
  };
}
