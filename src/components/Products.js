import React, { useContext } from 'react'
import { ProductsContext, CartContext } from '../services/context';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';
import { Grow } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '374.5px',
    minHeight: '374.5px',
    minWidth: '300px',
    maxWidth: '22%',
    margin: '20px',
    flex: '23%',
    transition: 'box-shadow 0.5s ease-out',

    '&:hover': {
      // maxWidth: '366px',
      // maxHeight: '400px',
      // margin: '0px',
      boxShadow: '0px 0px 10px 5px #108393',

      // [theme.breakpoints.down(1415)]: {
      //   maxWidth: '340px',
      //   maxHeight: '400px',
      //   margin: '13px',
      //   marginDown: '0',
      //   marginTop: '0',
      // },

      // [theme.breakpoints.down(1077)]: {
      //   maxWidth: '340px',
      //   maxHeight: '400px',
      //   margin: '20px',
      //   marginDown: '0px',
      //   marginTop: '0px',
      // },
    }
  },

  container: {
    padding: '24px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },

  media: {
    height: 140,
  },
  buttonSec: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  card: {
    transition: 'background-color 1s',

    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    },
  },

  cartCount: {
    marginLeft: '0px',
    borderRadius: '50%',
    height: '50px',
    textAlign: 'center',
    lineHeight: '50px', float: 'right', width: '50px',
    backgroundColor: 'orange',
    color: 'white',
    fontSize: '30px'
  },

}));

export default function Products() {
  const [products] = useContext(ProductsContext);
  const [cartState, cartDispatch] = useContext(CartContext);
  const classes = useStyles();
  let location = useLocation().search;
  location = location.slice(-1) === '/' ? location : (location + '/');
  const pageNo = parseInt(location?.slice(-2)) || 1;

  return (
    <div className={classes.container}>
      {products.slice(20 * (pageNo - 1), 20 * (pageNo)).map((product) => {
        return (
          <Card key={product.id} className={classes.root} style={cartState[product.id] ? { boxShadow: '0px 0px 10px 5px orange' } : {}}>
            <CardActionArea className={classes.card} component={Link} to={{ pathname: `/products/${product.id}/` }}>
              <CardMedia
                className={classes.media}
                image={product.media.smallImageUrl}
                title={product.title}
              />
              <CardContent
                style={{ height: '150px' }}
              >
                <Typography gutterBottom variant="h5" component="h2" style={{ minHeight: '100px', }}>
                  {product.title}
                </Typography>
                <Grow {...{ timeout: 1000 }} in={!!cartState[product.id]}>
                  <span className={classes.cartCount}>
                    {cartState[product.id]?.quantity}
                  </span>
                </Grow>
                <Typography variant="body2" color="textSecondary" component="p">
                  Gender: {product.gender}
                </Typography>
                <Typography variant="h6" color="textPrimary" component="p">
                  Price: {product.retailPrice || 'N/A'}
                </Typography>
              </CardContent>

              <CardActions className={classes.buttonSec} >
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    cartDispatch({ type: 'add', item: product });
                  }}
                  variant="contained" color="secondary">
                  Add To Cart
                </Button>
                <div>
                  <Button disabled={!cartState[product.id] || false} onClick={(e) => {
                    e.preventDefault();
                    cartDispatch({ type: 'remove', item: product });
                  }}
                    variant="contained" color="secondary" style={{ margin: 3 }}>
                    <RemoveIcon />
                  </Button>
                  <Button disabled={!cartState[product.id] || false}
                    onClick={(e) => {
                      e.preventDefault();
                      cartDispatch({ type: 'clear', item: product });
                    }}
                    variant="contained" color="secondary" style={{ margin: 3 }}>
                    <ClearIcon />
                  </Button>
                </div>
              </CardActions>
            </CardActionArea>
          </Card>
        )
      })}
    </div>
  )
}