import TodoItem from '../todo-list/TodoItem.js';
const test = QUnit.test;

QUnit.module('Render Todo Item');

test('renders html from data', assert => {
    // arrange
    const todo = {
        id: 3,
        task: 'Tested Design',
        complete: true
    };

    const expected = /*html*/`
        
    `;

    // act
    const todoItem = new TodoItem({ todo: todo });
    const html = todoItem.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});