import React from 'react'
import NavBar from '../components/NavBar'
import Searchbar from 'components/searchBar/Searchbar'

export default function AddGame() {


    return (
        <>
            <NavBar />
            <h1>Añadir juego</h1>
            <div className='row'>
                <div className='col-4'>
                    <Searchbar/>
                </div>
                <div className='col-8'></div>
            </div>





        </>
    )
}
