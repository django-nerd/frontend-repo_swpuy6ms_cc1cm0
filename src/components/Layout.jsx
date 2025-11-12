import { Link, Outlet, useLocation } from 'react-router-dom'

function NavLink({ to, children }) {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link to={to} className={`px-3 py-2 rounded-md text-sm font-medium ${active ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
      {children}
    </Link>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png" alt="AWS" className="h-7 w-auto"/>
            <div className="h-6 w-px bg-gray-300"/>
            <span className="font-semibold text-gray-800 hidden sm:block">AWS Cloud Club • Silver Oak University</span>
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/agenda">Agenda</NavLink>
            <NavLink to="/register">Register</NavLink>
            <a href="/register" className="ml-2 rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800">Get Tickets</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="py-10 border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">© 2025 AWS Cloud Club • Silver Oak University. Community-led event.</div>
          <Link to="/register" className="rounded-full bg-amber-500 text-white px-4 py-2 text-sm font-medium hover:bg-amber-600">Register</Link>
        </div>
      </footer>
    </div>
  )
}
