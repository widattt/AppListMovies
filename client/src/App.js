import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { useEffect, useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './redux/actions';

function App() {

  const dispatch = useDispatch()
  const {name} = useSelector(state => state.user.user)

  useLayoutEffect(() => {
    dispatch(getCurrentUser())
  },[dispatch])

  return (
      <Router>
        <Routes>
          <Route path='/' element={name ? <HomePage /> : <Navigate to="/auth/login" replace={true} />} />
          <Route path='/auth/login' element={name ? <Navigate to="/" /> : <Login />} />
          <Route path='/auth/register' element={name ? <Navigate to="/"/> : <Register />} />
        </Routes>
      </Router>
  )
}

export default App;
