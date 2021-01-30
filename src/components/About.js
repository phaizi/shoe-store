import { Card, CardActionArea, CardContent, CardMedia, Container, Divider, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Link from '@material-ui/core/Link';
import Slider from './Slider';

const useStyles = makeStyles(theme => ({

  title: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    padding: '5px 20px',
    margin: '0px 0px 25px',
  },

  card: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    width: 205,
    height: 250,
    margin: '10px',
    display: 'inline-block',
  },

  container: {
    padding: '20px',
  },

  paper: {
    paddingBottom: '30px',
  },

  media: {
    height: 140,
  },

  content: {
    fontFamily: 'Yusei Magic,sans-serif',
    marginTop: '40px',
    paddingLeft: '30px',
  }
}))

const cards = [
  { title: 'Watsapp', value: '+923412607432' },
  { title: 'Email', value: 'faizan.mansur87@gmail.com', link: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=faizan.mansur87@gmail.com&su=MEETING%20FAIZAN%20MANSUR&body=MESSAGE' },
  { title: 'Github', value: 'https://github.com/phaizi', link: 'https://github.com/phaizi' },
  { title: 'Linkedin', value: 'https://www.linkedin.com\n/in/faizanmansur', link: 'https://www.linkedin.com/in/faizanmansur' },
  { title: 'Facebook', value: 'https://www.facebook.com\n/faizan.mansur', link: 'https://www.facebook.com\n/faizan.mansur' }
]
export default function About() {

  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} >
        <Paper >
          <Typography variant='h3' className={classes.title}>About the App</Typography>
          <Typography variant='h6' className={classes.content}>Shoe Store is a web app based on Reactjs as front end with react-router 6beta and materialui, and deployed on surge. </Typography>
          <Typography variant='h6' className={classes.content}>Functionalities includes.. </Typography>
          <div >
            <List component="nav" aria-label="app functionality">
              <ListItem>
                <ListItemText primary="1. Listing products with pagination" />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemText primary="2. Displaying product details using dynamic routes" />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemText primary="3. Adding to cart option from different sections of the app" />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemText primary="4. Custom made slider to display different items in limited space" />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemText primary="5. Displaying the new arrival on the home page" />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemText primary="6. Fully responsive on all screen sizes" />
              </ListItem>
              <Divider />
            </List>
          </div>
        </Paper>
      </Container>

      <Container className={classes.container} >
        <Paper
          className={classes.paper} >
          <Typography variant='h3' className={classes.title}>Meet  Faizan Mansur @</Typography>

          <Slider itemHeight={250} itemWidth={225} itemsTotal={5} itemsDisplayed={4}>
            {cards.map((card) => {
              console.log('ABOUT this is card.title.toLocaleLowerCase() = ', card.title.toLocaleLowerCase())
              return (
                <Link href={card.link} target="_blank" rel="noopener" key={card.title} >
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`/u${card.title.toLocaleLowerCase()}.png`}
                        title={card.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.title}
                        </Typography>
                        <Typography variant="body2" color="white" component="p">
                          {card.value}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              )
            })}
          </Slider>
          
        </Paper>
      </Container>
    </div >
  );
}