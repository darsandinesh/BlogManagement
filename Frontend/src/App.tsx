import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Otp from './components/auth/Otp'
import Register from './components/auth/Register'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import Home from './pages/Home'
import AddblogPage from './pages/AddblogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ProfilePage from './pages/ProfilePage'
import EditBlogPage from './pages/EditBlogPage'
import EmailVerification from './components/auth/EmailVerification'
import ForgotPassword from './components/auth/ForgotPassword'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        // public routes
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/email/:id' element={<EmailVerification />} />
          <Route path='/reset-password/:id' element={<ForgotPassword />} />
        </Route>

          // private rotues
        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/addblog' element={<AddblogPage />} />
          <Route path='/blogDetail' element={<BlogDetailPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/editBlog' element={<EditBlogPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

