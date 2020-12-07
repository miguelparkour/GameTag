import React from 'react';
import {getGame} from 'services/apiCalls';
import {Divider, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import NavBar from 'components/Navbar';
import CustomCarousel from 'components/CustomCarousel';
import GameInfo from 'components/GameInfo';
import GameRatings from 'components/GameRatings';
//import data from 'data';

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
        margin: '100px auto 20px',
        width: '85%',
    },
    img: {
        width: '100%',
    },
    cover: {
        paddingTop: '0px',
    },
    border: {
        // border: '1px white solid',
    },
}));

export default function Detail(props) {
    const id = props.match.params.id;
    const [game, setGame] = React.useState();
    const classes = useStyles();

    React.useEffect(() => {
        let gamesArr = JSON.parse(localStorage.getItem('games'));
        const game = gamesArr.find((elem) => elem.slug === id);
        if (!game) {
            getGame(id).then((result) => {
                setGame(result);
            });
        } else {
            setGame(game);
        }
    }, [id]);

    return (
        <>
            <NavBar />
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
                        <Grid item md={12}>
                            {
                                //<CustomCarousel media={game.media} />
                            }
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div className={classes.root}>
                    <h1>GAME NOT FOUND</h1>
                </div>
            )}
        </>
    );
}
