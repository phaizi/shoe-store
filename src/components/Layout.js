import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import CartIcon from './CartIcon';
import { CartContext } from '../services/context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(/backGroundBlack.jpg)`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  },
  label: {
    width: '20%',
    fontSize: '1.8em',
    lineHeight: `48px`,
    marginLeft: '25px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  tabs: {
    width: '100%',
  }

}));

export default function Layout() {
  const [cartState,] = useContext(CartContext);
  let location = useLocation().pathname;
  location = location.search('/products/') ? location : '/products/';
  location = location.search('/productitem/') ? location : '/products/';
  // to convert all urls starting with '/products/...' to '/products/' so that appbar catches them all
  location = location.slice(-1) === '/' ? location : (location + '/');
  // to make appbar catch urls with trailing '/' or without '/' 
  const classes = useStyles();
  const handleChange = (event, newValue) => {
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.label} >Shoe-Store</Typography>
          <Tabs
            className={classes.tabs}
            variant="fullWidth"
            centered
            value={location}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <Tab className={classes.tabs} component={Link} value='/' to='/' label="Home" />
            <Tab className={classes.tabs} component={Link} value='/products/' to='products/' label="Products" />
            <Tab className={classes.tabs} component={Link} value='/about/' to='about/' label="About" />
            <Tab className={classes.tabs} icon={<CartIcon quantity={cartState.total} />} component={Link} value="/cart/" to="cart/" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}