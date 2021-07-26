import React from 'react';
import PropTypes from 'prop-types';

function TabItem({title, currentTab, onClickTab}) {
  const activeTab = (currentTab === title) && 'film-nav__item--active';
  return (
    <li className={`film-nav__item ${activeTab}`}>
      <a href="#" className="film-nav__link" onClick={onClickTab}>{title}</a>
    </li>
  );
}

TabItem.propTypes = {
  title: PropTypes.string.isRequired,
  currentTab: PropTypes.string.isRequired,
  onClickTab: PropTypes.func.isRequired,
};

export default TabItem;
