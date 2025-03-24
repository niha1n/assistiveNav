import React, { useEffect, useRef } from 'react';

function CameraFeed() {
  return (
    <div>
      <img
        src="http://localhost:5000/video_feed"
        alt="Live Feed"
        style={{ width: '100%', maxHeight: '500px' }}
      />
    </div>
  );
}

export default CameraFeed;
