import { setTimeout } from "timers/promises";

const logController = new AbortController();
setTimeout(10 * 1000, {}, { signal: logController.signal })
  .catch(() => {})
  .finally(() => {
    if (logController.signal.aborted) return;
    console.log("timeout");
  });

console.log("1");
logController.abort();
console.log("2");
