import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Container, Typography, makeStyles } from '@material-ui/core';
import { ProductsContext } from '../services/context';
import Slider from './Slider';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'white',
        padding: '20px',
    },
    title: {
        color: theme.palette.secondary.main,
        fontSize: 60,
        fontWeight: 'bold',
        margin: 0,
    },
    tagline: {
        color: theme.palette.primary.main,
        textAlign: 'center',
        fontFamily: 'Yusei Magic,sans-serif',
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
    arrivals: {
        color: theme.palette.warning.main,
        fontSize: 60,
        fontWeight: 'bold',
        margin: 0,
        textAlign: 'center'
    },

}))

export default function Home(props) {

    const classes = useStyles();
    const [products] = useContext(ProductsContext);
    return (
        <div style={{ padding: '30px 0px' }}>

            <Container className={classes.container}>
                <p className={classes.title}>Welcome to the Shoe Store..</p>
                <h1 className={classes.tagline}>Life is too short for bad shoes..</h1>
            </Container>
            <div style={{ paddingTop: '30px' }}>

                <Container className={classes.container} style={{ padding: '20px 0px' }}>
                    <p className={classes.arrivals}>New Arrivals..</p>

                    <Slider itemHeight={260} itemWidth={225} itemsTotal={10} itemsDisplayed={4}>
                        {products?.sort((a, b) => (new Date(b?.releaseDate).getTime() - new Date(a?.releaseDate).getTime())).slice(0, 10).map((product) => (
                            <Card className={classes.card} key={product.title}>
                                <CardActionArea component={Link} to={{ pathname: `/products/${product.id}/` }}>
                                    <CardMedia
                                        className={classes.media}
                                        image={product.media.smallImageUrl??"/noImage.jpg"}
                                        title={product.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" >
                                            {product.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>))}
                    </Slider>
                </Container>
            </div>
        </div>
    );
}
