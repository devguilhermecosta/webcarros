import logo from '../../assets/logo.svg';
import Style from './header.module.css';
import { FiUser, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Header() {
  const isLoading = false;
  const signIn = false;

  return (
    <header className={Style.C_header}>
      <div className={Style.C_header_logo}>
        <Link to="/">
          <img src={logo} alt="logo da loja" />
        </Link>
      </div>

      {!isLoading && signIn && (
        <Link to="/dashboard">
          <div className={Style.C_header_logo_container}>
            <FiUser className={Style.C_header_logo} />
          </div>
        </Link>
      )}

      {!isLoading && !signIn && (
        <Link to="/login">
          <div className={Style.C_header_logo_container}>
            <FiLogIn className={Style.C_header_logo} />
          </div>
        </Link>
      )}

    </header>
  )
}