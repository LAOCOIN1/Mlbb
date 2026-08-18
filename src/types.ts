export interface MLBBCheckResult {
  success: boolean;
  id: string;
  server: string;
  nickname: string;
  country: string;
  serverRegion?: string;
  source?: string;
  raw?: string;
  error?: string;
  timestamp?: number;
}

export interface CheckHistoryItem {
  id: string;
  server: string;
  nickname: string;
  country: string;
  serverRegion?: string;
  timestamp: number;
}
