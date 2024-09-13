import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/Home/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
					<Route index element={<HomePage />} />
				</Route>
      </Routes>
    </Router>
  );
}

export default App;
