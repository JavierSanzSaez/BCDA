import logo from './logo.svg';
import './App.css';
import AppControl from './AppControl';
import AppData from './AppData';
import AppHeader from './AppHeader';

function App() {
  return (
    <div className="appCounter">
      <AppHeader/>
      <AppData />
      <AppControl />
    </div>
  );
}

export default App;
