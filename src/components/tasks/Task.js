import React, { useState, useEffect } from 'react';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';
import TaskMainScreen from './TaskMainScreen';
import TaskSidebar from './TaskSidebar';
import camundaRequestUrl from '../../utils/url';
import taskApi from '../../services/apiService';
import { getTasks } from '../../utils/common';
const Task = () => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks('allOpenTasks');
  }, []);

  const fetchTasks = (filterValue) => {
    const url = camundaRequestUrl.getTaskLists;
    const body = getTasks;
    taskApi.post(url, body).then((response) => {
        setTasks(response.data);
        setSelectedTaskId(response.data[0].id)
    })
    .catch((error) => {
        console.error(error);
    });
  };

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId); // Set the selected task ID
  };

  const handleFilterChange = (filterValue) => {
    fetchTasks(filterValue);
  }

  useEffect(() => {
    // Find the selected task using selectedTaskId
    const selectedTask = tasks.find(task => task.id === selectedTaskId);
    setSelectedTask(selectedTask);
  }, [selectedTaskId]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <TaskFilter onFilterChange={handleFilterChange}/>
        <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
      </div>
      <div style={{ flex: 3, padding: '16px' }}>
        <TaskMainScreen selectedTask={selectedTask} />
      </div>
      <div style={{ flex: 1, padding: '16px' }}>
        <TaskSidebar selectedTask={selectedTask} />
      </div>
    </div>
  );
};

export default Task;
