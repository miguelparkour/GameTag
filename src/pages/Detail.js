import React from 'react';
import {getGame} from 'services/apiCalls';
import {Divider, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Carousel, {slidesToShowPlugin} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import NavBar from 'components/Navbar';
//import data from 'data';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '50px 0px',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundColor: 'black',
    },
    container: {
        background: 'linear-gradient(#150826,#153033)',
        color: 'white',
        padding: '0 20px',
        margin: '100px auto 20px',
        width: '85%',
        minWidth: 300,
    },
    img: {
        width: '100%',
    },
    border: {
        // border: '1px white solid',
    },
    carousel: {},
}));

export default function Detail(props) {
    const id = props.match.params.id;
    const [game, setGame] = React.useState();
    const classes = useStyles();

    React.useEffect(() => {
        getGame(id).then((result) => {
            setGame(result);
            console.log(result);
        });
    }, [id]);

    const printPlatforms = (platforms = []) => {
        let result = '';
        console.log(platforms);
        platforms.forEach((elem) => (result += elem + ' - '));
        result = result.substr(0, result.length - 2);
        return result;
    };
    const setInfo = (list, title) => {
        let result = '';
        list.forEach((elem) => (result += elem + ', '));
        result = result.substr(0, result.length - 2);
        return (
            <>
                <p>
                    <Typography variant="body1">{title}</Typography>
                    <Typography variant="caption">{result}</Typography>
                </p>
            </>
        );
    };
    const setDescription = (game) => {
        console.log('game', game);
        let result;
        if (game.storyline) {
            result = (
                <>
                    <p>
                        <Typography variant="body1">Descripción:</Typography>
                        <Typography variant="caption">{game.storyline}</Typography>
                    </p>
                </>
            );
        } else if (game.description) {
            result = (
                <>
                    <p>
                        <Typography variant="body1">Descripción:</Typography>
                        <Typography variant="caption">{result}</Typography>
                    </p>
                </>
            );
        } else {
            result = <></>;
        }
        return result;
    };
    return (
        <>
            <NavBar />
            {game && (
                <div className={classes.root} style={{backgroundImage: `url(${game.media.background})`}}>
                    <Grid className={classes.container} container spacing={4}>
                        <Grid className={classes.border} item sm={12}>
                            <Typography variant="subtitle1">{printPlatforms(game.platforms)}</Typography>
                        </Grid>
                        <Divider light />
                        <Grid className={classes.border} item sm={3}>
                            <img
                                className={classes.img}
                                src={game.media.cover.replace('thumb', '720p')}
                                alt=""
                            />
                        </Grid>
                        <Grid className={classes.border} container item sm={9}>
                            <Grid className={classes.border} item sm={12}>
                                <Typography variant="h3">{game.name}</Typography>
                            </Grid>
                            <Grid className={classes.border} item sm={6}>
                                {game.release ? <>Año de lanzamiento: {game.release.year} </> : <></>}
                                {game.game_engines ? setInfo(game.game_engines, 'Motor de juego:') : ''}
                                {game.player_perspectives
                                    ? setInfo(game.player_perspectives, 'Perspectivas del jugador:')
                                    : ''}
                                {game.involved_companies
                                    ? setInfo(game.involved_companies, 'Compañias involucradas')
                                    : ''}
                            </Grid>
                            {game.media.videoFull ? (
                                <Grid className={classes.border} item sm={6}>
                                    <video className={classes.img} controls autoPlay muted loop>
                                        <source src={game.media.videoFull} />
                                    </video>
                                </Grid>
                            ) : (
                                <></>
                            )}
                        </Grid>
                        <Grid item sm={12}>
                            {setDescription(game)}
                        </Grid>

                        {/* Tengo que conseguir que este grid no se displaye en moviles */}
                        <Grid item md={12}>
                            <Carousel
                                className={classes.carousel}
                                plugins={[
                                    'infinite',
                                    'arrows',
                                    {
                                        resolve: slidesToShowPlugin,
                                        options: {
                                            numberOfSlides: 2,
                                        },
                                    },
                                ]}
                            >
                                {game.media.images.map((item) => {
                                    item = item.replace('thumb', '720p');
                                    return <img key={item} height="275" src={item} alt="" />;
                                })}
                            </Carousel>
                        </Grid>
                    </Grid>
                </div>
            )}
        </>
    );
}
