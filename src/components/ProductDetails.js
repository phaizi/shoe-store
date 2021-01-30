import { Button, Grid, Grow, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext, ProductsContext } from '../services/context';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  entry: {
    border: 'solid #e0e0e0 1px',
    borderBottom: 'none',
  },
  label: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    padding: '5px 20px',
    margin: '0px 0px 25px',
  },
  cartCount: {
    marginLeft: '0px',
    borderRadius: '50%',
    height: '50px',
    textAlign: 'center',
    lineHeight: '50px',
    float: 'right',
    width: '50px',
    backgroundColor: 'orange',
    color: 'white',
    fontSize: '30px'
  },
  buttonSec: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

}));

export default function ProductsDetails(props) {
  const [products] = useContext(ProductsContext);
  const [cartState, cartDispatch] = useContext(CartContext);
  const classes = useStyles();
  const { productID } = useParams()
  const [product] = products.filter((shoe) => (productID === shoe.id))
  const details = ['brand', 'gender', 'releaseDate', 'retailPrice', 'colorway'];
  let detailsObj = {};
  detailsObj = product ? Object.keys(product).reduce(function (filtered, option) {
    if (details.includes(option)) {
      filtered[option.replace(option[0], option[0].toUpperCase())] = product[option];
    }
    return filtered;
  }, detailsObj) : {};

  return (
    <div style={{ marginTop: 40, }}>
      <Grid container justify="space-around">

        <Grid item style={{ marginBottom: 40, }} xs={11} md={6} >
          <Paper style={{ height: '100%' }}>
            <img src={product?.media.imageUrl} style={{ width: '100%', }} alt="product" />
          </Paper>
        </Grid>

        <Grid item style={{ marginBottom: 40, }} xs={11} md={5}>
          <Paper style={{ height: '100%', marginBottom: 40 }}>
            <Typography className={classes.label} variant='h4' >{product?.title}</Typography>
            {Object.keys(detailsObj).map((key) => (
              <Grid container className={classes.root} justify="space-around" key={key}>
                <Grid item xs={5} >
                  <span>
                    <Typography className={classes.entry} variant={'h5'}>{key}</Typography>
                  </span>
                </ Grid>
                <Grid item xs={5}>
                  <span>
                    <Typography className={classes.entry} variant={'h6'}>{detailsObj[key]}</Typography>
                  </span>
                </Grid>
              </Grid>
            ))}

            <Grid item style={{ margin: '50px 0px 0px 10px', }} xs={11} >
              <Grow {...{ timeout: 1000 }} in={!!cartState[product?.id]}>
                <span className={classes.cartCount}>
                  {cartState[productID]?.quantity || 0}
                </span>
              </Grow>
              <div className={classes.buttonSec} >
                <Button
                  onClick={() => { cartDispatch({ type: 'add', item: product }) }}
                  variant="contained" color="secondary">
                  Add To Cart
                </Button>

                <div style={{ margin: 3 }}>
                  <Button disabled={!cartState[productID] || false} onClick={() => { cartDispatch({ type: 'remove', item: product }) }}
                    variant="contained" color="secondary" style={{ margin: 3 }}>
                    <RemoveIcon />
                  </Button>
                  <Button disabled={!cartState[productID] || false} onClick={() => { cartDispatch({ type: 'clear', item: product }) }}
                    variant="contained" color="secondary" style={{ margin: 3 }}>
                    <ClearIcon />
                  </Button>
                </div>
              </div>
            </Grid>
          </Paper>
        </Grid >

      </Grid >
    </div >
  );
}
