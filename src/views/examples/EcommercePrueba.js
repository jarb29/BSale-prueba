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
import FooterDefault from "components/Footers/FooterDefault";

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
          {  categories.map((producto, i) => {
            let a = (producto.urlImg === null) ? 'https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario408881.jpg': producto.urlImg
          return (
              <Col md="4">
                <Card className="card-blog">
                  <div className="card-image" >
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img img-raised"
                        src={a}
                        style ={{height: "300px"}}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <h6 className="card-category text-info">{producto.name}</h6>
                    <CardTitle tag="h5">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      $ {producto.variant.finalPrice}
                      </a>
                    </CardTitle>
                    
                    <hr />
                    <CardFooter>
                      <div className="author" >
                        <a href="#pablo" onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="avatar img-raised mr-2"
                            src={a}
                          
                          />
                          <span>{producto.variant.description}</span>
                        </a>
                      </div>
                      <div className="stats">
                        <i className="fa fa-clock-o mr-1" />
                      </div>
                            <Button
                              className="btn-neutral btn-icon btn-round pull-right"
                              color="black"
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
              )}
            )}   
            </Row>
          </Container>
          <FooterDefault />
        </div>

      </div>
    </>
  );
}

export default withRouter(EcommercePrueba);
