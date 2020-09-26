import React from 'react'
import './Game.css'

export default function Game({name}) {
    return (
        <div className='game'>
            <h4>{name}</h4>
        </div>
    )
}
