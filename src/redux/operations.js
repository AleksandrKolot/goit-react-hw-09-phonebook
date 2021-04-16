import axios from 'axios';
import actions from './actions';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';
const token = {
  set(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = ``;
  },
};

const register = credential => dispatch => {
  dispatch(actions.registerRequest());
  axios
    .post('/users/signup', credential)
    .then(res => {
      token.set(res.data.token);
      dispatch(actions.registerSuccess(res.data));
    })
    .catch(error => dispatch(actions.registerError(error.message)));
};
const logIn = credential => dispatch => {
  dispatch(actions.loginRequest());
  axios
    .post('/users/login', credential)
    .then(res => {
      token.set(res.data.token);
      dispatch(actions.loginSuccess(res.data));
    })
    .catch(error => dispatch(actions.loginError(error.message)));
};
const logOut = () => dispatch => {
  dispatch(actions.logoutRequest());
  axios
    .post('/users/logout')
    .then(res => {
      token.unset();
      dispatch(actions.logoutSuccess(res.data));
    })
    .catch(error => dispatch(actions.logoutError(error.message)));
};
const getCurrentUser = () => (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();
  if (!persistedToken) return;
  token.set(persistedToken);
  dispatch(actions.getCurrentUserRequest());
  axios
    .get('/users/current')
    .then(res => {
      dispatch(actions.getCurrentUserSuccess(res.data));
    })
    .catch(error => dispatch(actions.getCurrentUserError(error.message)));
};

//

const fetchContacts = () => dispatch => {
  dispatch(actions.fetchContactsRequest());
  axios
    .get('/contacts')
    .then(({ data }) => dispatch(actions.fetchContactsSuccess(data)))
    .catch(error => dispatch(actions.fetchContactsError(error.message)));
};

const addContact = data => dispatch => {
  dispatch(actions.addContactsRequest());
  axios
    .post('/contacts', data)
    .then(({ data }) => dispatch(actions.addContactsSuccess(data)))
    .catch(error => dispatch(actions.addContactsError(error.message)));
};

const deleteContact = id => dispatch => {
  dispatch(actions.deleteContactRequest());
  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(actions.deleteContactSuccess(id)))
    .catch(error => dispatch(actions.deleteContactError(error.message)));
};

const updateContact = id => dispatch => {
  dispatch(actions.updateContactRequest());
  axios
    .patch(`/contacts/${id}`)
    .then(() => dispatch(actions.updateContactSuccess(id)))
    .catch(error => dispatch(actions.updateContactError(error.message)));
};

const operations = {
  register,
  logIn,
  logOut,
  getCurrentUser,
  //,
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
};

export default operations;
