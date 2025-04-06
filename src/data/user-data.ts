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