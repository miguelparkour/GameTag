import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Progress from 'react-circle-progress-bar';

// ::::: STYLES :::::
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap-reverse',
        justifyContent: 'space-evenly',
    },
    wrapper: {},
    item: {
        padding: 7,
    },
}));

export default function GameRatings({ratings}) {
    const [num, setNum] = React.useState(0);
    const classes = useStyles();

    // ::::: USE EFFECT :::::
    /*  Se calcula el rating global (num), y se pinta
            Se pinta con un delay de 1 segundo para que le de tiempo
            a la página a cargarse antes de empezar con la animación
            del componente Progress */
    React.useEffect(() => {
        const timer = setTimeout(() => {
            let cont = 0;
            let val = 0;
            if (ratings && ratings.length) {
                ratings.forEach((elem) => {
                    val += elem.value;
                    cont += 1;
                });
                setNum(val / cont);
            } else {
                setNum(0);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [num, ratings]);

    return (
        <>
            {ratings ? (
                <div className={classes.root}>
                    <Progress
                        progress={num}
                        strokeWidth={15}
                        reduction={0}
                        subtitle={'GLOBAL'}
                        transitionDuration={5}
                        gradient={[{stop: 0, color: 'green'}]}
                    />
                    <div className={classes.root}>
                        {ratings.map((elem) => (
                            <div key={elem.name} className={classes.item}>
                                <Typography variant="body1">{elem.name + ': '}</Typography>
                                <Rating value={elem.value * 0.05} size="small" readOnly />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
