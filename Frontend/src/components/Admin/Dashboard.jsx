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
		<div style={{ padding: 20 }}>
			<h2>Admin Dashboard</h2>
			<p>Welcome, admin.</p>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Dashboard;
