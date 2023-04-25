import PropTypes from 'prop-types'

import Task from '../task/task'
import './taskList.css'

function TaskList({ taskList, onDeleted, toggleCompleted, onSubmitEditTask }) {
  const taskElemList = taskList.map((task) => {
    return (
      <Task
        key={task.id}
        task={task}
        onDeleted={() => onDeleted(task.id)}
        toggleCompleted={() => toggleCompleted(task.id)}
        onSubmitEditTask={onSubmitEditTask}
      />
    )
  })

  return <ul className="todo-list">{taskElemList}</ul>
}

TaskList.defaultProps = {
  taskList: {},
}

TaskList.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  onSubmitEditTask: PropTypes.func.isRequired,
}

export default TaskList
