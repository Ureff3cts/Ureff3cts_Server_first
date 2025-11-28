export type WalRecord = {
  key: string;
  value: string;
  tombstone?: boolean;
};

export type SegmentIndexEntry = {
  key: string;
  offset: number; // byte offset within segment file
};

export type MetricsSnapshot = {
  walBytes: number;
  walLines: number;
  segmentCount: number;
  compactions: number;
  p95GetMs: number;
  p99GetMs: number;
};
