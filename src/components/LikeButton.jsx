import React, { useState } from 'react';

function LikeButton({ initialLiked = false, onToggle = () => {} }) {
  // Local state (you can also fully control this from the parent)
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    onToggle(newLiked);
  };

  return (
    <button className={`heart-button ${liked ? 'liked' : ''}`} onClick={toggleLike}>
      <svg viewBox="0 0 24 24">
        {/* This is a sample heart path; replace it with any heart icon you prefer */}
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 
                 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
                 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 
                 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>
  );
}

export default LikeButton;
