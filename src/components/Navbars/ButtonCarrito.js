/*eslint-disable*/
import React, { useContext }  from "react";
import { Context } from '../../AppContext';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Carrito from 'views/index-sections/Carrito';
import ModalCompra from "views/adminitrador-componentes/ModalCompra";



const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: "sucess",
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function ButtonCarrito() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { actions, store} = useContext(Context);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="default"
        id="navbarDropdownMenuLink"
        onClick={handleClick}
        aria-labelledby="navbarDropdownMenuLink"
      >
        <i className="now-ui-icons shopping_cart-simple"></i>
         {"  "}Carrito
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
              <Carrito />
          </ListItemIcon>
        </StyledMenuItem>
          <div className="text-center">
            <ModalCompra  />
          </div>   
      </StyledMenu>          
    </div>
  );
}
