'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [userData, setUserData] = useState<{fullName: string, membershipNumber: number} | null>(null);

    const handleLogin = async () => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.success) {
                setIsSuccess(true);
                setUserData({
                    fullName: data.fullName,
                    membershipNumber: data.membershipNumber
                });
                setMessage(null);
            } else {
                setIsSuccess(false);
                setMessage(data.error || 'Credenciales incorrectas');
                setUserData(null);
            }
        } catch (error) {
            console.error("Error en el servidor:", error); // Registrar el error en la consola
            setIsSuccess(false);
            setMessage('Error al conectar con el servidor');
            setUserData(null);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Portal de Membresías</h1>
            <h2 className={styles.subtitle}>Café Aurora</h2>
            
            {!isSuccess ? (
                <>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Usuario"
                            className={styles.input}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            className={styles.input}
                        />
                    </div>
                    <button onClick={handleLogin} className={styles.button}>
                        Iniciar Sesión
                    </button>
                    {message && <p className={styles.error}>{message}</p>}
                </>
            ) : (
                <div className={styles.welcome}>
                    <h2>¡Hola, {userData?.fullName}!</h2>
                    <p>Gracias por ser parte de Café Aurora.</p>
                    <p>Tu número de membresía es: {userData?.membershipNumber}</p>
                    <button 
                        onClick={() => {
                            setIsSuccess(false);
                            setUsername('');
                            setPassword('');
                        }} 
                        className={styles.button}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    );
}