import { createSelector } from '@reduxjs/toolkit';

const getToken = state => state.auth.token;

const isAuthenticated = state => state.auth.isAuthenticated;

const getUserName = state => state.auth.user.name;
const getUserEmail = state => state.auth.user.email;

const getContactsItems = state => state.contacts.items;
const getContactsFilter = state => state.contacts.filter;
const getContactsError = state => state.contacts.error;
const getContactsLoading = state => state.contacts.loading;

const getContactList = createSelector(
  [getContactsItems, getContactsFilter],
  (items, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return items.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  },
);
const selectors = {
  getToken,
  isAuthenticated,
  getUserName,
  getUserEmail,
  getContactsItems,
  // getContactsFilter,
  getContactsError,
  getContactsLoading,
  getContactList,
};
export default selectors;
