export interface RewardRequest {
  name: string;
  description: string;
  points: number;
  image: string;
  visible: boolean;
  stock: number;
}

export interface RewardResponse {
  id: number;
  name: string;
  description: string;
  points: number;
  image: string;
  visible: boolean;
  stock: number;
}

export interface HistoryShopping {
  transactionId: number;
  userId: string;
  userName: string;
  userLastname: string;
  userApodo: string;
  userNumPhone: string;
  userPoints: number;
  transactionPurchaseDate: string;
  rewardId: number;
  rewardName: string;
  rewardDescription: string;
  rewardPoints: number;
}
