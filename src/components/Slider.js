import { Button, makeStyles, useMediaQuery } from '@material-ui/core';
import React, { useState } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(theme => ({
    outerDiv: {
        display: 'flex',
        justifyContent: 'center',

    },

    sliderDiv: {
        position: 'absolute',
        width: 1130,
        transition:'left 1s',
    },

    cards: {
        position: 'relative',
        overflow: 'hidden',
        width: 900,
        height: 250,
        [theme.breakpoints.down('1135')]: {
            width: 680,
        },
        [theme.breakpoints.down('915')]: {
            width: 440,
        },
    },
}))

export default function Slider({ children }) {

    function slideLeft(leftMargin, width) {
        if (width >= 1135) {
            width = 1135;
        } else if (width >= 915) {
            width = 915;
        } else {
            width = 695;
        }
        if ((-leftMargin) + width <= 1135) {
            setMargin((state) => state - 220);
            console.log('SLIDER leftmargin = ', leftMargin)
        } 
    }

    function slideRight(leftMargin) {
        console.log('SLIDER leftMargin = ', leftMargin)
       if (leftMargin !==0){
           setMargin((state)=> state + 220);
       }
    }

    const classes = useStyles();
    const [leftMargin, setMargin] = useState(0);
    const cards3 = useMediaQuery('(min-width:915px)');
    const cards4 = useMediaQuery('(min-width:1135px)');

    if (cards4) {
        if ((-leftMargin) + 1135 > 1355) {
            setMargin(-220);
        }
    } 
    else if (cards3) {
        if ((-leftMargin) + 915 > 1355) {
            setMargin(-440);
        }
    }

    return (
        <div className={classes.outerDiv}>

            <Button onClick={() => { slideRight(leftMargin) }}><ChevronLeftIcon fontSize='large' /></Button>
            <div className={classes.cards}>
                <div className={classes.sliderDiv} style={{ left: leftMargin }}>
                    {children}
                </div>
            </div>
            <Button onClick={() => { slideLeft(leftMargin, window.innerWidth) }}><ChevronRightIcon fontSize='large' /></Button>
        </div>
    )
}