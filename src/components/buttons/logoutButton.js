import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import styles from './logoutButton.module.css'

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    deleteCookie('refreshToken');
    deleteCookie('accessToken');
    deleteCookie('username');
    router.push('/login');
  };

  return (
    <button className={styles.logoutButton} onClick={logout}>Sair</button>
  );
}