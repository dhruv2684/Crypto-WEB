import React, { useState, useEffect } from 'react'; // ✅ include useEffect
import releases from '../releaseData';
import './RabbitRelease.css';

const RabbitRelease = () => {
  const [selectedRelease, setSelectedRelease] = useState(null);

  // 🔁 Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedRelease ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedRelease]);

  return (
    <div className="release-container">
      <h2 className="title">🐇 RabbitXQ Releases</h2>

      <div className="release-grid">
        {releases.map((release, index) => (
          <div
            key={index}
            className="release-card"
            onClick={() => setSelectedRelease(release)}
          >
            <h3>{release.version}</h3>
            <p><strong>{release.title}</strong></p>
            <p className="date">{release.date}</p>
            <p>{release.summary}</p>
          </div>
        ))}
      </div>

      {selectedRelease && (
        <div className="release-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedRelease(null)}>&times;</span>
            <h2>{selectedRelease.version} – {selectedRelease.title}</h2>
            <p><strong>Date:</strong> {selectedRelease.date}</p>
            <div className="details">
              <pre>{selectedRelease.fullDetails}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RabbitRelease;
