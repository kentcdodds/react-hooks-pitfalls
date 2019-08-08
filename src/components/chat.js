import React from 'react'
import subscribeToRoom from '../utils/subscribe-to-room'
import synchronizeChanges from '../utils/synchronize-changes'

function Chat({roomId, shouldSynchronize}) {
  const [messages, setMessages] = React.useState([])

  function handleChanges(changes) {
    if (shouldSynchronize) {
      setMessages(msgs => synchronizeChanges(msgs, changes))
    }
  }

  React.useEffect(() => {
    const unsubscribe = subscribeToRoom(roomId, handleChanges)
    return unsubscribe
  })

  return (
    <ul>
      {messages.length
        ? messages.map(message => (
            <li key={message.id}>
              <strong>{message.author}:</strong> {message.content}
            </li>
          ))
        : 'No messages yet...'}
    </ul>
  )
}

/*
 */

export default Chat
