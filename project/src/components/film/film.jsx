import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import filmProp from '../film/film.prop.js';


function Film({isPlaying, film, onVideoChange}) {
  const elementVideo = useRef(null);

  const {id, name, previewVideoLink, posterImage} = film;
  const pathLink = `/films/${id}`;

  useEffect(() => {
    if (isPlaying) {
      elementVideo.current.play();
      return;
    }

    elementVideo.current.pause();
    elementVideo.current.currentTime = 0;
    elementVideo.current.load();

  }, [isPlaying]);

  return (
    <article className="small-film-card catalog__films-card"  onMouseEnter={onVideoChange}>
      <div className="small-film-card__image">
        {/*<VideoPlayer film={film}/>*/}
        <video src={previewVideoLink} className="player__video" muted ref={elementVideo} poster={posterImage}></video>
      </div>
      <h3 className="small-film-card__title">
        <Link to={pathLink} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}

Film.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onVideoChange: PropTypes.func.isRequired,
  film: filmProp,
};

export default Film;
