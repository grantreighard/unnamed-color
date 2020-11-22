
import './App.css';
import MakeAColor from './components/makeAColor';
import NamedColorsList from './components/namedColorsList';
import { Twitter } from 'react-social-sharing';

function App() {
  return (
    <div className="App">
      <MakeAColor/>
      <NamedColorsList/>
      <p className="copyright">Copyright &copy; {new Date().getFullYear()} Reighard Enterprises</p>
      <Twitter link="https://www.unnamedcolor.com" name="Share on Twitter" message="Check out this cool webapp that generates an unnamed color (according to CSS)." label={serviceName => serviceName} />
    </div>
  );
}

export default App;
