/**
 * Core todo store: create, toggle, remove, and list todos.
 */
export function createTodoStore(initial = []) {
  let todos = [...initial];
  let nextId = todos.length + 1;

  return {
    add(title) {
      if (typeof title !== 'string' || title.trim() === '') {
        throw new Error('Todo title must be a non-empty string');
      }
      const todo = { id: nextId++, title: title.trim(), done: false };
      todos.push(todo);
      return todo;
    },

    toggle(id) {
      const todo = todos.find((t) => t.id === id);
      if (!todo) throw new Error(`Todo ${id} not found`);
      todo.done = !todo.done;
      return todo;
    },

    remove(id) {
      const before = todos.length;
      todos = todos.filter((t) => t.id !== id);
      return todos.length < before;
    },

    list() {
      return [...todos];
    },
  };
}
