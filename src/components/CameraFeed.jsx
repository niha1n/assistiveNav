import React, { useEffect, useRef } from 'react';

function CameraFeed() {
  return (
    <div>
      <img
        src="http://192.168.193.146:5000/video_feed"
        alt="Live Feed"
        style={{ width: '100%', maxHeight: '500px' }}
      />
    </div>
  );
}

export default CameraFeed;
