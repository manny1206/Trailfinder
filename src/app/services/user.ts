export interface User {
    //authenticators
    email: string;
    pword: string;
    
    //other user info
    uid: number;
    name: string;
    pfame: string;
    photoURL?: string;
    bio: string;
    friends: number[];
    country: string;
    status: string;
}
