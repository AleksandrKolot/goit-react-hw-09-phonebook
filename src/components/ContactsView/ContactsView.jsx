import { useSelector } from 'react-redux';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import selectors from '../../redux/selectors';
function ContactsView() {
  const error = useSelector(state => selectors.getContactsError(state));
  const isLoading = useSelector(state => selectors.getContactsLoading(state));
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <p>{' Loading... '}</p>}
      {error && <p>{' Sorry, something goes wrong: ' + error}</p>}
      <ContactList />
    </>
  );
}
export default ContactsView;
