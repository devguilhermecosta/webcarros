import logo from '../../assets/logo.svg';
import Style from './header.module.css';
import { LiaUserCircle } from 'react-icons/lia';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={Style.C_header}>
      <div className={Style.C_header_logo}>
        <Link to="/">
          <img src={logo} alt="logo da loja" />
        </Link>
      </div>
      <Link to="/dashboard">
        <LiaUserCircle size={45} className={Style.C_header_logo} />
      </Link>
    </header>
  )
}