import React, {useEffect} from "react";
// The uuid module is used to set unique id to every list items
import {v4 as uuidv4} from "uuid";

const Form = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {
  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? {title, id, completed} : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      // Here we are using spread operator also known as array Destructuring to set every new todos a unique id
      // title should be input provided by the user
      // initially the completed property set to false
      setTodos([...todos, {id: uuidv4(), title: input, completed: false}]);
      // Here we are emptying out input field from previous text it will set input field blank after we hit add button for the next value
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter a Todo..."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        {editTodo ? "Ok" : "Add"}
      </button>
    </form>
  );
};

export default Form;
