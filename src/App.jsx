import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Хранит выбранную задачу для редактирования

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (task) => {
    // Обновляем задачу в списке
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
  };

  const deleteTask = (taskId) => {
    // Удаляем задачу по id
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleModal = (task = null) => {
    setSelectedTask(task); // Передаем задачу в модалку для редактирования
    setShowModal(!showModal);
  };

  return (
    <div className="app-container">
      <header>
        <h1>ToDo LifeStyle</h1>
        <button onClick={() => toggleModal()}>+</button> {/* Открыть модалку для добавления задачи */}
      </header>
      <div className="main-content">
        <Sidebar />
        <TaskList tasks={tasks} deleteTask={deleteTask} editTask={toggleModal} />
      </div>

      {showModal && (
        <TaskModal
          addTask={addTask}
          editTask={editTask}
          selectedTask={selectedTask} // Передаем выбранную задачу, если она есть
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
};

export default App;
