import React from 'react'
import ListOfGames from 'components/ListOfGames'
import NavBar from 'components/NavBar'

export default function Search(props) {
    const search = props.match.params.search
    
    return (
        <div>
            <NavBar/>
            <ListOfGames keyword={search}/>
        </div>
    )
}
