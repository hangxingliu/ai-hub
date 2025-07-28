import type { StorageManager } from "../storage/index.ts";

export function createHomePageRoute(storage: StorageManager) {
  return async function (req: Bun.BunRequest<"/">): Promise<Response> {
    return new Response('Welcome to the AI hub server', { status: 200 });
  };
}
