import io from 'socket.io-client'
import ApiService from '../Services/api.service'

const SOCKET_SERVER_URL = ApiService.getApiURL()

let socket = io(SOCKET_SERVER_URL, {
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
})
socket.on('connect', () => {})

export const reconnectSocket = () => {
    socket.connect()
}

export const disconnectSocket = () => {
    if (socket) socket.disconnect()
}

export const sendNotif = (type, payload) => {
    socket.emit(type, payload)
}

export default socket
