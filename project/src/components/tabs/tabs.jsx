import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

import Overview from './overview/overview.jsx';
import Details from './details/details.jsx';
import Reviews from './reviews/reviews.jsx';
import TabItem from './tab-item/tab-item.jsx';

import {TabsName} from '../../constants.js';

import filmProp from '../film/film.prop.js';
import reviewProp from '../review/review.prop.js';

const renderContentTab = (comments, film, params) => {

  switch (params[0]) {
    case TabsName.REVIEWS:
      return <Reviews comments={comments}/>;
    case TabsName.DETAILS:
      return <Details film={film}/>;
    default:
      return <Overview film={film}/>;
  }

};

function Tabs({film, comments}) {
  const {id} = film;
  const params = useParams();

  return (
    <React.Fragment>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <TabItem to={`/films/${id}`} className={'film-nav__link'} title={'Overview'}/>
          <TabItem to={`/films/${id}/details`} className={'film-nav__link'} title={'Details'}/>
          <TabItem to={`/films/${id}/reviews`} className={'film-nav__link'} title={'Reviews'}/>
        </ul>
      </nav>

      {renderContentTab(comments, film, params)}

    </React.Fragment>
  );
}

Tabs.propTypes = {
  film: filmProp,
  comments: PropTypes.arrayOf(reviewProp).isRequired,
};
export default Tabs;
