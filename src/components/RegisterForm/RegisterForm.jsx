import { useState } from 'react';
import { useDispatch } from 'react-redux';
import operations from '../../redux/operations';
import s from './RegisterForm.module.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textField: {
    marginRight: '15px',
    marginBottom: '15px',
  },
  button: {
    textAlign: 'center',
    letterSpacing: '1px',
  },
});

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'email':
        setEmail(e.currentTarget.value);
        break;
      case 'password':
        setPassword(e.currentTarget.value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      alert('Fill all fields!');
      return;
    }
    dispatch(operations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  const classes = useStyles();

  return (
    <>
      <h1>Register Page</h1>

      <form onSubmit={handleSubmit} className={s.regForm} autoComplete="off">
        <TextField
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className={classes.textField}
          size="small"
          label="Name"
          variant="outlined"
        />

        <TextField
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className={classes.textField}
          size="small"
          label="E-mail"
          variant="outlined"
        />
        <TextField
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className={classes.textField}
          size="small"
          label="Password"
          variant="outlined"
        />
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </form>
    </>
  );
}
export default RegisterForm;
