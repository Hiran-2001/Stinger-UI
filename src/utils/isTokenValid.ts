export function isTokenValid(token:any): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp;
        const now = Math.floor(Date.now() / 1000);
        return expiry > now;
    } catch (error:any) {
        return false;
    }
}