import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './newTaskForm.css'

function NewTaskForm({ onItemAdded }) {
  const [taskText, setTaskText] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const newTaskAdd = (e) => setTaskText(e.target.value)

  const setMinutes = (e) => setMin(e.target.value)

  const setSeconds = (e) => setSec(e.target.value)

  const submitNewTask = (e) => {
    e.preventDefault()
    if (taskText.trim() !== '') {
      const time = min * 60 + sec * 1
      onItemAdded(taskText, time)
      setTaskText('')
      setMin('')
      setSec('')
    } else {
      alert('Пожалуйста, ввдедите корректное название задачи и время.')
      setTaskText('')
      setMin('')
      setSec('')
    }
  }

  return (
    <form className="new-todo-form" onSubmit={submitNewTask}>
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        autoFocus
        value={taskText}
        onChange={newTaskAdd}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        min="0"
        max="59"
        placeholder="Min"
        value={min}
        onChange={setMinutes}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        min="0"
        max="59"
        placeholder="Sec"
        value={sec}
        onChange={setSeconds}
      />
      <button type="submit" aria-label="Submit" />
    </form>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

export default NewTaskForm
