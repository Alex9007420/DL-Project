import './Footer.css'; // Optional CSS for styling

function Footer() {
  return (
    <nav className="footer">
      <div className="footer-container">
        {/* <ul className="footer-links">
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
        </ul> */}
        <p>&copy; 2024 My Company. All Rights Reserved.</p>
      </div>
      
    </nav>
  );
}

export default Footer;
