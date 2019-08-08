import React from 'react'
import {pushRoomChanges} from '../utils/subscribe-to-room'
// import Chat from './chat-start'
import Chat from './chat'

function ChatExample() {
  const [roomId, setRoomId] = React.useState('cool-room')
  const messageIndex = React.useRef(0)

  function changeRoom() {
    setRoomId(id => (id === 'cool-room' ? 'other-room' : 'cool-room'))
  }

  function addMessage() {
    const newMessage = allMessages[messageIndex.current++]
    pushRoomChanges(roomId, [{type: 'new', message: newMessage}])
  }

  function removeMessage() {
    const removedMessage = allMessages[--messageIndex.current]
    pushRoomChanges(roomId, [{type: 'remove', message: removedMessage}])
  }

  function editMessage() {
    const editMessage = allMessages[messageIndex.current - 1]
    pushRoomChanges(roomId, [
      {
        type: 'edit',
        message: {
          ...editMessage,
          content: `I have been edited on ${Date.now()}`,
        },
      },
    ])
  }

  return (
    <div>
      <div>
        <button onClick={changeRoom}>Change Room</button>
      </div>
      <div>
        <button onClick={addMessage}>Add a message</button>
        <button onClick={removeMessage}>Remove a message</button>
        <button onClick={editMessage}>Change last message</button>
      </div>
      <pre
        style={{
          width: 400,
          height: 400,
          overflowY: 'scroll',
          whiteSpace: 'pre-wrap',
          backgroundColor: '#EDD',
        }}
      >
        <Chat roomId={roomId} shouldSynchronize={true} />
      </pre>
    </div>
  )
}

export default ChatExample

const allMessages = [
  `Leia: Aren't you a little short to be a stormtrooper?`,
  `Luke: What? Oh... the uniform. I'm Luke Skywalker. I'm here to rescue you.`,
  `Leia: You're who?`,
  `Luke: I'm here to rescue you. I've got your R2 unit. I'm here with Ben Kenobi.`,
  `Leia: Ben Kenobi is here! Where is he?`,
  `Luke: Come on!`,
  `Luke: Will you forget it? I already tried it. It's magnetically sealed!`,
  `Leia: Put that thing away! You're going to get us all killed.`,
  `Han: Absolutely, Your Worship. Look, I had everything under control until you led us down here. You know, it's not going to take them long to figure out what happened to us.`,
  `Leia: It could be worse...`,
  `Han: It's worse.`,
  `Luke: There's something alive in here!`,
  `Han: That's your imagination.`,
  `Luke: Something just moves past my leg! Look! Did you see that?`,
  `Han: What?`,
  `Luke: Help!`,
  `Han: Luke! Luke! Luke!`,
  `Leia: Luke!`,
  `Leia: Luke, Luke, grab a hold of this.`,
  `Luke: Blast it, will you! My gun's jammed.`,
  `Han: Where?`,
  `Luke: Anywhere! Oh!!`,
  `Han: Luke! Luke!`,
  `Leia: Grab him!`,
  `Leia: What happened?`,
  `Luke: I don't know, it just let go of me and disappeared...`,
  `Han: I've got a very bad feeling about this.`,
  `Luke: The walls are moving!`,
  `Leia: Don't just stand there. Try to brace it with something.`,
  `Luke: Wait a minute!`,
  `Luke: Threepio! Come in Threepio! Threepio! Where could he be?`,
].map((m, i) => ({id: i, author: m.split(': ')[0], content: m.split(': ')[1]}))
