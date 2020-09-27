import React from 'react';
import {getGameBySlug} from 'services/apiCalls';

export default function Detail(props) {
    const slug = props.match.params.slug;
    const [game, setGame] = React.useState();
    React.useEffect(() => {
        getGameBySlug(slug).then((res) => {
            setGame(res);
        });
    }, [slug]);

    const style = {
        margin: 'auto',
        background: game ? game.dominant_color : 'white',
    };

    return (
        <div>
            {game && (
                <div className="card text-center" style={style}>
                    <img
                        className="card-img-top"
                        src={game.background_image ? game.background_image : 'none'}
                        alt="portada del juego"
                    />
                    <div className="card-header">
                        <h1>{game.name}</h1>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{game.name}</h5>
                        <p className="card-text">
                            Desarrollado por: {game.developers ? game.developers[0].name : 'desconocido'}
                        </p>
                        <p className="card-text">
                            Fecha de lanzamiento: {game.released ? game.released : 'desconocido'}
                        </p>
                    </div>
                    <div className="card-footer text-muted">
                        <small>{game.id}</small>
                    </div>
                </div>
            )}
        </div>
    );
}
