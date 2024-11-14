import { Link } from "react-router-dom";
// import './NotFound.css'; // Optional: Add a CSS file for styling

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/home">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
