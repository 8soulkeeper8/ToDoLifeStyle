import React, { useState, useEffect } from 'react';

const TaskModal = ({ addTask, editTask, selectedTask, toggleModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [project, setProject] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [files, setFiles] = useState([]);
  const [createdAt] = useState(new Date()); // Для новых задач — текущая дата

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setDeadline(selectedTask.deadline);
      setProject(selectedTask.project);
      setIsImportant(selectedTask.isImportant);
      setFiles(selectedTask.files || []);
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description, deadline, project, isImportant, files, createdAt };

    if (selectedTask) {
      // Редактируем существующую задачу
      editTask({ ...selectedTask, ...taskData });
    } else {
      // Добавляем новую задачу
      addTask({ ...taskData, id: Date.now() });
    }
    toggleModal();
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...selectedFiles]);
  };

  return (
    <div className="task-modal">
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Dead Line</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <label>Project</label>
        <input
          type="text"
          placeholder="Project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
        <label>
          Important
          <input
            type="checkbox"
            checked={isImportant}
            onChange={() => setIsImportant(!isImportant)}
          />
        </label>

        <label>Attach Files</label>
        <input type="file" multiple onChange={handleFileChange} />
        {files.length > 0 && (
          <div>
            <p>Selected Files:</p>
            <ul>
              {Array.from(files).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit">Save Task</button>
        <button type="button" onClick={toggleModal}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskModal;
