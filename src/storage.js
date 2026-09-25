/**
 * Persistence helpers: serialize the store to JSON and restore it.
 */
export function serialize(todos) {
  return JSON.stringify(todos);
}

export function deserialize(json) {
  const parsed = JSON.parse(json);
  if (!Array.isArray(parsed)) throw new Error('Invalid todo data');
  return parsed;
}
