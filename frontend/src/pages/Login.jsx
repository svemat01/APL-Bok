import React, { useState } from 'react';
import logo from '../pictures/TracifyLogo.png';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here
        console.log(`Logging in with username: ${username} and password: ${password}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h2 className="mb-4 text-2xl font-bold">Login</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="w-full p-2 border rounded"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="w-full p-2 border-2 rounded"
                    style={{ backgroundColor: 'white', color: '#581C87' }}
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

const Navbar = () => {
    return (
        <nav className="fixed inset-x-0 top-0 flex items-center justify-center p-4" style={{ backgroundColor: '#581C87' }}>
            <h1 className="text-4xl text-white">Tracify</h1>
        </nav>
    );
}

export const Welcome = () => {
    return (
        <>
            <Navbar />
            <LoginForm />
        </>
    );
}
