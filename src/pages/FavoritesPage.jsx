import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import JobCard from '../components/JobCard';
import '../styles/FavoritesPage.css';

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="favorites-container">
      <h1>Your Favorite Jobs</h1>
      {favorites.length > 0 ? (
        <div className="favorites-list">
          {favorites.map((job) => (
            <div key={job.id} className="favorite-job">
              <JobCard job={job} />
              <button
                className="remove-btn"
                onClick={() => removeFavorite(job.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite jobs yet.</p>
      )}
    </div>
  );
}

export default FavoritesPage;
