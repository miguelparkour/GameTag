import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Progress from 'react-circle-progress-bar';

const useStyles = makeStyles(({theme}) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap-reverse',
        justifyContent: 'space-evenly',
    },
}));

export default function GameRatings({ratings}) {
    const [num, setNum] = React.useState(0);
    const classes = useStyles();
    React.useEffect(() => {
        return () => {
            console.log('useeffect');
        };
    }, []);
    return (
        <>
            {ratings ? (
                <div className={classes.root}>
                    <Progress
                        progress={num}
                        strokeWidth={15}
                        reduction={0}
                        subtitle="GLOBAL"
                        transitionDuration={1}
                        gradient={[{stop: 0, color: 'green'}]}
                    />
                    <div className={classes.root}>
                        {ratings.map((elem) => (
                            <div key={elem.name}>
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
