export interface RewardRequest {
  name: string;
  description: string;
  points: number;
  visible: boolean;
  stock: number;
}

export interface RewardResponse {
  id: number;
  name: string;
  description: string;
  points: number;
  visible: boolean;
  stock: number;
}

export interface HistoryShopping {
  transactionId: number;
  userName: string;
  userLastname: string;
  userUsername: string;
  pointsBefore: number;
  purchaseDate: string;
  rewardName: string;
  rewardDescription: string;
  rewardPoints: number;
  pointsAfter: number;
}
