import logo from '../../assets/logo.svg';
import Style from './header.module.css';
import { FiUser, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authcontext';
import { useContext } from 'react';

export default function Header() {
  const { signed, loadingAuth } = useContext(AuthContext);

  return (
    <div className={Style.container}>
      <header className={Style.C_header}>
        <div className={Style.C_header_logo}>
          <Link to="/">
            <img src={logo} alt="logo da loja" />
          </Link>
        </div>

        {!loadingAuth && signed && (
          <Link to="/dashboard">
            <div className={Style.C_header_logo_container}>
              <FiUser className={Style.C_header_logo} />
            </div>
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to="/login">
            <div className={Style.C_header_logo_container}>
              <FiLogIn className={Style.C_header_logo} />
            </div>
          </Link>
        )}
      </header>
    </div>
  )
}