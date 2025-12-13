import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postJSON, parseJwt } from '../../utils/api';

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
                // store user info if returned
                if (result.user && result.user.role) {
                    localStorage.setItem('role', result.user.role);
                }
                const payload = parseJwt(result.token);
                const role = (result.user && result.user.role) || (payload && payload.role) || 'user';

                if (role === 'admin') navigate('/admin');
                else navigate('/');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            {error && <div className="text-red-700 bg-red-100 p-2 rounded mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="flex flex-col text-sm text-gray-700">
                    Email
                    <input
                        className="mt-1 p-2 border rounded"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className="flex flex-col text-sm text-gray-700">
                    Password
                    <input
                        className="mt-1 p-2 border rounded"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button disabled={isLoading} type="submit" className="mt-3 bg-purple-600 text-white p-2 rounded">
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="text-sm mt-4 text-gray-600">
                Don't have an account? <Link to="/signup" className="text-purple-600 font-medium">Sign up</Link>
            </div>
        </div>
    );
};

export default Login;