import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/authSlice';
import { getCsrfToken, axiosForLogin } from '../../api/axiosForLogin'; // Import axiosForLogin and getCsrfToken
import { STATUS } from '../../redux/authSlice'; // Import status constants
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth); // Get status and error from Redux store
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart()); // Set loading state

    try {
        await getCsrfToken(); // Fetch CSRF token

        const response = await axiosForLogin.post('/login', { email, password });

        // Ensure the role exists and is correctly assigned
        const { user } = response.data;
        const role = user.role; // Default to 'user' if role is missing

        // Dispatch loginSuccess with user & role
        dispatch(loginSuccess({ user, role })); 

        // Navigate to the appropriate dashboard
        nav(`/${role}/dashboard`);
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.message || 'Échec de la connexion.'));
    }
};


  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex justify-center">
          <img className="w-12 h-12 mr-2" src={logo} alt="logo" />
          <h1 className="text-3xl font-bold text-gray-900">Bienvenue</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Votre email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="exemple@domaine.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500">Se souvenir de moi</label>
              </div>
            </div>
            <a href="#" className="text-sm font-medium text-indigo-600 hover:underline">Mot de passe oublié ?</a>
          </div>
          <button
            type="submit"
            disabled={status === STATUS.LOADING}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {status === STATUS.LOADING ? 'Connexion en cours...' : 'Se connecter'}
          </button>
          {status === STATUS.ERROR && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
        <p className="text-center text-sm text-gray-500">
          Pas encore de compte ? <a href="#" className="text-indigo-600 hover:underline">Créer un compte</a>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
