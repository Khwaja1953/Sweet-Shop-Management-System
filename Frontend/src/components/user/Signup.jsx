import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postJSON } from '../../utils/api';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const result = await postJSON('/api/auth/register', { name, email, password });
            if (result.token) {
                localStorage.setItem('token', result.token);
            }
            navigate('/');
        } catch (err) {
            setError(err.message || 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-form">
            <h2>Sign up</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
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
                    {isLoading ? 'Signing up...' : 'Sign up'}
                </button>
            </form>
            <div className="meta">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default Signup;
