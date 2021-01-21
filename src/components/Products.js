import React, { memo, useContext } from 'react'
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
// import Pagination from '@material-ui/lab/Pagination';
import { Link, useParams } from 'react-router-dom';
// import { PaginationItem } from '@material-ui/lab';
// import PaginationLink from './PagintaionLink';
// import { PagesOutlined } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '374.5px',
    minHeight: '374.5px',
    minWidth: '300px',
    maxWidth: '22%',
    margin: '20px',
    flex: '23%',
    transition: 'box-shadow 0.5s, max-width 0.5s ease-out',

    '&:hover': {
      maxWidth: '366px',
      maxHeight: '400px',
      margin: '0px',
      boxShadow: '0px 0px 10px 5px #108393',

      [theme.breakpoints.down(1415)]: {
        maxWidth: '340px',
        maxHeight: '400px',
        margin: '13px',
        marginDown: '0',
        marginTop: '0',
      },

      [theme.breakpoints.down(1077)]: {
        maxWidth: '340px',
        maxHeight: '400px',
        margin: '20px',
        marginDown: '0px',
        marginTop: '0px',
      },
    }
  },

  container: {
    padding:'24px',
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

  // paginationAlign: {
  //   backgroundColor: 'white',
  //   borderRadius: '10px',
  //   width: '414px',
  //   marginLeft: 'auto',
  //   marginRight: 'auto',
  //   marginTop: '40px',
  //   marginBottom: '40px',

  //   [theme.breakpoints.down(424)]: {
  //     width: '252px',
  //   }
  // }

}));

const Products = memo((props) => {
  const [products] = useContext(ProductsContext);
  const [cartState, cartDispatch] = useContext(CartContext);
  const classes = useStyles();
  console.log('Products = ', products)
  console.log('this is Products')

  const params = useParams();
  const pageNo = parseInt(params?.pages?.slice(-1))||1;
  console.log('this is pageNo = ', pageNo);
  console.log('this is product = ', products.slice(20*(pageNo-1),20*(pageNo)))

  return (
    <div className={classes.container}>
      {products.slice(20*(pageNo-1),20*(pageNo)).map((product) => {
        return (
          <Card key={product.id} className={classes.root} style={cartState[product.id] ? { boxShadow: '0px 0px 10px 5px orange' } : {}}>
            <CardActionArea className={classes.card} component={Link} to={{  pathname: product.id, state: {
            hello: "Hello World"  }}}>
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
                    // e.stopPropagation();
                    cartDispatch({ type: 'add', item: product });
                  }}
                  variant="contained" color="secondary">
                  Add To Cart
                </Button>
                <div>
                  <Button disabled={!cartState[product.id] || false} onClick={(e) => {
                    // e.stopPropagation();
                    e.preventDefault();
                    cartDispatch({ type: 'remove', item: product });
                  }}
                    variant="contained" color="secondary" style={{ margin: 3 }}>
                    <RemoveIcon />
                  </Button>
                  <Button disabled={!cartState[product.id] || false}
                    onClick={(e) => {
                    e.preventDefault();
                    // e.stopPropagation();
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

{/* <Pagination color="secondary" className={classes.paginationAlign}
        count={10}
        renderItem={item => (
          <PaginationItem
            component={Link}
            to={`/products/${item.page === 1 ? 'page1' : `page${item.page}`}`}
            {...item}
          />
        )}
      /> */}
{/* <PaginationLink color="secondary" className={classes.paginationAlign} */}
{/* // size={useMediaQuery(theme => theme.breakpoints.down(424)) ? 'small' : 'large'} /> */}
      {/* <Pagination count={10} color="secondary" className={classes.paginationAlign}
        size={useMediaQuery(theme => theme.breakpoints.down(424)) ? 'small' : 'large'} />
    <Pagination
              page={page}
              count={10}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
                  {...item}
                /> */}
    </div>

  );
})

export default Products;





