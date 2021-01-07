import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link, Outlet, useLocation } from 'react-router-dom';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Toolbar from '@material-ui/core/Toolbar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `nav-tab-${index}`,
//     'aria-controls': `nav-tabpanel-${index}`,
//   };
// }

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
    tabs:{
        width:'100%'
    }

}));

export default function Layout() {
    const location = useLocation();
  const classes = useStyles();
  const [value, setValue] = React.useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
          <Toolbar>

          <Typography className={classes.label} >Shoe-Store</Typography>
        <Tabs 
        className={classes.tabs}
          variant="fullWidth"
          value={value}
        centered
        // value={location.pathname}
        onChange={handleChange}
        aria-label="nav tabs example"
        >
          <Tab className={classes.tabs} component={Link} value='/' to='/' label="Home"   />
          <Tab className={classes.tabs} component={Link} value='/products' to='/products' label="Products"   />
          <Tab className={classes.tabs} component={Link} value='/about' to='/about' label="About"   />
          <Tab className={classes.tabs} icon={<ShoppingCart/> } component={Link} value="/cart" to="/cart" />
        </Tabs>
            </Toolbar>
      </AppBar>
      <TabPanel value={value} index={'/'}>
          <Outlet/>
       
      </TabPanel>
      <TabPanel value={value} index={'/products'}>
          <Outlet/>
        
      </TabPanel>
      <TabPanel value={value} index={'/about'}>
          <Outlet/>

          </TabPanel>
      <TabPanel value={location.pathname} index={'/cart'}>
          <Outlet/>
        
      </TabPanel>
    </div>
  );
}

