import { Link } from "react-router-dom";
import './NavBar.css'; // Optional CSS for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img className="logo" src="/src/assets/DISCO logo.png" alt="Description of the image" />
        <div className="navbar-links-container">
          <ul className="navbar-links">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/data">Data</Link>
            </li>
            <li>
              <Link to="/submit">Submit</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-links1-container">
          <ul className="navbar-links1">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
        
      </div>
      
    </nav>
  );
}

export default Navbar;
