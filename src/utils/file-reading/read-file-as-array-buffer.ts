/**
 * Reads a file as an ArrayBuffer
 * @param file The file to read
 * @param isMobile Whether the device is mobile
 * @returns A promise that resolves to the file content as an ArrayBuffer
 */
export function readFileAsArrayBuffer(file: File, isMobile: boolean): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error(`Failed to read file as ArrayBuffer: ${file.name}`));
      }
    };

    reader.onerror = event => {
      console.error('FileReader error:', event);
      reject(new Error(`Failed to read file: ${file.name}`));
    };

    // Use smaller chunk sizes for large files on mobile to avoid memory issues
    if (isMobile && file.size > 5 * 1024 * 1024) {
      // 5MB
      reject(new Error('File too large for mobile processing'));

      return;
    }

    reader.readAsArrayBuffer(file);
  });
}
