class Auth {
    static setToken(token) {
        sessionStorage.setItem('token', token)
    }

    static isAuthenticated() {
        return sessionStorage.getItem('token') !== null;
    }

    static deauthenticateUser() {
        sessionStorage.removeItem('token')
    }

    static getToken() {
        return sessionStorage.getItem('token')
    }
}

export default Auth;