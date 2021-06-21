import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import filmProp from '../film/film.prop.js';
import VideoPlayer from './video-player/video-player';


function Film({film}) {
  const [active, setActive] = useState(false);
  const {id, name} = film;

  const handleVideoActive = () => {
    setActive(true);
  };

  const handleVideoNotActive = () => {
    setActive(false);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleVideoActive} onMouseLeave={handleVideoNotActive}>
      <div className="small-film-card__image">
        <VideoPlayer film={film} isActive={active}/>
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
