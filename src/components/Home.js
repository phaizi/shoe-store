import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Container, Typography, makeStyles } from '@material-ui/core';
import { ProductsContext } from '../services/context';
import Slider2 from './Slider2';


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'white',
        padding: '20px',
        // color: theme.palette.secondary.main,
        // fontSize: 30 
    },
    title: {
        color: theme.palette.secondary.main,
        fontSize: 60,
        fontWeight: 'bold',
        margin: 0,
        //    padding: 0, 
    },
    tagline: {
        color: theme.palette.primary.main,
        textAlign: 'center'
    },
    card: {
        backgroundColor: theme.palette.secondary.main,
      boxShadow: '0px 0px 10px 5px #e0e0e0',

        color: 'white',
        width: 205,
        height: 250,
        margin: '10px',
        display: 'inline-block',
    },
    media: {
        height: 140,
    },


}))
export default function Home(props) {
    





    // let location = useLocation();
    const classes = useStyles();
    const [products] = useContext(ProductsContext);
    // console.log('thisi is location= ',location)
    // let History = useHistory();
    // console.log('thisi is History= ',History)
    // const params = useParams();
    // console.log('this is params 2= ',params);
    // console.log('this is props= ',props)
    console.log('this is Home')
    return (
        <div style={{ padding: '20px' }}>

            <Container className={classes.container}>

                <p className={classes.title}>Welcome to the Shoe Store..</p>
                <h1 className={classes.tagline}>Life is too short for bad shoes.</h1>

            </Container>
            <Container className={classes.container}>

                   <Slider2 itemHeight={260} itemWidth={225} itemsTotal={10} itemsDisplayed={4}>
                            {products?.sort((a, b) => (new Date(b?.releaseDate).getTime() - new Date(a?.releaseDate).getTime())).slice(0, 10).map((product) => (
                                <Card className={classes.card} key={product.title}>
                                    <CardActionArea component={Link} to={{ pathname: `/products/${product.id}/` }}>
                                        <CardMedia
                                            className={classes.media}
                                            image={product.media.smallImageUrl}
                                            title={product.title}
                                            />
                                        <CardContent>
                                            <Typography  gutterBottom variant="h6" >
                                                {product.title}
                                            </Typography>
                                            
                                            
                                        </CardContent>
                                    </CardActionArea>
                                </Card>))}
                            {/* {console.log('HOME products = ',products.slice(0,5))}
{console.log('HOME type of products = ', typeof(products))} */}
                            {/* {products.slice(0,10)} */}
</Slider2>
            </Container>

        </div>


    );
}
