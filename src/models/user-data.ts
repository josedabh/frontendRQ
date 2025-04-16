export interface Login {
    identifier: string;
    password: string;
}

export interface Register {
    email: string;
    password: string;
    name: string;
    lastname: string;
    username: string;
    numPhone: string;
}

export interface Key {
    token: string
}

export interface UserResponse {
    id: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    username: string;
    numPhone: string;
    points: number;
    rol: string;
}

export interface UserProfile {
    email: string;
    name: string;
    lastname: string;
    username: string;
    numPhone: string;
    points: number;
}
