import React, { useEffect, useState } from 'react'

import './App.css'
import TaskList from '../taskList/taskList'
import NewTaskForm from '../newTaskForm/newTaskForm'
import Footer from '../footer/footer'

function App() {
  const [taskList, setTaskList] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const timerId = setInterval(() => {
      const newList = taskList.map((task) => {
        if (task.time === 0) {
          delete task.paused
          return task
        }
        return !task.paused ? { ...task, time: task.time - 1 } : { ...task }
      })
      return setTaskList(newList)
    }, 1000)

    return () => clearInterval(timerId)
  }, [taskList])

  const onItemAdded = (text, time) => {
    const newTask = {
      id: Math.random(),
      description: text,
      date: new Date(),
      checked: false,
      time,
      paused: false,
    }
    const newTaskList = [...taskList, newTask]
    return setTaskList(newTaskList)
  }

  const startTimer = (id) => {
    const newTaskList = taskList.map((task) => (task.id === id ? { ...task, paused: false } : { ...task }))
    return setTaskList(newTaskList)
  }

  const stopTimer = (id) => {
    const newTaskList = taskList.map((task) => (task.id === id ? { ...task, paused: true } : { ...task }))
    return setTaskList(newTaskList)
  }

  const onDeleted = (id) => {
    const newTaskList = taskList.filter((taskItem) => taskItem.id !== id)
    return setTaskList(newTaskList)
  }

  const toggleCompleted = (id) => {
    const newTaskList = taskList.map((item) => (item.id === id ? { ...item, checked: !item.checked } : { ...item }))
    return setTaskList(newTaskList)
  }

  const clearCompletedTask = () => {
    const newTaskList = taskList.filter((item) => !item.checked)
    return setTaskList(newTaskList)
  }

  const filterList = () =>
    taskList.filter(({ checked }) => {
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

  const changeFilter = (value) => {
    setFilter(value)
  }

  const onSubmitEditTask = (id, text) => {
    const newTaskList = taskList.map((item) => (item.id === id ? { ...item, description: text } : { ...item }))
    return setTaskList(newTaskList)
  }

  const countItemsLeft = taskList.length - taskList.filter((item) => item.checked).length

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onItemAdded={onItemAdded} />
      </header>
      <section className="main">
        <TaskList
          taskList={filterList()}
          onDeleted={onDeleted}
          toggleCompleted={toggleCompleted}
          onSubmitEditTask={onSubmitEditTask}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          countItemsLeft={countItemsLeft}
          clearCompletedTask={clearCompletedTask}
          filter={filter}
          changeFilter={changeFilter}
        />
      </section>
    </section>
  )
}

export default App
