import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadTodos, saveTodos } from './storage';
import type { Todo } from './todos';

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('loadTodos', () => {
  it('returns an empty array when nothing is stored', () => {
    expect(loadTodos()).toEqual([]);
  });

  it('returns previously saved todos', () => {
    const todos: Todo[] = [{ id: '1', text: 'Task', completed: false }];
    saveTodos(todos);
    expect(loadTodos()).toEqual(todos);
  });

  it('returns an empty array when stored value is corrupt JSON', () => {
    window.localStorage.setItem('todos', 'not-json{');
    expect(loadTodos()).toEqual([]);
  });

  it('returns an empty array when stored value is not an array', () => {
    window.localStorage.setItem('todos', JSON.stringify({ not: 'an array' }));
    expect(loadTodos()).toEqual([]);
  });

  it('returns an empty array when window is undefined (server rendering)', () => {
    vi.stubGlobal('window', undefined);
    expect(loadTodos()).toEqual([]);
  });
});

describe('saveTodos', () => {
  it('persists todos to localStorage', () => {
    const todos: Todo[] = [{ id: '1', text: 'Task', completed: true }];
    saveTodos(todos);
    expect(window.localStorage.getItem('todos')).toBe(JSON.stringify(todos));
  });

  it('does not throw when window is undefined (server rendering)', () => {
    vi.stubGlobal('window', undefined);
    expect(() => saveTodos([])).not.toThrow();
  });

  it('does not throw when localStorage.setItem fails (e.g. quota exceeded)', () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => saveTodos([{ id: '1', text: 'Task', completed: false }])).not.toThrow();
  });
});
