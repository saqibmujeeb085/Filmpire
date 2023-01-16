import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App'
import {Provider} from 'react-redux';
import store from './App/Store';
import './index.css';
import ToggleColorModeProvider from './utils/ToggleColorMode';


const Container = document.getElementById('root');
const root = ReactDOM.createRoot(Container);
root.render(
    <Provider store={store}>
        <ToggleColorModeProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ToggleColorModeProvider>
    </Provider>
);