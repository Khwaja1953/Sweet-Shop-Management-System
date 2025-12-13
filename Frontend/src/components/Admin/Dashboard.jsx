import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();

	function handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		navigate('/');
	}

	return (
		<div className="p-6 max-w-6xl mx-auto">
			<h2 className="text-2xl font-semibold">Admin Dashboard</h2>
			<p className="text-gray-600 mt-2">Welcome, admin.</p>
			<button onClick={handleLogout} className="mt-4 px-3 py-2 bg-purple-600 text-white rounded">Logout</button>
		</div>
	);
};

export default Dashboard;
