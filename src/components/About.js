import { makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react'

const useStyles = makeStyles(theme=>({
  divclass:{
    backgroundColor:'white',
    borderRadius: '10px',
    // width:'414px',
    width:'252px',
    marginLeft:'auto',
    marginRight:'auto',
    // display:'inline-block'
  }
}))
const About= ()=>{
  
  console.log('this is About')
const classes = useStyles();

    return (
      <div>
        <h1>About</h1>
        {/* <div className={classes.divclass}> */}

        <Pagination className={classes.divclass} count={10} color="secondary" size="small"/>
        {/* </div> */}
      </div>
    );
  }
  export default About;