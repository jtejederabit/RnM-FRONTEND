import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../store/loginSlice';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import useAxios from "../utils/hooks/useAxios.tsx";
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { request } = useAxios();
    const token = useSelector((state: RootState) => state.login.token);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const path = isLogin ? '/login' : '/register';
        const data = isLogin ? { username, password } : { username, password, email };

        try {
            setLoading(true);

            const response = await request(path, {
                method: 'POST',
                data,
            });

            setTimeout(() => {
                dispatch(setUser(response.user));
                dispatch(setToken(response.accessToken));
                setLoading(false);
                navigate('/');
            }, 3000)

        } catch (error) {
            console.error(`${isLogin ? 'Login' : 'Registration'} failed:`, error);
        }
    };

    useEffect(() => {
        if (token && !loading) {
            navigate('/');
        }
    }, [navigate, token]);

    return (
        <div className="loginPage">
            <form className="loginForm" onSubmit={handleSubmit}>
                <img src="/img.png" alt="rnmLogo" className="formImage"/>
                {
                    loading ? (
                        <img
                            src="/img_1.png"
                            alt="portalLogo"
                            className="loadingImage"/>
                    ) : (
                        <>
                            <input
                                className="formInput"
                                required
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {!isLogin && (
                                <input
                                    className="formInput"
                                    required
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            )}
                            <input
                                className="formInput"
                                required
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="formButton"
                                type="submit"
                            >
                                {isLogin ? 'Login' : 'Register'}
                            </button>
                            <button
                                className="toggleButton"
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? 'Or Register' : 'Already have an account? Login'}
                            </button>
                        </>
                    )
                }

            </form>
        </div>
    );
};

export default LoginPage;
