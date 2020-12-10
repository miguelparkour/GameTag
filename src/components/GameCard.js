import React from 'react';
import Color from 'color';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {useFourThreeCardMediaStyles} from '@mui-treasury/styles/cardMedia/fourThree';
import {useHistory} from 'react-router-dom';
const useGridStyles = makeStyles(() => ({
    root: {
        width: '90%',
        margin: 'auto',
        justifyContent: 'center',
    },
}));

const useStyles = makeStyles((theme) => ({
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
    card: {
        width: 256,
        borderRadius: 16,
        borderColor: theme.palette.primary.main,
        borderStyle: 'groove',
        borderWidth: 5,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 ${Color(theme.palette.primary.main).rotate(-12).darken(0.2).fade(0.5)}`,
        },
    },
    content: {
        backgroundColor: theme.palette.primary.main,
        padding: '1rem 1.5rem 1.5rem',
        minHeight: 125,
    },
    title: {
        fontFamily: '-webkit-pictograph',
        fontSize: '1.5rem',
        color: theme.palette.primary.contrastText,
    },
    subtitle: {
        fontFamily: 'Montserrat',
        color: theme.palette.primary.contrastText,
        opacity: 0.87,
        marginTop: '2rem',
        fontWeight: 500,
        fontSize: 14,
    },
}));

const CustomCard = ({classes, game}) => {
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
                        autoPlay
                    />
                ) : (
                    <CardMedia
                        className={classes.media}
                        classes={mediaStyles}
                        image={game.media.cover.replace('thumb', 'cover_big')}
                    />
                )}
                <CardContent className={classes.content}>
                    <Typography className={classes.title} variant={'h1'}>
                        {game.name}
                    </Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    );
};

export default function GameCard({games}) {
    const gridClasses = useGridStyles();
    const classes = useStyles();

    return (
        <>
            <Grid classes={gridClasses} container spacing={3}>
                {games ? (
                    games.map((elem) => {
                        if (!elem.media.background && elem.media.images && elem.media.images.length > 0) {
                            elem.media.background = elem.media.images[0].replace('thumb', '720p');
                        } else if (!elem.media.cover && !elem.media.background) {
                            elem.media.background =
                                'https://media-exp1.licdn.com/dms/image/C5603AQGAb6UHgbcfJA/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=WmdMK4rKdU4weRCPi-kzRqFYtlaBdhTpwxCCy5FBrcc';
                        }
                        return (
                            <Grid item key={elem.slug}>
                                <CustomCard classes={classes} title={elem.name} game={elem} />
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
