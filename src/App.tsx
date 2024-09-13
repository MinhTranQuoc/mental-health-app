import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/Home/HomePage';
import LoginForm from './components/Login/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
					<Route index element={<HomePage />} />
				</Route>
        <Route path="/login" element={<LoginForm />}>
				</Route>

      </Routes>
    </Router>
  );
}

export default App;
