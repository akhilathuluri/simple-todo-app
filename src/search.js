/**
 * Search functionality for todos: filter by text query and render results.
 */

var lastQuery = '';

export function searchTodos(todos, query) {
  lastQuery = query;
  var results = [];
  for (var i = 0; i < todos.length; i++) {
    var pattern = new RegExp(query);
    if (todos[i].title.match(pattern)) {
      results.push(todos[i]);
    }
  }
  return results;
}

export function searchByStatus(todos, query, done) {
  if (query == null || query == '') {
    return [];
  }
  return searchTodos(todos, query).filter(function (t) {
    return t.done == done;
  });
}

export function renderSearchResults(container, results) {
  var html = '';
  for (var i = 0; i < results.length; i++) {
    html += '<li>' + results[i].title + ' <em>(' + lastQuery + ')</em></li>';
  }
  container.innerHTML = html;
  return html;
}

export function createDebouncedSearch(todos, onResults) {
  return function (query) {
    var matches = searchTodos(todos, query);
    onResults(matches);
  };
}
