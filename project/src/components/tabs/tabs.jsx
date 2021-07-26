import React, {useState} from 'react';
import Overview from './overview/overview.jsx';
import Details from './details/details.jsx';
import Reviews from './reviews/reviews.jsx';
import TabItem from './tab-item/tab-item.jsx';

import {TabsName} from '../../constants.js';

import filmProp from '../film/film.prop.js';

const renderContentTab = (film, currentTab) => {

  switch (currentTab) {
    case TabsName.REVIEWS:
      return <Reviews/>;
    case TabsName.DETAILS:
      return <Details film={film}/>;
    default:
      return <Overview film={film}/>;
  }

};

function Tabs({film}) {
  const [currentTab, setCurrentTab] = useState(TabsName.OVERVIEW);

  const onClickTab = (evt) => {
    evt.preventDefault();
    setCurrentTab(evt.target.textContent);
  };

  return (
    <React.Fragment>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.values(TabsName).map((tab) => <TabItem key={tab} title={tab} currentTab={currentTab} onClickTab={onClickTab}/>)}
        </ul>
      </nav>

      {renderContentTab(film, currentTab)}

    </React.Fragment>
  );
}

Tabs.propTypes = {
  film: filmProp,
};
export default Tabs;
