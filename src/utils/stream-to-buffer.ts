export async function unit8ReadableStreamToBuffer(input: any, maxSize: number): Promise<Buffer> {
  if (typeof (input as ReadableStream).getReader !== "function") return Buffer.alloc(0);

  const reader = (input as ReadableStream<Uint8Array>).getReader();
  const chunks: Uint8Array[] = [];
  let totalSize = 0;

  try {
    while (true) {
      // Read the next chunk from the stream
      const { done, value } = await reader.read();

      if (done) break;
      if (value && value.length) {
        // Track size of incoming data
        const newTotalSize = totalSize + value.length;
        if (totalSize > maxSize) {
          chunks.push(value.subarray(value.length - (newTotalSize - maxSize)));
          totalSize = maxSize;
          break;
        }

        totalSize = newTotalSize;
        chunks.push(value);
        continue;
      }
      break;
    }
  } finally {
    reader.releaseLock();
  }

  return Buffer.concat(chunks);
}
