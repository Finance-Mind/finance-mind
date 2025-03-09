/**
 * Calculate similarity between two strings (0-1 where 1 is identical)
 * Using a simplified version of Levenshtein distance
 *
 * @param str1 First string
 * @param str2 Second string
 * @returns Similarity score between 0-1
 */
export function calculateStringSimilarity(str1: string, str2: string): number {
  // If either string is empty, return 0
  if (str1.length === 0 || str2.length === 0) {
    return 0;
  }

  // If strings are identical, return 1
  if (str1 === str2) {
    return 1;
  }

  // Calculate Levenshtein distance
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= str1.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  // Calculate similarity (1 - normalized distance)
  const distance = matrix[str1.length][str2.length];
  const maxLength = Math.max(str1.length, str2.length);

  return 1 - distance / maxLength;
}
