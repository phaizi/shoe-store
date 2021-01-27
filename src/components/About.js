import { Card, CardActionArea, CardContent, CardMedia, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Slider from './Slider';


const useStyles = makeStyles(theme => ({

  root: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    width: 205,
    height: 250,
    margin: '10px',
    display: 'inline-block',
  },

  paper: {
    padding: '30px',
    overflow: 'hidden',
  },

  media: {
    height: 140,
  },

  Meet: {
    fontFamily: 'Yusei Magic,sans-serif',
  }
}))

const cards = [
  { title: 'Watsapp', value: '+923412607432' },
  { title: 'Email', value: 'faizan.mansur87@gmail.com' },
  { title: 'Github', value: 'https://github.com/phaizi' },
  { title: 'Linkedin', value: 'https://www.linkedin.com\n/in/faizanmansur' },
  { title: 'Facebook', value: 'https://www.facebook.com\n/faizan.mansur' }
]
const About = () => {

  console.log('this is About')
  const classes = useStyles();


  return (
    <div>
      <Container >
        <Paper className={classes.paper}>
          <Typography variant='h3' className={classes.Meet}>Meet  Faizan Mansur @</Typography>

          <Slider>
            {cards.map((card) => {
              console.log('ABOUT this is card.title.toLocaleLowerCase() = ', card.title.toLocaleLowerCase())
              return (
                <Card className={classes.root}>
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
              )
            })}
          </Slider>

        </Paper>
      </Container>
    </div>
  );
}
export default About;