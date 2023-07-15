import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { fetchCars } from './redux/slices/carSlice';
import LoginPage from './pages/LoginPage';
// import Error from './pages/Error';
import ProtectedRoute from './pages/ProtectedRoute';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Vehicles from './pages/Vehicles';
import ReserveForm from './pages/ReserveForm';
import Reservations from './pages/Reservations';
import AddVehicle from './pages/AddVehicle';
import RemoveVehicle from './pages/RemoveVehicle';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <ProtectedRoute>
                <Vehicles />
              </ProtectedRoute>
            )}
          />
          <Route path="/reseve-form" element={<ReserveForm />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/remove-vehicle" element={<RemoveVehicle />} />
          <Route path="/register" element={<LoginPage />} />
          {/* <Route path="/*" element={<Error />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
