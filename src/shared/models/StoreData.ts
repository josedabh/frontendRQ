export interface RewardRequest {
  name: string;
  description: string;
  points: number;
  image: string;
  active: boolean;
  stock: number;
}

export interface RewardResponse {
  id: number;
  name: string;
  description: string;
  points: number;
  image: string;
  active: boolean;
  stock: number;
}
