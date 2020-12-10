import React from 'react';
import {getGame} from 'services/apiCalls';
import {Divider, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from 'components/Navbar';
import GameInfo from 'components/GameInfo';
import GameRatings from 'components/GameRatings';

// ::::: STYLES :::::
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '50px 0px',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: 'black',
        minHeight: 400,
    },
    container: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: '0 20px',
        margin: '90px auto 20px',
        width: '85%',
    },
    img: {
        width: '100%',
    },
    cover: {
        paddingTop: '0px',
    },
    error404: {
        color: theme.palette.primary.contrastText,
    },
}));

export default function Detail(props) {
    // slug del juego a mostrar
    const id = props.match.params.id;
    // juego a mostrar
    const [game, setGame] = React.useState();
    // estado del spinner de carga
    const [open, setOpen] = React.useState(false);
    // estilos
    const classes = useStyles();

    /*  Debería cargar siempre los datos del juego con el localStorage,
        pero en caso de que este sea borrado, hace una petición a la BD */
    React.useEffect(() => {
        setOpen(true);
        let gamesArr = JSON.parse(localStorage.getItem('games'));
        const game = gamesArr.find((elem) => elem.slug === id);
        console.log(game);
        if (!game) {
            getGame(id).then((result) => {
                setGame(result);
                setOpen(false);
            });
        } else {
            setGame(game);
            setOpen(false);
        }
    }, [id]);

    return (
        <>
            <NavBar />
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {game ? (
                <div className={classes.root} style={{backgroundImage: `url(${game.media.background})`}}>
                    <Grid className={classes.container} container spacing={4}>
                        <Grid className={classes.border} item sm={12}>
                            <Typography variant="h3">{game.name}</Typography>
                        </Grid>
                        <Divider light />
                        <Grid style={{paddingTop: '0px'}} item xs={12} md={3}>
                            <img
                                className={classes.img}
                                src={game.media.cover.replace('thumb', '720p')}
                                alt=""
                            />
                        </Grid>
                        <Grid className={classes.border} container item xs={12} md={9} spacing={4}>
                            <Grid item md={4}>
                                <GameRatings ratings={game.ratings} />
                            </Grid>
                            {game.media.videoFull ? (
                                <Grid className={classes.border} item sm={8}>
                                    <video className={classes.img} controls autoPlay muted loop>
                                        <source src={game.media.videoFull} />
                                    </video>
                                </Grid>
                            ) : (
                                <></>
                            )}
                        </Grid>
                        <Grid item sm={12}>
                            <GameInfo game={game} />
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div className={classes.root}>
                    <Typography variant="h1" className={classes.error404}>
                        GAME NOT FOUND
                    </Typography>
                </div>
            )}
        </>
    );
}
