import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postJSON } from '../../utils/api';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const result = await postJSON('/api/auth/register', { name, email, password, role });
            if (result.token) {
                localStorage.setItem('token', result.token);                
                if (result.user && result.user.role) {
                    localStorage.setItem('role', result.user.role);
                }
                const roleFromRes = result.user && result.user.role ? result.user.role : 'user';
                if (roleFromRes === 'admin') navigate('/admin');
                else navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
            {error && <div className="text-red-700 bg-red-100 p-2 rounded mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="flex flex-col text-sm text-gray-700">
                    Name
                    <input className="mt-1 p-2 border rounded" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label className="flex flex-col text-sm text-gray-700">
                    Email
                    <input className="mt-1 p-2 border rounded" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label className="flex flex-col text-sm text-gray-700">
                    Password
                    <input className="mt-1 p-2 border rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label className="flex flex-col text-sm text-gray-700">
                    Role
                    <select className="mt-1 p-2 border rounded" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <button disabled={isLoading} type="submit" className="mt-3 bg-purple-600 text-white p-2 rounded">{isLoading ? 'Signing up...' : 'Sign up'}</button>
            </form>
            <div className="text-sm mt-4 text-gray-600">Already have an account? <Link to="/login" className="text-purple-600 font-medium">Login</Link></div>
        </div>
    );
};

export default Signup;
