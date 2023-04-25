import PropTypes from 'prop-types'

import './tasksFilter.css'

function TasksFilter({ filter, name, changeFilter }) {
  return (
    <li>
      <button className={filter === name ? 'selected' : ''} type="button" onClick={() => changeFilter(name)}>
        {name}
      </button>
    </li>
  )
}

TasksFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
}

export default TasksFilter
