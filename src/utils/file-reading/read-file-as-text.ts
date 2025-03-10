/**
 * Reads a file as text
 * @param file The file to read
 * @returns A promise that resolves to the file content as text
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error(`Failed to read file as text: ${file.name}`));
      }
    };

    reader.onerror = event => {
      console.error('FileReader error:', event);
      reject(new Error(`Failed to read file: ${file.name}`));
    };

    reader.readAsText(file);
  });
}
