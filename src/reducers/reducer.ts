import { combineReducers, Reducer } from 'redux';
import { exampleReducer } from './exampleReducer';
import { localeReducer } from './localeReducer';
import { Locale } from '../actions/localeAction';
export interface RootState {
    example: number;
    locale: Locale;
}

export const reducer: Reducer<RootState> = combineReducers({
    example: exampleReducer,
    locale: localeReducer
});