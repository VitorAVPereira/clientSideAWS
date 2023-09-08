import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import styles from '../styles/Form.module.css';
import FormCard from '../src/components/formCard/formCard';
import Input from '../src/components/input/input';
import Button from '../src/components/buttons/button';
import { useAuth } from '../src/context/AuthContext'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const loginUser = async (event) => {
    event.preventDefault();

    const res = await fetch('https://rose-dibbler-shoe.cyclic.cloud/auth/login', {
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await res.json();
    if (res.ok) {
      // Após a autenticação bem-sucedida, chame a função login do contexto de autenticação
      login(result.user); // Assumindo que 'result.user' contém informações do usuário

      // Armazene o objeto de usuário no localStorage para manter o estado entre recarregamentos de página
      localStorage.setItem('user', JSON.stringify(result.user));

      setCookie('accessToken', result.accessToken, { maxAge: 30 * 24 * 60 * 60, path: '/' });
      setCookie('refreshToken', result.refreshToken, { maxAge: 30 * 24 * 60 * 60, path: '/' });
      setCookie('username', result.user.name, { maxAge: 30 * 24 * 60 * 60, path: '/' });
      router.push('/');
    } else {
      console.error(result);
    }
  };

  return (
    <div className={styles.background}>
      <FormCard title="Login">
        <form className={styles.form} onSubmit={loginUser}>
          <Input type="text" placeholder="E-mail ou celular" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">Entrar</Button>
          <Link className={styles.link} href="/register">
            Crie sua conta
          </Link>
        </form>
      </FormCard>
    </div>
  );
}