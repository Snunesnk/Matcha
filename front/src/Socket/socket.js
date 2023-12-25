import io from 'socket.io-client'

const SOCKET_SERVER_URL = 'http://localhost:8080'

let socket = null

export const initSocket = () => {
    socket = io(SOCKET_SERVER_URL, { withCredentials: true })
    socket.on('connect', () => {
        // console.log('Socket connected:', socket.id)
    })
    return socket
}
