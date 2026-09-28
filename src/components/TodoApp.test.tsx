import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoApp from './TodoApp';

beforeEach(() => {
  window.localStorage.clear();
});

function addTodoViaForm(text: string) {
  fireEvent.change(screen.getByLabelText(/new todo text/i), { target: { value: text } });
  fireEvent.click(screen.getByRole('button', { name: /^add$/i }));
}

describe('TodoApp', () => {
  it('renders with no todos initially', () => {
    render(<TodoApp />);
    expect(screen.getByRole('heading', { name: /todo list/i })).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('adds a todo via the form', () => {
    render(<TodoApp />);
    addTodoViaForm('Buy milk');
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  it('does not add an empty todo', () => {
    render(<TodoApp />);
    addTodoViaForm('   ');
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('toggles a todo as complete', () => {
    render(<TodoApp />);
    addTodoViaForm('Buy milk');
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('edits a todo', () => {
    render(<TodoApp />);
    addTodoViaForm('Buy milk');
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    fireEvent.change(screen.getByLabelText(/edit todo text/i), { target: { value: 'Buy bread' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText('Buy bread')).toBeInTheDocument();
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
  });

  it('deletes a todo', () => {
    render(<TodoApp />);
    addTodoViaForm('Buy milk');
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
  });

  it('persists todos to localStorage', () => {
    render(<TodoApp />);
    addTodoViaForm('Buy milk');
    const stored = JSON.parse(window.localStorage.getItem('todos') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({ text: 'Buy milk', completed: false });
  });

  it('loads previously saved todos on mount', () => {
    window.localStorage.setItem(
      'todos',
      JSON.stringify([{ id: '1', text: 'Existing task', completed: false }]),
    );
    render(<TodoApp />);
    expect(screen.getByText('Existing task')).toBeInTheDocument();
  });
});
