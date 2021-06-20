import React from 'react';
import filmProp from '../film.prop.js';

function VideoPlayer({film}) {
  const {previewVideoLink, posterImage} = film;

  return (
    <video src={previewVideoLink} className="player__video"  poster={posterImage}></video>
  );
}

VideoPlayer.propTypes = {
  film: filmProp,
};

export default VideoPlayer;
