import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import AddTodo from './AddTodo.js';
import TodoList from './TodoList.js';
import { getTodos, addTodo, updateTodo, removeTodo } from '../services/todo-api.js';

class TodoApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'My Todos' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');
        const error = dom.querySelector('.error');

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        // initial todo load:
        try {
            
        }
        catch (err) {
            // display error...
        }
        finally {
            loading.update({ loading: false });
        }

    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <!-- show errors: -->
                <p class="error"></p>
                <main>
                    <!-- add todo goes here -->
                    <!-- todo list goes here -->
                </main>
            </div>
        `;
    }
}

export default TodoApp;