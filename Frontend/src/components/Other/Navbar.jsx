import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink to="/" className={({ isActive }) => `font-semibold text-purple-600 ${isActive ? 'underline' : ''}`}>
            Sweet Shop
          </NavLink>
        </div>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({ isActive }) => `text-gray-700 ${isActive ? 'font-semibold' : ''}`}>
            Home
          </NavLink>

          {!token ? (
            <>
              <NavLink to="/login" className={({ isActive }) => `text-gray-700 ${isActive ? 'font-semibold' : ''}`}>
                Login
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => `text-gray-700 ${isActive ? 'font-semibold' : ''}`}>
                Sign up
              </NavLink>
            </>
          ) : (
            <>
              {role === 'admin' && (
                <NavLink to="/admin" className={({ isActive }) => `text-gray-700 ${isActive ? 'font-semibold' : ''}`}>
                  Admin
                </NavLink>
              )}
              <button onClick={handleLogout} className="ml-2 bg-purple-600 text-white px-3 py-1 rounded">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar