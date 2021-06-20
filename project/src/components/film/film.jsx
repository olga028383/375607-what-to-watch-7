import React, {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';

import VideoPlayer from './video-player/video-player';

import filmProp from '../film/film.prop.js';


function Film(props) {
  const {film, handleVideoChange} = props;
  const elementVideo = useRef(null);

  const {id, name} = film;
  const pathLink = `/films/${id}`;

  useEffect(()=>{
    //console.log(elementVideo);
    //elementVideo.current.addEventListener('mouseenter', handleVideoChange);
  });

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <VideoPlayer film={film} onMouseEnter={handleVideoChange}/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={pathLink} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}

Film.propTypes = {
  film: filmProp,
};

export default Film;
