import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import actions from './actions';

const initState = { name: null, email: null };
const user = createReducer(initState, {
  [actions.registerSuccess.type]: (state, action) => action.payload.user,
  [actions.loginSuccess.type]: (state, action) => action.payload.user,
  [actions.logoutSuccess.type]: () => initState,
  [actions.getCurrentUserSuccess.type]: (state, action) => action.payload,
});
const token = createReducer(null, {
  [actions.registerSuccess.type]: (state, action) => action.payload.token,
  [actions.loginSuccess.type]: (state, action) => action.payload.token,
  [actions.logoutSuccess.type]: () => null,
});
const error = createReducer(null, {
  [actions.registerError.type]: (state, action) => action.payload,
  [actions.loginError.type]: (state, action) => action.payload,
  [actions.logoutError.type]: (state, action) => action.payload,
  [actions.getCurrentUserError.type]: (state, action) => action.payload,
});

const isAuthenticated = createReducer(false, {
  [actions.registerSuccess.type]: () => true,
  [actions.loginSuccess.type]: () => true,
  [actions.getCurrentUserSuccess.type]: () => true,
  [actions.logoutSuccess.type]: () => false,
  [actions.registerError.type]: () => false,
  [actions.loginError.type]: () => false,
  [actions.getCurrentUserError.type]: () => false,
});

//------------

const itemContactReducer = createReducer([], {
  [actions.fetchContactsSuccess.type]: (state, actions) => actions.payload,
  [actions.addContactsSuccess.type]: (state, action) => [
    ...state,
    action.payload,
  ],
  [actions.deleteContactSuccess.type]: (state, action) => {
    const filtered = state.filter(el => el.id !== action.payload);
    return [...filtered];
  },
  [actions.logoutSuccess.type]: () => [],
});

const filterContactReducer = createReducer('', {
  [actions.filterContact.type]: (state, action) => action.payload,
});

const loadingContactReducer = createReducer(false, {
  [actions.fetchContactsRequest.type]: () => true,
  [actions.fetchContactsSuccess.type]: () => false,
  [actions.fetchContactsError.type]: () => false,
  [actions.addContactsRequest.type]: () => true,
  [actions.addContactsSuccess.type]: () => false,
  [actions.addContactsError.type]: () => false,
  [actions.deleteContactRequest.type]: () => true,
  [actions.deleteContactSuccess.type]: () => false,
  [actions.deleteContactError.type]: () => false,
});

const errotContactReducer = createReducer('', {
  [actions.fetchContactsError.type]: (state, action) => action.payload,
  [actions.addContactsError.type]: (state, action) => action.payload,
  [actions.deleteContactError.type]: (state, action) => action.payload,
  [actions.fetchContactsRequest.type]: () => '',
  [actions.addContactsRequest.type]: () => '',
  [actions.deleteContactRequest.type]: () => '',
});

const contacts = combineReducers({
  items: itemContactReducer,
  filter: filterContactReducer,
  loading: loadingContactReducer,
  error: errotContactReducer,
});
const auth = combineReducers({
  user,
  isAuthenticated,
  token,
  error,
});

const reducers = { contacts, auth };
export default reducers;
