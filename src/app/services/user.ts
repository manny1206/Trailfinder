export interface User {
    uid: number;
    email: string;
    name: string;
    photoURL?: string;
    bio: string;
    friends: number[];//array of user ids
    country: string;
}
