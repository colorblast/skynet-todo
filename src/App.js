import "./App.css"
import DateComponent from "./components/DateComponent"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { SkynetClient, genKeyPairFromSeed } from "skynet-js"

const portal =
  window.location.hostname === "localhost" ? "https://siasky.net" : undefined

const client = new SkynetClient(portal)
const { publicKey, privateKey } = genKeyPairFromSeed(
  "42 darn keys to the goddamn galaxy horse ring cattle geopolitics geographic determinism"
)

const KEY = "todos"

function App() {
  const [todos, setTodos] = useState([])
  const [date, setNewDate] = useState(new Date())

  const todoManager = async (newTodos, successMsg, errorMsg) => {
    try {
      await client.db.setJSON(privateKey, KEY, newTodos)
      setTodos(newTodos)
      toast.success(successMsg)
    } catch (error) {
      console.log(error)
      toast.error(errorMsg)
    }
  }

  const createTodo = async (name, date) => {
    const newTodos = [
      ...todos,
      { name, completed: false, id: nanoid(), date: date.toDateString() },
    ]
    await todoManager(newTodos, "Added " + name, "Failed to add todo " + name)
  }

  const completeTodo = async (todo) => {
    const newTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.completed = true
      }
      return t
    })
    await todoManager(
      newTodos,
      "Marked todo complete",
      "Failed to mark todo complete"
    )
  }

  const deleteTodo = async (todo) => {
    const newTodos = todos.filter((t) => t.id !== todo.id)
    await todoManager(newTodos, "Deleted todo", "Failed to delete todo")
  }

  const backDate = () => {
    const tmp = new Date()
    tmp.setDate(date.getDate() - 1)
    setNewDate(tmp)
  }

  const forwardDate = () => {
    const tmp = new Date()
    tmp.setDate(date.getDate() + 1)
    setNewDate(tmp)
  }

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const { data } = await client.db.getJSON(publicKey, KEY)
        setTodos(data)
      } catch (error) {
        console.log(error)
      }
    }
    loadTodos()
  }, [])

  return (
    <div className="App flex h-screen">
      <div className="m-auto flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 hover:bg-gray-300 rounded-full p-1 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => backDate()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 hover:bg-gray-300 rounded-full p-1 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => forwardDate()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
        <div className="text-left max-w-xl">
          <h1 className="text-5xl py-4">Todos</h1>
          <div>
            <DateComponent
              date={date}
              todos={todos.filter(
                (t) => t.date !== undefined && t.date === date.toDateString()
              )}
              createTodo={createTodo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
            <i>
              Note: Do not input sensitive information into this app since it
              uses the cloud store.
            </i>
          </div>
        </div>
      </div>
      <ToastContainer hideProgressBar={true} />
    </div>
  )
}

export default App
