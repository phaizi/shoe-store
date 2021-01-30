import React, { useContext, useState } from 'react';
import { CartContext } from '../services/context';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, ButtonGroup, Slide, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import { useNavigate } from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  cartCount: {
    marginLeft: '20px',
    borderRadius: '50%',
    height: '32px',
    textAlign: 'center',
    lineHeight: '32px',
    float: 'right',
    width: '32px',
    backgroundColor: 'orange',
    color: 'white',
    fontSize: '20px'
  },
});

export default function Cart() {

  const classes = useStyles();
  const [cartState, cartDispatch] = useContext(CartContext);
  const [orderPlaced, setOrder] = useState(false);
  const navigate = useNavigate();

  const subTotal = Object.keys(cartState).reduce(
    (acc, value) => acc + (value !== 'total' && cartState[value].retailPrice * cartState[value].quantity), 0)
  const shipping = cartState.total && 100;

  return (
    <Container maxWidth="lg" style={{ paddingTop: '5vh', paddingBottom: '5vh', }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Items</StyledTableCell>
              <StyledTableCell align='right'>Quantity</StyledTableCell>
              <StyledTableCell align='center'>Price</StyledTableCell>
              <StyledTableCell align='center'>Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(cartState).map((row) => (
              row !== 'total' &&
              <StyledTableRow key={cartState[row].id}>
                <StyledTableCell component="th" scope="row">
                  {cartState[row].title}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button size="small" variant="contained" color="secondary"
                      onClick={() => { cartDispatch({ type: 'add', item: cartState[row] }) }}>
                      <AddIcon fontSize="small" />
                    </Button>
                    <Button size="small" variant="contained" color="secondary"
                      onClick={() => { cartDispatch({ type: 'remove', item: cartState[row] }) }}>
                      <RemoveIcon fontSize="small" />
                    </Button>
                    <Button
                      size="small" variant="contained" color="secondary"
                      onClick={() => { cartDispatch({ type: 'clear', item: cartState[row] }) }}>
                      <ClearIcon fontSize="small" />
                    </Button></ButtonGroup>
                  <span className={classes.cartCount}>
                    {cartState[row].quantity}
                  </span>
                </StyledTableCell>
                <StyledTableCell align='center'>{cartState[row].retailPrice}</StyledTableCell>
                <StyledTableCell align='center'>{cartState[row].quantity * cartState[row].retailPrice}</StyledTableCell>
              </StyledTableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={2} colSpan={2} />
              <TableCell align='center'>Subtotal</TableCell>
              <TableCell align='center'>{subTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>Shipping</TableCell>
              <TableCell align='center'>{shipping}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' colSpan={2}>
                {orderPlaced ?
                  <Slide {...{ timeout: 2000 }} in={orderPlaced} direction="right" mountOnEnter unmountOnExit>
                    <Typography variant='h5'>Thankyou for placing your order with us</Typography>
                  </Slide>
                  : <Button disabled={!cartState.total} variant="contained" color="secondary"
                    onClick={() => {
                      cartDispatch({ type: 'resetAll' });
                      setOrder(true);
                      setTimeout(function () {
                        setOrder(false);
                        console.log('location after chekout = ', window.location);
                        if (window.location.pathname === '/cart/') {
                          navigate('/products')
                        }
                      }, 4000);
                    }}>
                    CHECKOUT
                </Button>}</TableCell>
              <TableCell align='center'>Total</TableCell>
              <TableCell align='center'>{subTotal + shipping}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}




