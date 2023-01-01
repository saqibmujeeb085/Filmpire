import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App'

const Container = document.getElementById('root');
const root = ReactDOM.createRoot(Container);
root.render(
<BrowserRouter>
<App/>
</BrowserRouter>
);