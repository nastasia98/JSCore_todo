import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './task.css'
import useOutsideClick from '../../hooks/useOutsideClick'

function Task({ task, onSubmitEditTask, onDeleted, toggleCompleted, startTimer, stopTimer }) {
  const [value, setValue] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const ref = useRef()

  useOutsideClick(ref, () => setIsEdit(false))

  const onEdit = () => {
    setValue(task.description)
    setIsEdit(true)
  }

  const changeValue = (e) => setValue(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    if (value.trim() !== '') {
      onSubmitEditTask(task.id, value)
      setIsEdit(false)
    } else {
      alert('Пожалуйста, ввдедите корректное название задачи.')
      setValue('')
    }
  }

  const stopEditWithEsc = (e) => {
    if (e.keyCode === 27) {
      setIsEdit(false)
    }
  }

  const { id, description, date, checked, time, paused } = task

  const N = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })

  let classListItem = 'listItem'
  if (isEdit) {
    classListItem += ' editing'
  } else if (checked) {
    classListItem += ' completed'
  }

  const playStopBtn = Object.keys(task).includes('paused')
  let button
  if (playStopBtn && paused) {
    button = <button className="icon icon-play" type="button" aria-label="Play" onClick={startTimer} />
  } else if (playStopBtn && !paused) {
    button = <button className="icon icon-pause" type="button" aria-label="Pause" onClick={stopTimer} />
  } else {
    button = null
  }

  return (
    <div className={classListItem}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={checked} id={id} onChange={toggleCompleted} />
        <label htmlFor={id}>
          <span className="title">{description}</span>
          <span className="description">
            {button}
            {Math.trunc(time / 60)
              .toString()
              .padStart(2, '0')}
            :{(time % 60).toString().padStart(2, '0')}
          </span>
          <span className="description">created {N}</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Edit" onClick={onEdit} />
        <button className="icon icon-destroy" type="button" aria-label="Delete" onClick={onDeleted} />
      </div>
      {isEdit && (
        <form className="edit-form" onSubmit={onSubmit}>
          <input
            className="edit"
            type="text"
            value={value}
            autoFocus
            ref={ref}
            onChange={changeValue}
            onKeyDown={stopEditWithEsc}
          />
        </form>
      )}
    </div>
  )
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
