import type { Transform } from "stream";
import { createGunzip, createInflate, createBrotliDecompress } from "zlib";

/**
 * This function provides a stream transformer for the given `content-encoding` response header.
 *
 * For example: `gzip`, `compress`, `deflate`, `br` or multiple of them like `deflate, gzip`.
 *
 * If Multiple, the decoders are applied in the reverse order of the encodings.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Encoding
 * @param contentEncoding The value from the `Content-Encoding` header.
 * @returns An object containing the original encoding name and the transform stream for decoding,
 * or undefined if no decoding is needed or if an encoding is unsupported.
 */
export function createDecoderForContentEncoding(contentEncoding?: string): {
  name: string;
  transform: Transform;
} | undefined {
  // If contentEncoding is not provided, is an empty string, or is 'identity', no decoding is necessary.
  if (!contentEncoding || contentEncoding.toLowerCase() === 'identity') {
    return undefined;
  }

  // According to the HTTP spec, multiple encodings are comma-separated.
  // We trim each encoding name for cleaner processing.
  const encodings = contentEncoding.split(',').map(e => e.trim());

  // Create the `name` in result
  const names: string[] = [];

  // We need to create a decoding pipeline. Decoders must be applied in the reverse
  // order of the encoders. For example, for "deflate, gzip", we must first
  // gunzip and then inflate.

  // 'pipelineHead' will be the first stream in the decoding chain,
  // which is the one the consumer will write the compressed data to.
  let pipelineHead: Transform | undefined;
  let lastDecoder: Transform | undefined;

  // Iterate through the encodings in reverse order to build the decoding pipe.
  for (let i = encodings.length - 1; i >= 0; i--) {
    const encoding = encodings[i].toLowerCase(); // Use lowercase for case-insensitive matching.
    let currentDecoder: Transform;

    switch (encoding) {
      case 'gzip':
      case 'x-gzip':
        names.push('gzip');
        currentDecoder = createGunzip();
        break;
      case 'deflate':
        names.push('deflate');
        currentDecoder = createInflate();
        break;
      case 'br':
        names.push('br');
        currentDecoder = createBrotliDecompress();
        break;
      case 'identity':
      case '':
        // 'identity' means no transformation. Empty strings can result from trailing commas.
        // We can just skip these.
        continue;
      default:
        // If an unsupported encoding is found (e.g., the legacy 'compress'),
        // we cannot reliably decode the stream. It's safest to return undefined.
        console.warn(`Unsupported content-encoding: "${encodings[i]}"`);
        return undefined;
    }

    if (!pipelineHead) {
      // This is the first decoder in our decoding chain (e.g., gunzip for "deflate, gzip").
      // It becomes the head of our pipeline.
      pipelineHead = currentDecoder;
    } else if (lastDecoder) {
      // Pipe the output of the previous decoder in the chain to the input of the current one.
      // e.g., gunzipStream.pipe(inflateStream)
      lastDecoder.pipe(currentDecoder);
    }

    // The current decoder becomes the last one in the chain for the next iteration.
    lastDecoder = currentDecoder;
  }

  // If a pipeline was successfully created, return it.
  if (pipelineHead) {
    return {
      name: names.join(','),
      transform: pipelineHead,
    };
  }

  // This case is reached if the contentEncoding string was empty or only contained 'identity'.
  return undefined;
}
