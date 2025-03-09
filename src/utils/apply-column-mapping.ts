/**
 * Apply column mapping to parsed CSV data
 * @param rows The parsed CSV data
 * @param mapping The column mapping from AI
 * @returns Array of objects with standardized field names
 */
export function applyColumnMapping<T extends Record<string, string | number>>(
  rows: Array<Record<string, string | number>>,
  mapping: T
): Array<{
  [key in keyof T]?: string | number;
}> {
  if (!rows.length) {
    return [];
  }

  return rows.map(row => {
    const mappedRow: {
      [key in keyof T]?: string | number;
    } = {};

    // Apply each field mapping
    Object.entries(mapping).forEach(([field, columnName]) => {
      // If we have a mapping for this field and the column exists in the row
      if (columnName && typeof columnName === 'string' && columnName in row) {
        mappedRow[field as keyof T] = row[columnName];
      }
    });

    // Include all original fields too with their original names
    // This ensures we don't lose any data
    Object.entries(row).forEach(([key, value]) => {
      if (!(key in mappedRow)) {
        mappedRow[key as keyof T] = value;
      }
    });

    return mappedRow;
  });
}
