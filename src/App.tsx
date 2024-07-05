import { PlusCircle } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';

import './global.module.css';
import styles from './App.module.css';

import { Header } from './components/header/Header.jsx';
import { Task, TaskTypes } from './components/task/Task.js';
import { IsEmpty } from './components/isEmpty/IsEmpty.js';

export default function App() {
  const [tasksList, setTasksList] = useState<TaskTypes[]>([]);
  const [newTaskContent, setNewTaskContent] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('@to-do:taskList');
    if(storedTasks) {
      setTasksList(JSON.parse(storedTasks));
    } else {
      setTasksList([]);
    }
  }, []);

  useEffect(() => {
      localStorage.setItem('@to-do:taskList', JSON.stringify(tasksList));
  }, [tasksList]);

  const countCheckedTasks = () => {
    return Number(tasksList.filter(task => task.isChecked).length);
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasksList.filter(task => task.id !== taskId);
    setTasksList(updatedTasks);
  };

  const handleChangeCheck = (taskId: number, isChecked: boolean) => {
    const updatedTasks = tasksList.map(task => {
      if (task.id === taskId) {
        return { ...task, isChecked };
      }
      return task;
    });
    setTasksList(updatedTasks);
  };

  const handleCreateTask = (event: FormEvent) => {
    event.preventDefault();

    const newTask = {
      id: tasksList.length + 1,
      content: newTaskContent,
      isChecked: false,
    };

    if(!newTaskContent) {
      return alert('❌ Não deixe a tarefa vazia')
    }

    setTasksList([...tasksList, newTask]);
  };

  return (
    <div className={styles.content}>
      <Header />

      <form className={styles.form} onSubmit={handleCreateTask}>
        <input
          className={styles.input}
          placeholder={newTaskContent === '' ? 'Adicione uma nova tarefa' : newTaskContent}
          value={newTaskContent}
          type="text"
          onChange={(e) => setNewTaskContent(e.target.value)}
        />
        <button className={styles.button} type='submit'>
          <p>Criar</p>
          <PlusCircle size={25} />
        </button>
      </form>

      <div className={styles.tasksSpace}>
        <header className={styles.taskHeader}>
          <aside className={styles.taskHeader_aside}>
            <p className={styles.taskHeader_text}>Tarefas criadas</p>
            <span className={styles.taskHeader_counter}>{tasksList.length}</span>
          </aside>

          <aside className={styles.taskHeader_aside}>
            <p className={styles.taskHeader_text}>Concluídas</p>
            <span className={styles.taskHeader_counter}>
              {countCheckedTasks()} de {tasksList.length}
            </span>
          </aside>
        </header>

        <div className={styles.tasksList}>
          {tasksList.length > 0 ? tasksList.map(task => (
            <Task
            key={task.id}
            id={task.id}
            content={task.content}
            isChecked={task.isChecked}
            onDeleteTask={handleDeleteTask}
            onChangeCheck={handleChangeCheck}
            />
          )) : <IsEmpty />}
        </div>
      </div>
    </div>
  );
}