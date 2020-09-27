import React from 'react';
import {getGame} from 'services/apiCalls';
import {Typography} from '@material-ui/core';
import NavBar from 'components/Navbar';

export default function Detail(props) {
    const name = props.match.params.name;
    const [game, setGame] = React.useState();

    React.useEffect(() => {
        getGame(name).then((result) => {
            setGame(result);
        });
    }, [name]);
    return (
        <>
            <NavBar />
            {game && (
                <div>
                    <Typography>Nombre: {game.title}</Typography>
                    <Typography>Publicado por {game.publisher}</Typography>
                    <Typography>Año de lanzamiento: {game.released}</Typography>
                </div>
            )}
        </>
    );
}
