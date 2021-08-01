import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {addFavoriteFilm} from '../../store/api-actions';
import {isCheckAuth} from '../../util';
import {setFilmPromoAction} from '../../store/action';
import filmProp from '../film/film.prop.js';
import {getActionApi} from '../../store/application/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

function FavoriteButton({film, isPromo = false, getApi, authorizationStatus, setFilmPromo, setFilm}) {
  const {id, isFavorite} = film;
  const history = useHistory();

  const buttonClickHandler = () => {

    if (!isCheckAuth(authorizationStatus)) {
      history.push(AppRoute.LOGIN);
      return;
    }

    addFavoriteFilm(id, isFavorite ? 0 : 1, getApi)
      .then((data) => {
        if (isPromo) {
          setFilmPromo(data);
          return;
        }

        setFilm(data);
      });
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={buttonClickHandler}>
      {
        isFavorite
          ?
          <svg viewBox="0 0 18 14" width="18" height="14" data-testid="in-list">
            <use xlinkHref="#in-list"></use>
          </svg>
          :
          <svg viewBox="0 0 19 20" width="19" height="20" data-testid="add">
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
  getApi: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  setFilmPromo: PropTypes.func.isRequired,
  setFilm: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  setFilmPromo(promo) {
    dispatch(setFilmPromoAction(promo));
  },
});

const mapStateToProps = (state) => ({
  getApi: getActionApi(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export {FavoriteButton};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
