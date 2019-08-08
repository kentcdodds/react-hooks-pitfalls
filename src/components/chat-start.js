import React from 'react'
import subscribeToRoom from '../utils/subscribe-to-room'
import synchronizeChanges from '../utils/synchronize-changes'

function Chat({roomId, shouldSynchronize}) {
  const [messages, setMessages] = React.useState([])

  function handleChanges(changes) {
    if (shouldSynchronize) {
      const newMessages = synchronizeChanges(messages, changes)
      setMessages(newMessages)
    }
  }

  React.useEffect(() => {
    const unsubscribe = subscribeToRoom(roomId, handleChanges)
    return unsubscribe
  }, [])

  console.log('messages', messages, messages.length)

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
