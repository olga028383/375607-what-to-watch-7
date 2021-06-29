import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const generateList = (films) => Object.keys(films.reduce((accumulator, film) => {
  accumulator[film.genre] = true;
  return accumulator;
}, {'All genres': true}));

function GenreList(props) {
  const {films, genre, onChangeGenre} = props;

  return (
    <ul className="catalog__genres-list">

      {generateList(films).map((item, id) => {
        return (
          <li key={`${id}-filter`} className="catalog__genres-item catalog__genres-item--active">
            <a href="#" className="catalog__genres-link" onClick={(evt) => {
              evt.preventDefault();
              onChangeGenre(genre, item);
            }}>{item}</a>
          </li>
        )
      })}

    </ul>
  );
}

const mapStateToProps = (state) => ({
  genre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeGenre() {
    dispatch(ActionCreator.changeGenre());
  },
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
