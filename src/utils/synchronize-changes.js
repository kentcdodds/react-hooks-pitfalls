function synchronizeChanges(messages, changes) {
  return changes.reduce(
    (newMessages, change) => {
      const {type, message: messageChange} = change
      if (type === 'new') {
        newMessages.push(messageChange)
      } else if (type === 'edit') {
        newMessages = newMessages.map(msg => {
          if (msg.id === messageChange.id) {
            return {...msg, ...messageChange}
          } else {
            return msg
          }
        })
      } else if (type === 'remove') {
        newMessages = newMessages.filter(msg => msg.id !== messageChange.id)
      } else {
        throw new Error(`unhandled change type: ${changes.type}`)
      }
      return newMessages
    },
    [...messages],
  )
}

export default synchronizeChanges
