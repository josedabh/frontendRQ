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
  verificationType: string | null;
  verificationNumber: string | null;
}

export const getDifficultyLabel = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'Fácil';
    case 'medium':
      return 'Medio';
    case 'hard':
      return 'Difícil';
    default:
      return difficulty;
  }
};

export interface ChallengeRequest {
  title: string;
  description: string;
  difficulty: string;
  category: string;
  startDate: string;
  endDate: string;
  points: number;
}

export interface ChallengeHistoryResponse {
  userName: string;
  userLastname: string;
  userUsername: string;
  challengeTitle: string;
  completedAt: string;
  earnedPoints: number;
  attempts: number;
}
