import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import filmProp from '../film/film.prop.js';
import VideoPlayer from './video-player/video-player';


function Film({film}) {
  const [isActive, setIsActive] = useState(false);
  const {id, name, posterImage} = film;

  const handleVideoActive = () => {
    setIsActive(true);
  };

  const handleVideoNotActive = () => {
    setIsActive(false);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleVideoActive} onMouseLeave={handleVideoNotActive}>
      <div className="small-film-card__image">
        {isActive ? <VideoPlayer film={film} isActive={isActive}/> : <img src={posterImage} alt={name}/>}
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}

Film.propTypes = {
  film: filmProp,
};

export default Film;
