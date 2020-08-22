export interface IGoogleService {
    public async initAsync(): Promise<void>;
    public async autoSignInAsync(): Promise<{
        user: Google.GoogleUser | null;
        idToken: string | null;
    }>;
    public async signInAsync(): Promise<{
        user: Google.GoogleUser | null;
        idToken: string | null;
    }>
    public async signOutAsync(): Promise<void>;
}