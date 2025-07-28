import { setTimeout } from "timers/promises";

export function timeout(ms: number, onTimeout: () => unknown) {
  const controller = new AbortController();
  const promise = setTimeout(ms, {}, { signal: controller.signal })
    .catch(() => {})
    .finally(() => {
      if (controller.signal.aborted) return;
      return onTimeout();
    });
  return { promise, abort: controller.abort.bind(controller) };
}
