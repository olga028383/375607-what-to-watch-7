import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

import filmProp from '../film.prop.js';
import {START_LOAD_VIDEO} from '../../../constants.js';

function VideoPlayer({film, isActive}) {
  const refVideo = useRef();
  const {previewVideoLink, posterImage} = film;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isActive) {
        refVideo.current.play();
      }
    }, START_LOAD_VIDEO);

    return () => {
      clearTimeout(timer);
    };
  }, [isActive]);

  return (
    isActive
      ? <video src={previewVideoLink} className="player__video" ref={refVideo} muted poster={posterImage}></video>
      : <img src={posterImage}/>
  );
}

VideoPlayer.propTypes = {
  film: filmProp,
  isActive: PropTypes.bool.isRequired,
};

export default VideoPlayer;
