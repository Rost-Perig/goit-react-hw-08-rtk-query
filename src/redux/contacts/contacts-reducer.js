
import { createReducer } from '@reduxjs/toolkit';
import { search } from './contacts-actions';

const filter = createReducer('', {
    [search]: (_, { payload }) => payload
});

export default filter;






