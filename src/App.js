import React from 'react'

import './App.css'
import TaskList from './components/taskList/taskList'
import NewTaskForm from './components/newTaskForm/newTaskForm'
import Footer from './components/footer/footer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskList: [],
      filter: 'All',
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState(({ taskList }) => {
        const newList = taskList.map((task) => {
          if (task.time === 0) {
            return task
          }
          return !task.paused ? { ...task, time: task.time - 1 } : { ...task }
        })
        return { taskList: newList }
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onItemAdded = (text, time) => {
    this.setState(({ taskList }) => {
      const newTask = {
        id: Math.random(),
        description: text,
        date: new Date(),
        checked: false,
        time,
        paused: false,
      }
      const newTaskList = [...taskList, newTask]
      return { taskList: newTaskList }
    })
  }

  startTimer = (id) => {
    this.setState(({ taskList }) => {
      const newTaskList = taskList.map((task) => (task.id === id ? { ...task, paused: false } : { ...task }))
      return { taskList: newTaskList }
    })
  }

  stopTimer = (id) => {
    this.setState(({ taskList }) => {
      const newTaskList = taskList.map((task) => (task.id === id ? { ...task, paused: true } : { ...task }))
      return { taskList: newTaskList }
    })
  }

  onDeleted = (id) => {
    this.setState(({ taskList }) => {
      const newTaskList = taskList.filter((taskItem) => taskItem.id !== id)
      return { taskList: newTaskList }
    })
  }

  toggleCompleted = (id) => {
    this.setState(({ taskList }) => {
      const newTaskList = taskList.map((item) => (item.id === id ? { ...item, checked: !item.checked } : { ...item }))
      return { taskList: newTaskList }
    })
  }

  clearCompletedTask = () => {
    this.setState(({ taskList }) => {
      const newTaskList = taskList.filter((item) => !item.checked)
      return { taskList: newTaskList }
    })
  }

  filterList = () => {
    const { taskList, filter } = this.state
    return taskList.filter(({ checked }) => {
      const all = filter === 'All'
      const completed = filter === 'Completed'
      if (all) {
        return true
      }
      if (completed) {
        return checked
      }
      return !checked
    })
  }

  changeFilter = (value) => {
    this.setState({ filter: value })
  }

  onSubmitEditTask = (id, text) => {
    this.setState(({ taskList }) => {
      const newTaskList = taskList.map((item) => (item.id === id ? { ...item, description: text } : { ...item }))
      return { taskList: newTaskList }
    })
  }

  render() {
    const { taskList, filter } = this.state
    const countItemsLeft = taskList.length - taskList.filter((item) => item.checked).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onItemAdded={this.onItemAdded} />
        </header>
        <section className="main">
          <TaskList
            taskList={this.filterList()}
            onDeleted={this.onDeleted}
            toggleCompleted={this.toggleCompleted}
            onSubmitEditTask={this.onSubmitEditTask}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />
          <Footer
            countItemsLeft={countItemsLeft}
            clearCompletedTask={this.clearCompletedTask}
            filter={filter}
            changeFilter={this.changeFilter}
          />
        </section>
      </section>
    )
  }
}

export default App
