const URL = '/api';

async function fetchWithError(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        return data;
    }
    else {
        throw data.error;
    }
}

export function getTodos() {  
    const url = `${URL}/todos`;
    return fetchWithError(url);
}

export function addTodo(todo) {  
    
}

export function updateTodo(todo) {  
    
}

export function removeTodo(todoId) {  
    
}

