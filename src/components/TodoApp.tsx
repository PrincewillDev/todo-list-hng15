'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { addTodo, deleteTodo, editTodo, toggleTodo, type Todo } from '@/lib/todos';
import { loadTodos, saveTodos } from '@/lib/storage';
import styles from './TodoApp.module.css';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    // localStorage isn't available during SSR, so the initial todos can only be read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodos(loadTodos());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveTodos(todos);
  }, [todos, loaded]);

  function handleAdd(event: FormEvent) {
    event.preventDefault();
    setTodos((prev) => addTodo(prev, text));
    setText('');
  }

  function startEdit(todo: Todo) {
    setEditingId(todo.id);
    setEditingText(todo.text);
  }

  function commitEdit(id: string) {
    setTodos((prev) => editTodo(prev, id, editingText));
    setEditingId(null);
    setEditingText('');
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText('');
  }

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todo List</h1>
        {todos.length > 0 && (
          <span className={styles.count}>
            {remaining} {remaining === 1 ? 'task' : 'tasks'} left
          </span>
        )}
      </div>
      <form onSubmit={handleAdd} className={styles.form}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a todo"
          aria-label="New todo text"
        />
        <button type="submit" className={styles.addButton}>
          Add
        </button>
      </form>
      {todos.length === 0 ? (
        <p className={styles.empty}>No tasks yet — add one above to get started.</p>
      ) : (
        <ul className={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.item}>
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    className={styles.editInput}
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    aria-label="Edit todo text"
                  />
                  <button type="button" className={styles.saveButton} onClick={() => commitEdit(todo.id)}>
                    Save
                  </button>
                  <button type="button" className={styles.iconButton} onClick={cancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={todo.completed}
                    onChange={() => setTodos((prev) => toggleTodo(prev, todo.id))}
                    aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                  />
                  <span className={todo.completed ? styles.completed : undefined}>{todo.text}</span>
                  <button type="button" className={styles.iconButton} onClick={() => startEdit(todo)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => setTodos((prev) => deleteTodo(prev, todo.id))}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
