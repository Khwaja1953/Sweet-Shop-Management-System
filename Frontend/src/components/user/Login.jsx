import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postJSON } from '../../utils/api';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const result = await postJSON('/api/auth/login', { email, password });
            if (result.token) {
                localStorage.setItem('token', result.token);
            }
            if (result.isAdmin){
                navigate('/dashboard')
            }
            else{

                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-form">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button disabled={isLoading} type="submit">
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="meta">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    );
};

export default Login;