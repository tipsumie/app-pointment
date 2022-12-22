import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// Components
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
//User
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import AddClinic from './pages/AddClinic';
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
//Admin
import ClinicList from './pages/admin/ClinicList';
import UserList from './pages/admin/UserList';
//Clinic
import UpdateProfile from './pages/clinic/UpdateProfile';
import ClinicAppointments from './pages/clinic/ClinicAppointments';

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/add-clinic'
          element={
            <ProtectedRoute>
              <AddClinic />
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin/clinics'
          element={
            <ProtectedRoute>
              <ClinicList />
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin/users'
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route
          path='/notification'
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path='/clinic/profile/:userId'
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/book-appointment/:clinicId'
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />

        <Route
          path='/appointments'
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path='/clinic/appointments'
          element={
            <ProtectedRoute>
              <ClinicAppointments />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
