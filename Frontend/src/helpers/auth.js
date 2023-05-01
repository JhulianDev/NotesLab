import { TOKEN_NAME } from "../env/env"

// Obtener token
export const getToken = () => {
    return localStorage.getItem(TOKEN_NAME)
}

// Setear Token
export const setToken = (token) => {
    localStorage.setItem(TOKEN_NAME, token)
}

// Eliminar Token
export const deleteToken = () => {
    localStorage.removeItem(TOKEN_NAME)
}

// Limpiar Local Storage
export const clearLocal = () => {
    localStorage.clear()
}