import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import selectors from '../../redux/selectors';
import s from './MainNav.module.css';
function MainNav() {
  const isAuthenticated = useSelector(selectors.isAuthenticated);
  return (
    <nav className={s.mainNav}>
      <NavLink to="/" exact className={s.link} activeClassName={s.activeLink}>
        Main
      </NavLink>
      {isAuthenticated && (
        <NavLink
          to="/contacts"
          className={s.link}
          activeClassName={s.activeLink}
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
export default MainNav;
