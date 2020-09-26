import React, { useState, useEffect } from 'react'
import Game from "./Game";
import { getGames } from "../services/apiCalls";
import { Link } from 'react-router-dom';

export default function ListOfGames({ keyword }) {

  const [games, setGames] = useState([])

  useEffect(() => {
    getGames(keyword)
      .then((res) => {
        setGames(res.results)
        localStorage.setItem('games', JSON.stringify(res.results))// esto me esta guartando un string [object][object] O.O!
      })
  }, [keyword])

  const style = {
    textDecoration: 'none',
    color: 'black'
  }

  return (
    <div>
      {
        games &&
        games.map(element =>
          <Link style={style}
            key={element.id}
            to={"/Detail/" + element.slug}>
            <Game name={element.name}/>
          </Link>)
      }
    </div>
  )
}
