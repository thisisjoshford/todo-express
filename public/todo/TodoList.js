import Component from '../Component.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
    
    onRender(list) {
        const todos = this.props.todos;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        
    }
    renderHTML() {
        return /*html*/`
            
        `;
    }
}

export default TodoList;
