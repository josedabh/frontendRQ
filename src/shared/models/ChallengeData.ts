export interface ChallengeResponse {
    id:          string;
    title:       string;
    description: string;
    difficulty:  string;
    state:       string;
    startDate:   string;
    endDate:     string;
    points:      number;
}

export interface ChallengeRequest {
    title:       string;
    description: string;
    difficulty:  string;
    startDate:   string;
    endDate:     string;
    points:      string;
}

export interface ChallengeCard {
    id:          string;
    title:       string;
    description: string;
}
