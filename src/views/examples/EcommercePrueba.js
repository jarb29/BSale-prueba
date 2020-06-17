import React, { useContext,  useEffect }  from "react";
import { Context } from '../../AppContext';
import { withRouter } from "react-router";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components

import EcommerceHeader from "components/Headers/EcommerceHeader.js";
import FixedTransparentNavbar from "components/Navbars/FixedTransparentNavbar";

function EcommercePrueba() {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.store();
  }, []);
  const categories = [...new Set(store.tiendaSeleccionada.data)]

  document.documentElement.classList.remove("nav-open");

  return (
    <>
      <FixedTransparentNavbar />
      <EcommerceHeader />
      <div className="wrapper">
        <div className="section section-blog">
          <Container>
          <Row>


          {   
                            categories.map((producto, i) => {
         
                                return (


            
              <Col md="4">
                <Card className="card-blog">
                  <div className="card-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img img-raised"
                        src={producto.urlImg}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <h6 className="card-category text-info">Enterprise</h6>
                    <CardTitle tag="h5">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      $ {producto.variant.finalPrice}
                      
                      </a>
                    </CardTitle>
                    <p className="card-description">
                    {producto.name} <br />
                    </p>
                    <hr />
                    <CardFooter>
                      <div className="author">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="avatar img-raised mr-2"
                            src={producto.urlImg}
                          />
                          <span>{producto.variant.description}</span>
                        </a>
                      </div>
                      <div className="stats">
                        <i className="fa fa-clock-o mr-1" />
                      </div>
                            <Button
                              className="btn-neutral btn-icon btn-round pull-right"
                              color="success"
                              data-placement="left"
                              id={`tooltip${i}`}
                              onClick={() => actions.addToCart(producto)}
                            >
                            <i className="now-ui-icons shopping_cart-simple"></i>
                            </Button>
                            <UncontrolledTooltip
                              delay={i}
                              placement="left"
                              target={`tooltip${i}`}
                            >
                              Agregar al Carrito
                            </UncontrolledTooltip>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
              )
                        })
                    }   


           



            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default withRouter(EcommercePrueba);
