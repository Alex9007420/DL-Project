import { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';

interface User {
  username: string;
  score: number;
}

const tabs = ['Left/Right Task', 'Saccade Task', 'Fixation Task', 'Segmentation Task', 'Scanpath Task', 'Path Task']; // Define tab names

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("Left/Right Task"); // Default to the first tab
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch leaderboard data for the active tab
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/leaderboard/?tab=${activeTab}`);
        setUsers(response.data as any);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setError("Failed to load leaderboard data.");
      }
    };

    fetchLeaderboard();
  }, [activeTab]); // Re-fetch data when the active tab changes

  return (
    <div className="leaderboard-page">
      
      {/* Tabs Section */}
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <h1>Leaderboard</h1>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Leaderboard Table */}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.username}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
