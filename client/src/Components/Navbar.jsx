import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/authSlice";
import logo from "../assets/logo.svg";

const Navbar = () => {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = React.useState(false)

    const logoutUser = () =>{
        if (isLoggingOut) {
            return
        }

        setIsLoggingOut(true)
        window.setTimeout(() => {
            dispatch(logout())
            navigate('/', { replace: true })
        }, 450)
    }

    return (
        <div className='shadow bg-white'>
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 
            text-slate-800 transition-all'>
                <Link to='/'>
                    <img src={logo} alt="logo" className="h-11 w-auto" />                
                </Link>
                <div className="flex items-center gap-4 text-sm">
                    <p className="max-sm:hidden">Hi, {user?.name}</p>
                    <button
                        onClick={logoutUser}
                        disabled={isLoggingOut}
                        className='group relative overflow-hidden rounded-full border border-gray-300 bg-white px-7 py-1.5 transition-all hover:bg-slate-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70'
                    >
                        <span className={`inline-flex items-center gap-2 transition-all duration-300 ${isLoggingOut ? 'scale-95 opacity-0' : 'opacity-100'}`}>
                            Logout
                        </span>
                        <span className={`pointer-events-none absolute inset-0 flex items-center justify-center gap-2 bg-slate-50 transition-all duration-300 ${isLoggingOut ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                            <span className='h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent' />
                            Leaving
                        </span>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar