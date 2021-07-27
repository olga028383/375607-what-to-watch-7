import {NameSpace} from '../reducer';

export const getFilms = (state) => state[NameSpace.DATA].films;
export const getFilmPromo = (state) => state[NameSpace.DATA].promo;
export const getIsLoadData = (state) => state[NameSpace.DATA].isDataLoaded;
