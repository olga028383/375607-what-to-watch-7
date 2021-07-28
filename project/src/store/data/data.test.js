import {data} from './data';
import {ActionType} from '../action';

const filmsId = [{id: 1}, {id: 2}];

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data(undefined, {}))
      .toEqual({isDataLoaded: false, films: [], promo: {}});
  });

  it('should set up a list of movies', () => {
    const filmsAction = {
      type: ActionType.SET_FILMS,
      payload: filmsId,
    };

    expect(data({isDataLoaded: false, films: [], promo: {}}, filmsAction))
      .toEqual({isDataLoaded: false, films: filmsId, promo: {}});

    expect(data({isDataLoaded: true, films: [], promo: {}}, filmsAction))
      .toEqual({isDataLoaded: true, films: filmsId, promo: {}});

    expect(data({isDataLoaded: true, films: [], promo: {id: 1}}, filmsAction))
      .toEqual({isDataLoaded: true, films: filmsId, promo: {id: 1}});

  });

  it('must install promo film', () => {
    const filmsAction = {
      type: ActionType.SET_FILM_PROMO,
      payload: {id: 1},
    };

    expect(data({isDataLoaded: false, films: [], promo: {}}, filmsAction))
      .toEqual({isDataLoaded: false, films: [], promo: {id: 1}});

    expect(data({isDataLoaded: true, films: [], promo: {}}, filmsAction))
      .toEqual({isDataLoaded: true, films: [], promo: {id: 1}});

    expect(data({isDataLoaded: true, films: filmsId, promo: {}}, filmsAction))
      .toEqual({isDataLoaded: true, films: filmsId, promo: {id: 1}});

  });

  it('should set the data load flag', () => {
    const isLoadAction = {
      type: ActionType.SET_IS_LOAD_DATA,
      payload: true,
    };

    expect(data({isDataLoaded: false, films: [], promo: {}}, isLoadAction))
      .toEqual({isDataLoaded: true, films: [], promo: {}});

    expect(data({isDataLoaded: false, films: [], promo: {id: 1}}, isLoadAction))
      .toEqual({isDataLoaded: true, films: [], promo: {id: 1}});

    expect(data({isDataLoaded: false, films: filmsId, promo: {}}, isLoadAction))
      .toEqual({isDataLoaded: true, films: filmsId, promo: {}});

  });
});
