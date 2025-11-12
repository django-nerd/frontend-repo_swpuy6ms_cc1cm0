import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Agenda from './pages/Agenda'
import Register from './pages/Register'

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
