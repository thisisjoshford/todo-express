import Component from '../Component.js';
import Header from '../common/Header.js';

class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <p>This will be the user login on day 2</p>
                </main>
            </div>
        `;
    }
}

export default App;