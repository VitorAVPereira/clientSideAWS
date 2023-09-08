import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import styles from './logoutButton.module.css'
import { useAuth } from '@/context/AuthContext';

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    // Chame a função de logout do contexto de autenticação
    logout();

    // Limpe os cookies
    deleteCookie('refreshToken');
    deleteCookie('accessToken');
    deleteCookie('username');

    // Redirecione para a página de login
    router.push('/login');
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>Sair</button>
  );
}