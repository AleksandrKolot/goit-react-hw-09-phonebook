import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import s from './App.module.css';
import Container from '../Container';
import HomeView from '../HomeView';
import AppBar from '../AppBar';
import RegisterForm from '../RegisterForm';
import LoginForm from '../LoginForm';
import ContactsView from '../ContactsView';
import PrivateRoute from '../../components/PrivateRoute';
import PublicRoute from '../../components/PublicRoute';

import operations from '../../redux/operations';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(operations.getCurrentUser());
    //eslint-disable-next-line
  }, []);
  return (
    <Container>
      <AppBar />
      <Switch>
        <PublicRoute path="/" exact component={HomeView} />
        <PublicRoute
          path="/register"
          component={RegisterForm}
          restricted
          redirectTo="/contacts"
        />
        <PublicRoute
          path="/login"
          component={LoginForm}
          restricted
          redirectTo="/contacts"
        />
        <PrivateRoute
          path="/contacts"
          component={ContactsView}
          redirectTo="/login"
        />
      </Switch>
    </Container>
  );
}

export default App;
