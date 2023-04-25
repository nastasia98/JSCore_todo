import React from 'react'
import PropTypes from 'prop-types'

import './newTaskForm.css'

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { taskText: '' }
  }

  newTaskAdd = (e) => {
    this.setState({ taskText: e.target.value })
  }

  submitNewTask = (e) => {
    const { taskText } = this.state
    const { onItemAdded } = this.props

    e.preventDefault()
    if (taskText.trim() !== '') {
      onItemAdded(taskText)
      this.setState({ taskText: '' })
    } else {
      alert('Пожалуйста, ввдедите корректное название задачи.')
      this.setState({ taskText: '' })
    }
  }

  render() {
    const { taskText } = this.state
    return (
      <form onSubmit={this.submitNewTask}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={taskText}
          onChange={this.newTaskAdd}
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

export default NewTaskForm
