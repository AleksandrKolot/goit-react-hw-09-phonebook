import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import operations from '../../redux/operations';
import selectors from '../../redux/selectors';
import s from './ContactForm.module.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textField: {
    marginBottom: '15px',
  },
});

function ContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const contacts = useSelector(state => selectors.getContactsItems(state));

  const isContactExist = () => {
    const normalizedFilter = name.toLowerCase();
    return contacts.find(
      contact => contact.name.toLowerCase() === normalizedFilter,
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || number.trim() === '') {
      alert('Fill all fields!');
      return;
    }
    const existContact = isContactExist();
    if (existContact) {
      alert(`${existContact.name} is already in contacts.`);
      return;
    }
    dispatch(operations.addContact({ name, number }));
    setName('');
    setNumber('');
  };

  const classes = useStyles();

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        className={classes.textField}
        size="small"
        label="Name"
        inputProps={{
          pattern: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
          title:
            "Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п.",
        }}
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        variant="outlined"
      />

      <TextField
        type="tel"
        name="number"
        value={number}
        onChange={handleInputChange}
        className={classes.textField}
        size="small"
        label="Number"
        inputProps={{
          pattern:
            '^[+]*[0-9]{2}?[(]?[0-9]{3}[)]?[-/s.]?[0-9]{3}[-/s.]?[0-9]{4}$',
          title:
            'Номер телефона должен состоять из 12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +',
        }}
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        startIcon={<SaveIcon />}
      >
        add contact
      </Button>
    </form>
  );
}

export default ContactForm;
