import React, { useEffect, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import axios from 'axios'
import './app.css'

function App() {
  const initialFormData = Object.freeze({
    message_thread: [],
    message: '',
  })
  const userInstance = {
    isAuthenticated: false,
    username: '',
    room: '',
  }
  const [formData, setFormData] = useState(initialFormData)
  const [user, setUser] = useState(userInstance)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    let socket = new W3CWebSocket(
      `ws://127.0.0.1:8000/ws/chat/${user.room ? user.room : 'ndmpa'}/`
    )
    socket.onopen = () => {
      console.log('web socket connected')
      setSocket(socket)
    }

    socket.onmessage = (message) => {
      console.log('web socket message')
      const response = JSON.parse(message.data)
      if (response) {
        setFormData((state) => ({
          ...state,
          message_thread: [
            ...state.message_thread,
            {
              content: response.message,
              username: response.username,
            },
          ],
        }))
      }
    }

    socket.onclose = () => {
      console.log('web socket close')
    }

    socket.onerror = () => {
      console.log('web socket error')
    }

    return () => {
      socket.onclose()
    }
  }, [])

  const handleChatChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLoginChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.message) {
      socket.send(
        JSON.stringify({
          type: 'chat_message',
          message: formData.message,
          room: user.room,
          username: user.username,
        })
      )
      setFormData((prev) => ({ ...prev, message: '' }))
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(user.username)

    await axios
      .get(`http://127.0.0.1:8000/api/room/${user.room}`)
      .then((res) => {
        console.log(res)
        setUser((prev) => ({
          ...prev,
          isAuthenticated: true,
          room: res.data.room.name,
        }))

        setFormData((prev) => ({
          ...prev,
          message_thread: res.data.message,
        }))
      })
  }

  return (
    <div className='container'>
      {user.isAuthenticated ? (
        <React.Fragment>
          <h1>CHAT APP</h1>
          <div className='chat'>
            {formData.message_thread &&
              formData.message_thread.map((row, index) => {
                return (
                  <p key={index}>
                    {row.username}: {row.content}
                  </p>
                )
              })}
            <br />
            <form className='chat-form' onSubmit={handleSubmit}>
              <textarea
                id='message'
                name='message'
                rows='4'
                cols='50'
                maxLength='200'
                placeholder='Aa'
                value={formData.message}
                onChange={handleChatChange}
              ></textarea>
              <button type='submit'>Send</button>
            </form>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <form className='login-form' onSubmit={handleLogin}>
            <input
              type='text'
              placeholder='username'
              name='username'
              onChange={handleLoginChange}
            />
            <input
              type='text'
              placeholder='room'
              name='room'
              onChange={handleLoginChange}
            />
            <button type='submit'>Login</button>
          </form>
        </React.Fragment>
      )}
    </div>
  )
}

export default App
