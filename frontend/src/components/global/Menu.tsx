import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RootStore } from '../../utils/TypeScript'
import { logout } from '../../redux/actions/authAction'

const Menu = () => {

    const { auth } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()

    const bfLoginLinks = [
        { label: 'Login', path: '/login' },
        { label: 'Register', path: '/register' }
    ]

    const afLoginLinks = [
        { label: 'Home', path: '/' },
        { label: 'CreateBlog', path: '/create_blog' }
    ]

    const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks

    const { pathname } = useLocation()

    const isActive = (pn: string) => {
        if (pn === pathname) return 'active';
    }

    return (
        <ul className='navbar-nav ms-auto'>
            {
                navLinks.map((link, index) => {
                    return (
                        <li key={index} className={`nav-item ${isActive(link.path)}`}>
                            <Link className='nav-link' to={link.path}>{link.label}</Link>
                        </li>
                    )
                })
            }

            {
                auth.user &&
                <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={auth.user.avatar} alt='avatar' className='avatar' />
                    </span>

                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <Link className="dropdown-item" to='/profile'>
                                Profile
                            </Link>
                        </li>

                        <li><hr className="dropdown-divider" /></li>

                        <li>
                            <Link className="dropdown-item" to="/"
                                onClick={() => dispatch<any>(logout())}>
                                Logout
                            </Link>
                        </li>

                    </ul>
                </li>
            }

        </ul>
    )
}

export default Menu