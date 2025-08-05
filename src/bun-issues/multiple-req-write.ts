import { request } from "https";

const jsonStr = JSON.stringify({ key: "val", key2: 200 });

const req = request(
  new URL("https://httpbin.org/post"),
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // "transfer-encoding": "chunked",
    },
  },
  (res) => {
    console.log(`got response: ${res.statusCode}`);
    console.log(res.headers);
    res.on("data", (it) => process.stdout.write(it.toString()));
    res.on("error", (e) => console.error(e));
    res.on("end", () => console.log("end"));
  }
);
req.on("error", (e) => console.error(e));

// single write work in bun:
// req.write(jsonStr);
// req.end();

// multiple writes doesn't work:
req.write(jsonStr.slice(0, 5));
console.log(`sent the first chunk`);
setTimeout(() => {
  req.write(jsonStr.slice(5));
  console.log(`sent the second chunk`);
  req.end();
}, 100);
