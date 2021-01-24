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
import { Button, ButtonGroup, Grow, Typography } from '@material-ui/core';
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

// function createData(item, quantity, price, amount) {
//   return { item, quantity, price, amount };
// }

// const rows =
//   [
//     createData('Frozen yoghurt', 159, 6.0, 24),
//     createData('Ice cream sandwich', 237, 9.0, 37),
//     createData('Eclair', 262, 16.0, 24),
//     'total',
//     createData('Cupcake', 305, 3.7, 67),
//     createData('Gingerbread', 356, 16.0, 49),
//   ];

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
  const [orderPlaced , setOrder] = useState(false);
  const navigate = useNavigate();

  console.log('this is cart = ', cartState);
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
                    onClick={()=>{cartDispatch({type:'add',item:cartState[row]})}}>
                      <AddIcon fontSize="small" />
                    </Button>
                    <Button size="small" variant="contained" color="secondary" 
                    onClick={()=>{cartDispatch({type:'remove',item:cartState[row]})}}>
                      <RemoveIcon fontSize="small" />
                    </Button>
                    <Button
                      size="small" variant="contained" color="secondary" 
                      onClick={()=>{cartDispatch({type:'clear',item:cartState[row]})}}>
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
                  <Grow {...{ timeout: 5000 }} in={orderPlaced}>
                <Typography variant='h5'>Thankyou for placing your order with us</Typography>
                </Grow>
                : <Button disabled={!cartState.total} variant="contained" color="secondary"
                onClick={()=>{
                  cartDispatch({type:'resetAll'}); 
                  setOrder(true);
                  setTimeout(function(){ setOrder(false); 
                    console.log('location after chekout = ',window.location);
                    if(window.location.pathname==='/cart/'){
                    navigate('/products') }}, 5000);
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




