import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './task.css'

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      value: '',
    }
  }

  onEdit = () => {
    const { task } = this.props
    this.setState({ isEdit: true, value: task.description })
  }

  changeValue = (e) => {
    this.setState({ value: e.target.value })
  }

  onSubmit = (e) => {
    const { task, onSubmitEditTask } = this.props
    const { value } = this.state

    e.preventDefault()
    if (value.trim() !== '') {
      onSubmitEditTask(task.id, value)
      this.setState({ isEdit: false })
    } else {
      alert('Пожалуйста, ввдедите корректное название задачи.')
      this.setState({ value: '' })
    }
  }

  render() {
    const { task, onDeleted, toggleCompleted } = this.props
    const { id, description, date, checked } = task
    const { isEdit, value } = this.state

    const N = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })

    let classListItem = 'listItem'
    if (isEdit) {
      classListItem += ' editing'
    } else if (checked) {
      classListItem += ' completed'
    }

    return (
      <div className={classListItem}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={checked} id={id} onChange={toggleCompleted} />
          <label htmlFor={id}>
            <span className="description">{description}</span>
            <span className="created">created {N}</span>
          </label>
          <button className="icon icon-edit" type="button" onClick={this.onEdit} />
          <button className="icon icon-destroy" type="button" onClick={onDeleted} />
        </div>
        {isEdit && (
          <form onSubmit={this.onSubmit}>
            <input className="edit" type="text" value={value} onChange={this.changeValue} autoFocus />
          </form>
        )}
      </div>
    )
  }
}

Task.defaultProps = {
  task: {},
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    checked: PropTypes.bool,
  }),
  onDeleted: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  onSubmitEditTask: PropTypes.func.isRequired,
}

export default Task
