import React from 'react';
import {getGame} from 'services/apiCalls';
import {Typography} from '@material-ui/core';
import NavBar from 'components/Navbar';

export default function Detail(props) {
    const id = props.match.params.id;
    const [game, setGame] = React.useState();

    React.useEffect(() => {
        getGame(id).then((result) => {
            setGame(result);
        });
    }, [id]);
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
