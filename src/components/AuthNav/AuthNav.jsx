import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';
function AuthNav() {
  return (
    <div className={s.authNav}>
      <NavLink to="/register" className={s.link} activeClassName={s.activeLink}>
        Register
      </NavLink>
      <NavLink to="/login" className={s.link} activeClassName={s.activeLink}>
        Log In
      </NavLink>
    </div>
  );
}
export default AuthNav;
