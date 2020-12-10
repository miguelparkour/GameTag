import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomCarousel from 'components/CustomCarousel';
import ChipsContainer from './ChipsContainer';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    color: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTop: '1px solid #555',
    },
    detail: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    item: {
        height: 'max-content',
        minWidth: 100,
        maxWidth: 300,
        margin: 20,
        paddingLeft: 10,
        borderLeft: 'inset',
    },
    chip: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: '1px solid',
        borderColor: theme.palette.primary.contrastText,
        margin: 'auto 2px',
    },
}));

const CustomMediaAccordion = function ({classes, title, info}) {
    if (info) {
        return (
            <div className={classes.root}>
                <Accordion square classes={{root: classes.color}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon htmlColor="white" />}>
                        <Typography variant="button">{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{<CustomCarousel media={info} />}</AccordionDetails>
                </Accordion>
            </div>
        );
    } else {
        return <></>;
    }
};
const CustomAccordion = function ({classes, title, info}) {
    console.log(title, ': ', info);
    if (info) {
        return (
            <div className={classes.root}>
                <Accordion square classes={{root: classes.color}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon htmlColor="white" />}>
                        <Typography variant="button">{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{info}</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    } else {
        return <></>;
    }
};
export default function GameInfo({game}) {
    const classes = useStyles();
    console.log('Game: ', game);
    return (
        <>
            {<CustomAccordion classes={classes} title="Details" info={<ChipsContainer game={game} />} />}
            <CustomAccordion classes={classes} title="Description" info={game.description} />
            <CustomAccordion classes={classes} title="Storyline" info={game.storyline} />
            {<CustomMediaAccordion classes={classes} title="Multimedia" info={game.media} />}
        </>
    );
}
