import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {addFavoriteFilm} from '../../store/api-actions';
import {isCheckAuth} from '../../util';
import {setFilmPromo} from '../../store/action';
import filmProp from '../film/film.prop.js';
import {getApi} from '../../store/application/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

function FavoriteButton({film, isPromo = false, api, authorizationStatus, onSetFilmPromo, onSetFilm}) {
  const {id, isFavorite} = film;
  const history = useHistory();

  const buttonClickHandler = () => {

    if (!isCheckAuth(authorizationStatus)) {
      history.push(AppRoute.MY_LIST);
    }

    addFavoriteFilm(id, isFavorite ? 0 : 1, api)
      .then((data) => {
        if (isPromo) {
          onSetFilmPromo(data);
          return;
        }

        onSetFilm(data);
      });
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={buttonClickHandler}>
      {
        isFavorite
          ?
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
          :
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
      }
      <span>My list</span>
    </button>
  );
}

FavoriteButton.propTypes = {
  film: filmProp,
  isPromo: PropTypes.bool,
  api: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onSetFilmPromo: PropTypes.func.isRequired,
  onSetFilm: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onSetFilmPromo(promo) {
    dispatch(setFilmPromo(promo));
  },
});

const mapStateToProps = (state) => ({
  api: getApi(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export {FavoriteButton};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
