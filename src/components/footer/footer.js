import './footer.css'
import PropTypes from 'prop-types'

import TasksFilter from '../tasksFilter/tasksFilter'

function Footer({ countItemsLeft, filter, changeFilter, clearCompletedTask }) {
  return (
    <footer className="footer">
      <span className="todo-count">{countItemsLeft} items left</span>
      <ul className="filters">
        <TasksFilter filter={filter} changeFilter={changeFilter} name="All" />
        <TasksFilter filter={filter} changeFilter={changeFilter} name="Active" />
        <TasksFilter filter={filter} changeFilter={changeFilter} name="Completed" />
      </ul>
      <button className="clear-completed" type="button" onClick={clearCompletedTask}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  filter: 'All',
  countItemsLeft: 0,
}

Footer.propTypes = {
  countItemsLeft: PropTypes.number,
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
  clearCompletedTask: PropTypes.func.isRequired,
}

export default Footer
