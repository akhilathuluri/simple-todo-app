import { describe, it, expect } from 'vitest';
import {
  cloneTodos,
  getPendingTitles,
  findTodoById,
  formatTodo,
  loadTodosAsync,
} from './fixtures/clean-todos.fixture.js';

describe('clean code fixture', () => {
  it('clones todos without sharing references', () => {
    const cloned = cloneTodos();
    expect(cloned).toHaveLength(2);
    expect(cloned[0]).not.toBe(cloneTodos()[0]);
  });

  it('lists pending titles', () => {
    expect(getPendingTitles()).toEqual(['Buy milk']);
  });

  it('finds a todo by id or returns null', () => {
    expect(findTodoById([], 99)).toBeNull();
    expect(findTodoById(undefined, 1)?.title).toBe('Buy milk');
  });

  it('formats todos with status', () => {
    expect(formatTodo({ title: 'Hi', done: true })).toBe('Hi [done]');
    expect(formatTodo(null)).toBe('(untitled) [pending]');
  });

  it('loads todos asynchronously', async () => {
    await expect(loadTodosAsync()).resolves.toHaveLength(2);
    await expect(loadTodosAsync(async () => { throw new Error('boom'); })).rejects.toThrow(
      'Failed to load todos'
    );
  });
});
