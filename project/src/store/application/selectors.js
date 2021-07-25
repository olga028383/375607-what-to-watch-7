import {NameSpace} from '../reducer';

export const getGenre = (state) => state[NameSpace.APPLICATION].genre;
export const getApi = (state) => state[NameSpace.APPLICATION].api;
