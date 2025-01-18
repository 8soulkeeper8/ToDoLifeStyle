import React from 'react';

const TaskList = ({ tasks, deleteTask, editTask }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-details">
              {/* Проверка на наличие дедлайна */}
              {task.deadline && (
                <span className="task-deadline">
                  <strong>Dead Line:</strong> {task.deadline}
                </span>
              )}
              <span className="task-project">
                <strong>Project:</strong> {task.project}
              </span>
              {task.isImportant && <span className="important">Important</span>}
              <div className="task-created-at">
                <strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>


            {/* Отображение прикрепленных файлов */}
            {task.files && task.files.length > 0 && (
              <div className="task-files">
                <strong>Attached Files:</strong>
                <ul>
                  {task.files.map((file, index) => (
                    <li key={index}>
                      <a
                        href={URL.createObjectURL(file)}
                        download={file.name}
                      >
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
                        <div className="task-actions">
              <button onClick={() => editTask(task)}>Edit</button> {/* Для редактирования */}
              <button onClick={() => deleteTask(task.id)}>Delete</button> {/* Для удаления */}
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
