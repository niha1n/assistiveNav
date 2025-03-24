import React, { useEffect, useRef } from 'react';

function CameraFeed() {
  return (
    <div>
      <img
        src="http://82.69.41.142/axis-cgi/mjpg/video.cgi"
        alt="Live Feed"
        style={{ width: '100%', maxHeight: '500px' }}
      />
    </div>
  );
}

export default CameraFeed;
