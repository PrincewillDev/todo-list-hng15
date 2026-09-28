import { describe, expect, it } from 'vitest';
import { addTodo, deleteTodo, editTodo, toggleTodo, type Todo } from './todos';

describe('addTodo', () => {
  it('adds a new todo with trimmed text and completed=false', () => {
    const result = addTodo([], '  Buy milk  ');
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ text: 'Buy milk', completed: false });
    expect(result[0].id).toBeTruthy();
  });

  it('does not add empty or whitespace-only text', () => {
    expect(addTodo([], '')).toEqual([]);
    expect(addTodo([], '   ')).toEqual([]);
  });

  it('appends to existing todos without mutating the input array', () => {
    const existing: Todo[] = [{ id: '1', text: 'Existing', completed: false }];
    const result = addTodo(existing, 'New');
    expect(existing).toHaveLength(1);
    expect(result).toHaveLength(2);
  });
});

describe('editTodo', () => {
  const todos: Todo[] = [
    { id: '1', text: 'Old text', completed: false },
    { id: '2', text: 'Other', completed: true },
  ];

  it('updates the text of the matching todo', () => {
    const result = editTodo(todos, '1', '  New text  ');
    expect(result.find((t) => t.id === '1')?.text).toBe('New text');
  });

  it('leaves other todos unchanged', () => {
    const result = editTodo(todos, '1', 'New text');
    expect(result.find((t) => t.id === '2')).toEqual(todos[1]);
  });

  it('ignores empty or whitespace-only edits', () => {
    const result = editTodo(todos, '1', '   ');
    expect(result).toEqual(todos);
  });
});

describe('toggleTodo', () => {
  it('flips the completed state of the matching todo', () => {
    const todos: Todo[] = [{ id: '1', text: 'Task', completed: false }];
    const result = toggleTodo(todos, '1');
    expect(result[0].completed).toBe(true);
    expect(toggleTodo(result, '1')[0].completed).toBe(false);
  });

  it('leaves other todos unchanged', () => {
    const todos: Todo[] = [
      { id: '1', text: 'A', completed: false },
      { id: '2', text: 'B', completed: false },
    ];
    const result = toggleTodo(todos, '1');
    expect(result[1]).toEqual(todos[1]);
  });
});

describe('deleteTodo', () => {
  it('removes the matching todo', () => {
    const todos: Todo[] = [
      { id: '1', text: 'A', completed: false },
      { id: '2', text: 'B', completed: false },
    ];
    expect(deleteTodo(todos, '1')).toEqual([todos[1]]);
  });

  it('returns an equivalent array when the id is not found', () => {
    const todos: Todo[] = [{ id: '1', text: 'A', completed: false }];
    expect(deleteTodo(todos, 'missing')).toEqual(todos);
  });
});
