import React from 'react';
import PropTypes from 'prop-types';
import {Route, Link, useLocation, useParams} from 'react-router-dom';

import Overview from './overview/overview.jsx';
import Details from './details/details.jsx';
import Reviews from './reviews/reviews.jsx';

import {TabsName} from '../../constants.js';

import filmProp from '../film/film.prop.js';
import reviewProp from '../review/review.prop.js';

function ListItemLink({to, title, ...rest}) {
  let location = useLocation();
  return (
    <Route
      path={to}
      children={({match}) => (
        <li className={(match && match.path === location.pathname) ? "film-nav__item  film-nav__item--active" : "film-nav__item "}>
          <Link to={to} {...rest}>{title}</Link>
        </li>
      )}
    />
  );
}

const renderContentTab = (comments, film) => {
  let params = useParams();
  switch (params[0]) {
    case TabsName.REVIEWS:
      return <Reviews comments={comments}/>
      break;
    case TabsName.DETAILS:
      return <Details film={film}/>
      break;
    default:
      return <Overview film={film}/>
  }
};

function Tabs({film, comments}) {
  const {id} = film;

  return (
    <React.Fragment>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <ListItemLink to={`/films/${id}`} className={'film-nav__link'} title={'Overview'}/>
          <ListItemLink to={`/films/${id}/details`} className={'film-nav__link'} title={'Details'}/>
          <ListItemLink to={`/films/${id}/reviews`} className={'film-nav__link'} title={'Reviews'}/>
        </ul>
      </nav>

      {renderContentTab(comments, film)}

    </React.Fragment>
  );
}

Tabs.propTypes = {
  film: filmProp,
  comments: PropTypes.arrayOf(reviewProp).isRequired,
};
export default Tabs;
