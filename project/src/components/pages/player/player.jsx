import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useParams, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import NotFound from '../../not-found/not-found';
import Loading from '../../loading/loading';
import filmProp from '../../film/film.prop.js';
import {getLengthTimeVideoFormat} from '../../../util.js';
import {getFilms} from '../../../store/data/selectors';

const PROGRESS_MIN = 0;
const PROGRESS_MAX = 100;

function Player({films}) {
  const params = useParams();
  const history = useHistory();

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const player = useRef();
  const time = useRef();
  const progress = useRef();
  const toggler = useRef();

  const film = films.filter((currentFilm) => currentFilm.id === Number(params.id));

  if (film.length === 0) {
    return (
      <NotFound/>
    );
  }

  const {videoLink} = film[0];

  const buttonPlayHandler = () => {
    setIsActive(true);
    player.current.play();

    if (player.current.currentTime === 0) {
      setIsLoading(true);
      player.current.addEventListener('canplay', canPlayHandler);
    }
  };

  const buttonStopHandler = () => {
    setIsActive(false);
    player.current.pause();
  };

  const buttonExitHandler = () => {
    player.current = null;
    history.goBack();
  };

  const fullScreenHandler = () => {
    player.current.fullscreen ? player.current.exitFullscreen() : player.current.requestFullscreen();
  };

  const canPlayHandler = () => {
    setIsLoading(false);
    player.current.removeEventListener('canplay', canPlayHandler);
  };

  const timerHandler = () => {
    time.current.textContent = getLengthTimeVideoFormat(player.current.duration - player.current.currentTime);
    const pastTime = Math.round((player.current.duration - (player.current.duration - player.current.currentTime)) / Math.round(player.current.duration / 100));
    progress.current.value = pastTime;
    toggler.current.style.left = `${pastTime}%`;
  };

  return (
    <div className="player">
      {isLoading && <Loading/>}
      <video src={videoLink} ref={player} className="player__video" poster="img/player-poster.jpg" onTimeUpdate={timerHandler}></video>

      <button type="button" className="player__exit" onClick={buttonExitHandler}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={PROGRESS_MIN} max={PROGRESS_MAX} ref={progress}></progress>
            <div className="player__toggler" ref={toggler}>Toggler</div>
          </div>
          <div className="player__time-value" ref={time}>00:00</div>
        </div>

        <div className="player__controls-row">
          {
            isActive
              ?
              <button type="button" className="player__play" onClick={buttonStopHandler}>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button>
              :
              <button type="button" className="player__play" onClick={buttonPlayHandler}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
          }
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={fullScreenHandler}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>

    </div>
  );
}


Player.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
});

export {Player};
export default connect(mapStateToProps)(Player);
