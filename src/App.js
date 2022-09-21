import './App.css';
import React from 'react'
import io from 'socket.io-client'
function App() {
  const socket = io.connect('http://localhost:5000')
  const [message, setMessage] = React.useState('');
  const [chat, setChat] = React.useState([]);
  const sendChat = (e) => {
    e.preventDefault()
    socket.emit('chat', { message, "user1": 'owais' })
    setMessage('')
  }
  React.useEffect(() => {
    socket.on('chat', (content) => {
      setChat(chat.concat(content))

      console.log(message)
      console.log(chat)
    })
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>{payload.message}{payload.user1}</p>
          )
        })}
        <form onSubmit={sendChat}>
          <input type="text" placeholder='send messages' style={{ fontSize: '1.4rem' }} value={message} onChange={(e) => { setMessage(e.target.value) }} />
          <button style={{ padding: '8px' }} type='submit'>Send Messages </button>
        </form>
      </header>
    </div>
  );
}

export default App;
