export interface ChallengeResponse {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  state: string;
  startDate: string;
  endDate: string;
  points: number;
  verificationType: string;
  verificationNumber: string;
}

export interface ChallengeRequest {
  title: string;
  description: string;
  difficulty: string;
  category: string;
  startDate: string;
  endDate: string;
  points: number;
}
