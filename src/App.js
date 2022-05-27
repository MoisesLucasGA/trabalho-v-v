import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes';
import 'antd/dist/antd.css';
import BarApp from "./components/BarApp/BarApp"

function App() {
  return (
    <>
      <BarApp />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
