import React from 'react';
import Color from 'color';
import GoogleFont from 'react-google-font-loader';
import {makeStyles} from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {useFourThreeCardMediaStyles} from '@mui-treasury/styles/cardMedia/fourThree';
import {useHistory} from 'react-router-dom';

const useGridStyles = makeStyles(({breakpoints}) => ({
    root: {
        /*[breakpoints.up('md')]: {
      justifyContent: 'center',
    },*/
        width: '90%',
        margin: 'auto',
        justifyContent: 'center',
    },
}));

const useStyles = makeStyles(() => ({
    media: {
        padding: 70,
    },
    actionArea: {
        borderRadius: 16,
        transition: '0.5s',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    card: ({color}) => ({
        width: 256,
        borderRadius: 16,
        border: '5px groove #150826',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 ${Color(color).rotate(-12).darken(0.2).fade(0.5)}`,
        },
    }),
    content: ({color}) => {
        return {
            backgroundColor: color,
            padding: '1rem 1.5rem 1.5rem',
        };
    },
    title: {
        fontFamily: '-webkit-pictograph',
        fontSize: '1.5rem',
        color: '#fff',
    },
    subtitle: {
        fontFamily: 'Montserrat',
        color: '#fff',
        opacity: 0.87,
        marginTop: '2rem',
        fontWeight: 500,
        fontSize: 14,
    },
}));

const CustomCard = ({classes, image, title, subtitle, game}) => {
    const mediaStyles = useFourThreeCardMediaStyles();
    const history = useHistory();
    const [inHover, setHover] = React.useState(false);

    const handleClick = function () {
        const path = '/Detail/' + game.slug;
        history.push(path);
    };
    return (
        <CardActionArea className={classes.actionArea} onClick={handleClick}>
            <Card
                className={classes.card}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {inHover && game.media.video640 ? (
                    <CardMedia
                        poster={game.media.videoPreview}
                        component="video"
                        src={game.media.video640}
                        loop
                        muted
                        preload="auto"
                        //controls
                        controlsList="nofullscreen"
                        autoPlay
                    />
                ) : (
                    <CardMedia className={classes.media} classes={mediaStyles} image={image} />
                )}
                <CardContent className={classes.content}>
                    <Typography className={classes.title} variant={'h1'}>
                        {game.name}
                    </Typography>
                    <Typography className={classes.subtitle}>{subtitle}</Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    );
};

export default function GameCard({games}) {
    const gridStyles = useGridStyles();
    const styles = useStyles({color: '#150826'});

    return (
        <>
            <Grid classes={gridStyles} container spacing={3}>
                {games ? (
                    games.map((elem) => {
                        if (!elem.media.background && elem.media.cover) {
                            elem.media.background = elem.media.cover.replace('thumb', '720p');
                        } else if (!elem.media.cover && !elem.media.background) {
                            elem.media.background =
                                'https://media-exp1.licdn.com/dms/image/C5603AQGAb6UHgbcfJA/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=WmdMK4rKdU4weRCPi-kzRqFYtlaBdhTpwxCCy5FBrcc';
                        }
                        return (
                            <Grid item key={elem.slug}>
                                <CustomCard
                                    classes={styles}
                                    title={elem.name}
                                    subtitle={'Be a Legend!'}
                                    image={elem.media.background}
                                    game={elem}
                                />
                            </Grid>
                        );
                    })
                ) : (
                    <p>none games</p>
                )}
            </Grid>
        </>
    );
}
