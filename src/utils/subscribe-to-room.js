const subscribers = {}

function subscribeToRoom(roomId, handleChanges) {
  subscribers[roomId] = subscribers[roomId] || []
  subscribers[roomId].push(handleChanges)
  return function unsubscribe() {
    subscribers[roomId] = subscribers[roomId].filter(
      handler => handler !== handleChanges,
    )
  }
}

function pushRoomChanges(roomId, changes) {
  const changeHandlers = subscribers[roomId] || []
  changeHandlers.forEach(handler => handler(changes))
}

export {pushRoomChanges}
export default subscribeToRoom
