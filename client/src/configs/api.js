import axios from 'axios'

const resolvedBaseUrl =
    (import.meta.env.VITE_BASE_URL && import.meta.env.VITE_BASE_URL.trim()) ||
    'http://localhost:3000'

const api = axios.create({
    baseURL: resolvedBaseUrl
})


export default api