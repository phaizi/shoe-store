import React, { useContext } from 'react'
import {ProductsContext} from '../services/context';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme=>({
  root: {
    maxHeight:'374.5px',
    minHeight:'374.5px',
     minWidth: '300px',
     maxWidth: '22%',
     margin:'20px',
    flex:'23%',

    '&:hover': {
maxWidth:'366px',
maxHeight:'400px',
margin:'0px',

    [theme.breakpoints.down(1415)]: {
  maxWidth:'340px',
  maxHeight:'400px',
  margin:'13px',
  marginDown:'0',
  marginTop:'0',
      },

    [theme.breakpoints.down(1077)]: {
  maxWidth:'340px',
  maxHeight:'400px',
  margin:'20px',
  marginDown:'0px',
  marginTop:'0px',
      },
		}
  },
 
  container:{
    display:'flex', flexWrap:'wrap',
     justifyContent: 'space-evenly'
  },

  media: {
    height: 140,
  },
  card: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    },
  },

}));

export default function Products() {
  // const [count,setCount] =  useState({c:1}); 
  let [Products] = useContext(ProductsContext);
  const classes = useStyles();
  console.log('Products = ',Products)
  console.log('is it array?',Array.isArray(Products) )
  // console.log('Count = ',count.c)
  // count.c = count.c+1;
  if (Array.isArray(Products)){
  let Prop = Products.map((product)=>product.title)
  console.log('Prop= ',Prop)
  console.log('Products with &&= ',Products && Products[1] )}
  Products = Products && Products;
     return (
<div className={classes.container}>
    {Products && Products.map((product)=>{
      console.log('product= ',product)
      return(       

    <Card key={product.id} className={classes.root}>
      <CardActionArea className={classes.card}>
        <CardMedia
          className={classes.media}
          image= {product.media.smallImageUrl}
          title={product.title}
          />
        <CardContent 
        style={{height:'150px'}}
        >
          <Typography  gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Gender: {product.gender}
          </Typography>
          <Typography variant="h6" color="textPrimary" component="p">
            Price: {product.retailPrice || 'N/A'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
      <Button variant="contained" color="secondary">
          Add To Cart
        </Button>
      </CardActions>
    </Card>  
    )})}
   </div>
  );
}


      


