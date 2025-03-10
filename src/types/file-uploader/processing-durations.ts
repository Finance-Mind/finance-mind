/**
 * Interface for tracking processing durations
 */
export interface ProcessingDurations {
  total: number;
  parsing?: number;
  extraction?: number;
  detection?: number;
}
