import io from 'socket.io-client'

const SOCKET_SERVER_URL = 'http://localhost:8080'

let socket = io(SOCKET_SERVER_URL, {
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
})
socket.on('connect', () => {
    console.log('Socket connected:', socket.id)
})

export const reconnectSocket = () => {
    socket = io(SOCKET_SERVER_URL, {
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
    })
    socket.on('connect', () => {
        console.log('Socket connected:', socket.id)
    })
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...')
    if (socket) socket.disconnect()
}

export const sendMessage = (payload) => {
    socket.emit('message', payload)
}

export default socket
