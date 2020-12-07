import React from 'react';
import Carousel, {slidesToShowPlugin} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    mobileRoot: {
        [theme.breakpoints.down('md')]: {
            display: 'inline-grid',
        },
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    img: {
        maxHeight: 500,
        width: 'inherit',
    },
}));

export default function CustomCarousel({media}) {
    const classes = useStyles();

    return (
        <>
            {media.images ? (
                <>
                    <Carousel
                        className={classes.root}
                        plugins={[
                            'fastSwipe',
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
                        {media.images.map((item) => {
                            item = item.replace('thumb', '720p');
                            return <img key={item} className={classes.img} src={item} alt="" />;
                        })}
                    </Carousel>
                    <Carousel className={classes.mobileRoot} plugins={['infinite', 'arrows']}>
                        {media.images.map((item) => {
                            item = item.replace('thumb', '720p');
                            return <img key={item} className={classes.img} src={item} alt="" />;
                        })}
                    </Carousel>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
