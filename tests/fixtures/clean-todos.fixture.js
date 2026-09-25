/**
 * Clean code fixture: a small, well-factored example used by tests.
 *
 * Demonstrates: const/let, arrow functions, template literals,
 * destructuring, default parameters, optional chaining,
 * nullish coalescing, and async/await with proper error handling.
 */

const DEFAULT_TODOS = [
  { id: 1, title: 'Buy milk', done: false },
  { id: 2, title: 'Read book', done: true },
];

export const cloneTodos = (todos = DEFAULT_TODOS) =>
  todos.map((todo) => ({ ...todo }));

export const getPendingTitles = (todos = DEFAULT_TODOS) =>
  todos.filter(({ done }) => !done).map(({ title }) => title);

export const findTodoById = (todos = DEFAULT_TODOS, id) =>
  todos.find((todo) => todo.id === id) ?? null;

export const formatTodo = (todo) => {
  const status = todo?.done ? 'done' : 'pending';
  const title = todo?.title ?? '(untitled)';
  return `${title} [${status}]`;
};

export const loadTodosAsync = async (loader = async () => DEFAULT_TODOS) => {
  try {
    const todos = await loader();
    return cloneTodos(todos);
  } catch (error) {
    throw new Error(`Failed to load todos: ${error.message}`);
  }
};
