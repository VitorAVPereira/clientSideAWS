import React, { useState } from 'react';
import { useRouter } from 'next/router';  
import Link from 'next/link';
import styles from '../../../styles/Form.module.css';
import FormCard from "../formCard/formCard";
import Input from '../input/input';
import Button from '../buttons/button';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter(); 

    const registerUser = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            console.error('Passwords does not match');
            return;
        }

        const res = await fetch('https://rose-dibbler-shoe.cyclic.cloud/auth/register', {
            body: JSON.stringify({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                confirmPassword: confirmPassword,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        if (res.ok) {
            router.push('/login');
        } else {
            const result = await res.json();
            console.error(result.message);
        }
    }

    return (
        <div className={styles.background}>
            <FormCard title='Crie sua conta'>
                <form className={styles.form} onSubmit={registerUser}>
                    <Input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="text" placeholder="Celular" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input type="password" placeholder="Confirme a Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Button type="submit">Confirmar</Button>
                    <Link className={styles.link} href='/login'>Já tem uma conta?</Link>
                </form>
            </FormCard >
        </div>
    )
}