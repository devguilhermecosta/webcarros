import Style from './panelheader.module.css';
import { Link } from 'react-router-dom';
import { auth } from '../../services/FirabaseConnection';
import { signOut } from 'firebase/auth';

export default function PanelHeader() {

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className={Style.C_panelheader}>
      <Link to="/dashboard">
        Dashboard
      </Link>
      <Link to="/dashboard/new">
        Novo carro
      </Link>

      <button onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  )
}