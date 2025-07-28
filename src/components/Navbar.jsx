import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

export default function Navbar() {
  return (
    <div className="main-menu">
      <h1>Three.js Projects</h1>
      <ul>
        <li><Link to="/practice_1">Hello Cube</Link></li>
        <li><Link to="/practice_2">Meme Replica</Link></li>
        <li><Link to="/practice_3">Solar System</Link></li>
      </ul>
    </div>
  );
}
