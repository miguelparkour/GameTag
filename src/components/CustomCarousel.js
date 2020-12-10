import React from 'react';
import Carousel, {slidesToShowPlugin} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import {makeStyles} from '@material-ui/core/styles';

// ::::: STYLES :::::
const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',
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
        minHeight: 150,
        width: 'inherit',
    },
}));

export default function CustomCarousel({media}) {
    const classes = useStyles();

    /*  state para cambiar un estilo del componente Carousel */
    React.useEffect(() => {
        const carr = document.querySelector('.BrainhubCarousel__container');
        if (carr) carr.style.width = 'auto';
    }, []);

    return (
        <>
            {media.images ? (
                <>
                    <Carousel
                        className={classes.root}
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
                        {media.images.map((item) => {
                            item = item.replace('thumb', '720p');
                            return <img key={item} className={classes.img} src={item} alt="" />;
                        })}
                    </Carousel>
                    <Carousel
                        draggable="false"
                        className={classes.mobileRoot}
                        plugins={[
                            'infinite',
                            'arrows',
                            {
                                resolve: slidesToShowPlugin,
                                options: {
                                    numberOfSlides: 1,
                                },
                            },
                        ]}
                    >
                        {media.images.map((item, index) => {
                            item = item.replace('thumb', '720p');
                            return (
                                <img
                                    key={item}
                                    className={classes.img}
                                    src={item}
                                    alt={`screenshot${index}`}
                                />
                            );
                        })}
                    </Carousel>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
