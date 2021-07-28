import {application} from './application';
import {ActionType} from '../action';
import {ALL_GENRES} from '../../constants';

describe('Reducer: application', () => {
  it('without additional parameters should return initial state', () => {
    expect(application(undefined, {}))
      .toEqual({genre: ALL_GENRES, api: {}});
  });

  it('should change genre', () => {
    const genreAction = {
      type: ActionType.CHANGE_GENRE,
      payload: 'comedy',
    };

    expect(application({genre: ALL_GENRES, api: {}}, genreAction))
      .toEqual({genre: 'comedy', api: {}});

    expect(application({genre: ALL_GENRES, api: 'something'}, genreAction))
      .toEqual({genre: 'comedy', api: 'something'});
  });

  it('should add api', () => {
    const genreAction = {
      type: ActionType.GET_API,
      payload: 'something',
    };

    expect(application({genre: ALL_GENRES, api: {}}, genreAction))
      .toEqual({genre: ALL_GENRES, api: 'something'});

    expect(application({genre: 'comedy', api: {}}, genreAction))
      .toEqual({genre: 'comedy', api: 'something'});
  });
});
