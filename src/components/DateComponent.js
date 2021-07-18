import TodoComponent from "./TodoComponent"
import { useState } from "react"

const DateComponent = ({
  date,
  todos,
  createTodo,
  completeTodo,
  deleteTodo,
}) => {
  const [newTodo, setTodo] = useState("")

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createTodo(newTodo, date)
    setTodo("")
  }

  const DAYS_OF_WEEK = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  let appendage = "th"
  const day = date.getDate()

  if (day % 10 === 1) {
    appendage = "st"
  } else if (day % 10 === 2) {
    appendage = "nd"
  } else if (day % 10 === 3) {
    appendage = "rd"
  }

  const year =
    new Date().getFullYear() !== date.getFullYear()
      ? " (" + date.getFullYear() + ")"
      : ""

  return (
    <div>
      <h2 className="font-bold uppercase">
        {DAYS_OF_WEEK[date.getDay()] +
          " " +
          MONTHS[date.getMonth()] +
          " " +
          day +
          appendage +
          year}
      </h2>
      {todos.map((todo, i) => {
        return (
          <div key={i}>
            <TodoComponent
              todo={todo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        )
      })}
      {
        <div className="w-full">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="add"
              onChange={(e) => handleChange(e)}
              value={newTodo}
              className="w-full border-b-2 text-lg focus:outline-none focus:border-gray-800 focus:placeholder-gray-500"
              placeholder="New Item"
            />
          </form>
        </div>
      }
    </div>
  )
}

export default DateComponent
