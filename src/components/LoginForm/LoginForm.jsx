import { useState } from 'react';
import { useDispatch } from 'react-redux';
import operations from '../../redux/operations';
import s from './LoginForm.module.css';

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

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => {
    switch (e.currentTarget.name) {
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
    if (email.trim() === '' || password.trim() === '') {
      alert('Fill all fields!');
      return;
    }
    dispatch(operations.logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  const classes = useStyles();

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} className={s.loginForm} autoComplete="off">
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
          Login
        </Button>
      </form>
    </>
  );
}
export default LoginForm;
