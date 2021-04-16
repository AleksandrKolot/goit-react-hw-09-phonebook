import { useSelector } from 'react-redux';
import s from './AppBar.module.css';
import MainNav from '../MainNav';
import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';
import selectors from '../../redux/selectors';

function AppBar() {
  const isAuthenticated = useSelector(selectors.isAuthenticated);
  return (
    <div className={s.AppBar}>
      <MainNav />

      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </div>
  );
}
export default AppBar;
