import React, { useContext }  from "react";
import { Context } from '../../AppContext';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Table,
  Row,
  Container,
  Col,
} from "reactstrap";



function Carrito() {
  const { store, actions } = useContext(Context);


  return (
          <div >
            <Container >
              <Row >
                <Col md="12">
                  <Card className="card-plain">
                    <CardBody>
                      <p> Sus compras </p>
                      <Table striped>
                      <thead>
                          <tr>
                            <th>
                              <small>Nombre</small>
                            </th>
                            <th>
                              <small>foto</small>
                            </th>
                            <th className="text-right">
                              <small> Precio</small>
                            </th>
                            <th className="text-right">
                              <small> Cantidad</small>
                            </th>
                            <th className="text-right">
                                <small>  {"  "} </small>
                            </th>
                            <th className="text-right">
                              <small>Total/Unidad</small>
                            </th>
                          </tr>
                        </thead>

                        <tbody >
                        {   
                            store.carrito.map((producto, i) => {
                              let a = (producto.producto.urlImg === null) ? 'https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario408881.jpg': producto.producto.urlImg;
                              console.log(producto, "dentro del map del carrito")
                                return (  
                        
                        <tr key ={i} >
                          <td className="text-center">
                            <small>{producto.producto.name}</small>
                          </td>
                          <td className="text-center">
                              <div className="img-container">
                                  <img
                                    alt="..."
                                    src={a}
                                    style ={{width:"50px"}}
                                  ></img>
                              </div>
                          </td>
                          <td className="text-center">
                                $ {producto.producto.variant.finalPrice} 
                          </td>
                          <td className="text-center">
                               {producto.cantidad}
                          </td>
                          <td className="td-number">
                                {" "}
                              <ButtonGroup>
                                <Button 
                                color="info" 
                                size="sm"
                                onClick={() => actions.addToCartII(producto)}
                                >
                                  <i className="now-ui-icons ui-1_simple-delete"></i>
                                </Button>
                                <Button 
                                color="info" 
                                size="sm"
                                onClick={() => actions.addToCartI(producto)}
                                >
                                  <i className="now-ui-icons ui-1_simple-add"></i>
                                </Button>
                              </ButtonGroup>
                            </td>
                            <td className="text-center">
                         
                          $ {producto.cantidad*producto.producto.variant.finalPrice} <small> CLP </small> 
                       
                          </td>
                          </tr>
                           );}
                           )} 
                         
                        </tbody>
                      </Table>
                      <Table>
                          <tr className="td-number">
                             <td className="text-right">
                             <small>Total a pagar:  </small>{" "}{store.totalCarrito} CLP
                            </td>
                          </tr>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
        </div>
  );
}

export default Carrito;
