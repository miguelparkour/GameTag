import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const CustomAccordion = function ({classes, title, info}) {
    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography className={classes.heading}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{info}</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
export default function GameInfo({game}) {
    const classes = useStyles();
    console.log('Game: ', game);
    return (
        <>
            <CustomAccordion classes={classes} title="Description" info={game.description} />
            <CustomAccordion classes={classes} title="Storyline" info={game.storyline} />
        </>
    );
}
