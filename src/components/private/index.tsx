// criar um componente para checar minha useContext
// se existir usuário, ele renderiza a rota, senão, renderiza um componente de loading
import { ReactNode, useContext } from 'react';
import { AuthContext } from '../../contexts/authcontext';
import { Navigate } from 'react-router-dom';

interface PrivateProps {
  children: ReactNode;
}

type RouterData = ReactNode;

export default function Private({ children }: PrivateProps): RouterData {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/login" />
  }

  return children;
}