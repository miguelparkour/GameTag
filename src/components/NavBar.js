import React from 'react'
import { Link } from 'react-router-dom'
import Searchbar from 'components/searchBar/Searchbar';

export default function NavBar() {
    return (
        <>
            <nav className='row navbar navbar-light bg-light'>
                <div className='col-1'>

                    <Link to='/Home' className="navbar-brand">Navbar</Link>
                </div>
                <div className='col-11'>

                    <Searchbar />
                </div>
            </nav>
        </>
    )
}
