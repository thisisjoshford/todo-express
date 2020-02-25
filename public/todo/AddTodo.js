import Component from '../Component.js';

class AddTodo extends Component {

    onRender(form) {
        const onAdd = this.props.onAdd;
        
        form.addEventListener('submit', async event => {
            event.preventDefault();

            try {
                await onAdd(catType);
                // this only runs if no error:
                form.reset();
                document.activeElement.blur();
            }
            catch (err) {
                // nothing to do as App will show error,
                // but will keep form from clearing...
            }
        });
    }

    renderHTML() {
        return /*html*/`
            <form>
                
            </form>
        `;
    }
}

export default AddTodo;