// src/components/TaskApp.js
import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskModal from './TaskModal';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]); // Уникальный ID для задачи
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (task) => {
    // Логика редактирования задачи
    console.log('Edit task:', task);
    // Можно открыть модалку с данными для редактирования
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>Add Task</button>
      {isModalOpen && <TaskModal addTask={addTask} toggleModal={toggleModal} />}
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
};

export default TaskApp;
