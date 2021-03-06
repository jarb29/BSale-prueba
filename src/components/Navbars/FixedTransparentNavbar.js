import React, { useContext }  from "react";
import { Context } from '../../AppContext';
import { withRouter } from "react-router";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  Nav,
  Container,
} from "reactstrap";

import ButtonCarrito from "./ButtonCarrito";

function FixedTransparentNavbar(props) {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const { actions, store} = useContext(Context);

  let words = [' shopping_shop', ' business_bulb-63', ' location_pin', ' education_paper', ' users_circle-08', ' users_single-02', ' tech_mobile',  ' users_circle-08',' tech_mobile']
  let menu = ['Pisco', 'Ron', 'Bebidas Energeticas', 'Ceramicas', 'Makka Drinks', 'Energetica Score', 'Varios', 'Demo y final']
  
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className="navbar-absolute navbar-transparent" expand="lg">
        <Container>
          <div className="navbar-translate">
          <div className="author" style ={{width:"110px", opacity: '0.7', borderImage: '50 round'}}>
            <img
            alt="..."
            className="avatar img-raised"
            src={require("assets/img/logo.jpg")}
            ></img>
          </div>
          <div >
            <button
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              className="navbar-toggler"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          </div>
          <Collapse isOpen={collapseOpen} navbar>
            <Nav className="ml-auto" id="ceva" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  id="navbarDropdownMenuLink"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i
                    aria-hidden={true}
                    className="now-ui-icons design_image"
                  ></i>
                  <p>Categorias</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink" right>
                  {menu.map((word, i)=>{
                    return (
                      <DropdownItem 
                      key ={i}
                    onClick={(e) => {
                      actions.store(e, i+2)
                    }}
                    >
                    <i className={`now-ui-icons${words[i]}`}></i>
                    {word}
                  </DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
              {store.carrito.length !==0? 
                <DropdownItem >
                    <ButtonCarrito />
                </DropdownItem>
                : null}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default withRouter(FixedTransparentNavbar);
