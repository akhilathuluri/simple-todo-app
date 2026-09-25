import { describe, it, expect } from 'vitest';
import { createTodoStore } from '../src/todo.js';

describe('createTodoStore', () => {
  it('adds a todo', () => {
    const store = createTodoStore();
    const todo = store.add('Write tests');
    expect(todo.title).toBe('Write tests');
    expect(store.list()).toHaveLength(1);
  });

  it('toggles a todo', () => {
    const store = createTodoStore();
    const todo = store.add('Write tests');
    store.toggle(todo.id);
    expect(store.list()[0].done).toBe(true);
  });
});
