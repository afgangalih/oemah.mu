export interface EDASRequest {
  matrix: number[][];
  weights: number[];
  types: ("benefit" | "cost")[];
  alternatives: string[];
}

export interface RankingItem {
  rank: number;
  alternative: string;
  as_score: number;
  nsp: number;
  nsn: number;
}

export interface EDASResponse {
  av: number[];
  pda: number[][];
  nda: number[][];
  sp: number[];
  sn: number[];
  nsp: number[];
  nsn: number[];
  ranking: RankingItem[];
}
