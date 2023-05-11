import React from 'react'
import PropTypes from 'prop-types'

import './newTaskForm.css'

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskText: '',
      minutes: '',
      seconds: '',
    }
  }

  newTaskAdd = (e) => {
    this.setState({ taskText: e.target.value })
  }

  setMinutes = (e) => {
    this.setState({ minutes: e.target.value })
  }

  setSeconds = (e) => {
    this.setState({ seconds: e.target.value })
  }

  submitNewTask = (e) => {
    const { taskText, minutes, seconds } = this.state
    const { onItemAdded } = this.props

    e.preventDefault()
    if (taskText !== '') {
      const time = minutes * 60 + seconds * 1
      onItemAdded(taskText, time)
      this.setState({ taskText: '', seconds: '', minutes: '' })
    } else {
      alert('Пожалуйста, ввдедите корректное название задачи и время.')
      this.setState({ taskText: '', seconds: '', minutes: '' })
    }
  }

  render() {
    const { taskText, minutes, seconds } = this.state
    return (
      <form className="new-todo-form" onSubmit={this.submitNewTask}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          autoFocus
          value={taskText}
          onChange={this.newTaskAdd}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          min="0"
          max="59"
          placeholder="Min"
          value={minutes}
          onChange={this.setMinutes}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          min="0"
          max="59"
          placeholder="Sec"
          value={seconds}
          onChange={this.setSeconds}
        />
        <button type="submit" aria-label="Submit" />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

export default NewTaskForm
