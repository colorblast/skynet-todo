const TodoComponent = ({ todo, completeTodo, deleteTodo }) => {
  if (!todo.completed) {
    return (
      <div className="text-lg flex justify-between items-center">
        <div className="pr-6 break-words max-h-52 overflow-y-auto">
          {todo.name}
        </div>
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 mr-1 text-green-700 hover:bg-green-300 rounded-full p-1 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => completeTodo(todo)}
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-red-700 hover:bg-red-300 rounded-full p-1 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => deleteTodo(todo)}
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    )
  } else {
    return (
      <div className="text-lg flex justify-between items-center">
        <div className="pr-6 line-through break-words max-h-52 overflow-y-auto">
          {todo.name}
        </div>
        <i>Complete</i>
      </div>
    )
  }
}

export default TodoComponent
