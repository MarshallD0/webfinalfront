'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({ fullName: '', membershipNumber: 0 });

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                setIsLoggedIn(true);
                setUserData({
                    fullName: data.fullName,
                    membershipNumber: data.membershipNumber
                });
                setMessage('');
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Error connecting to server');
        }
    };

    return (
        <div className={styles.container}>
            {!isLoggedIn ? (
                <>
                    <h1>Portal de Membresías</h1>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Usuario"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                    />
                    <button onClick={handleLogin}>Iniciar Sesión</button>
                    {message && <p className={styles.error}>{message}</p>}
                </>
            ) : (
                <div className={styles.welcome}>
                    <h2>¡Bienvenido, {userData.fullName}!</h2>
                    <p>Número de membresía: {userData.membershipNumber}</p>
                    <button onClick={() => setIsLoggedIn(false)}>Cerrar Sesión</button>
                </div>
            )}
        </div>
    );
}