import React, { useEffect, useRef } from 'react';

function CameraFeed() {
  return (
    <div>
      <img
        src="http://raspberrypi.local:5000/video_feed"
        alt="Live Feed"
        style={{ width: '100%', maxHeight: '500px' }}
      />
    </div>
  );
}
export default CameraFeed;
