import React, { useContext,  useEffect}  from "react";
import { Context } from '../../AppContext';
import { withRouter } from "react-router";

// reactstrap components
import {
  Button,
  Container,
  Modal,
  ModalFooter
} from "reactstrap";

// core components

function ModalCompra(props) {
    
    const { store, actions} = useContext(Context);



  const [modalMini, setModalMini] = React.useState(false);

  return (
    <>
        <Container>
              <Button
                onClick={() => setModalMini(true)}
                className="btn-round"
                color="info"
                type="button"
              >
                Comprar{" "}
                <i className="now-ui-icons arrows-1_minimal-right"></i>
              </Button>
              <Modal
                modalClassName="modal-mini modal-info"
                isOpen={modalMini}
                toggle={() => setModalMini(false)}
              >
                <div className="modal-header justify-content-center">
                  <div  style ={{width:"110px", opacity: '0.7', borderImage: '50 round'}}>
                        <img
                        alt="..."
                        className="avatar img-raised"
                        src={require("assets/img/logo.jpg")}
                        ></img>
                    </div>
                </div>
                <div className="modal-body">
                  <p>Esta seguro de realizar su compra?</p>
                </div>
                <ModalFooter>
                <Button
                    className="btn-link"
                    color="neutral"
                    onClick={() => setModalMini(false)}
                  >
                    Cerrar
                  </Button>
                  <Button 
                  className="btn-neutral" 
                  color="link" 
                  type="button"
                  onClick={(e) => {
                    actions.productoComprado(e, props.history)
                    setModalMini(false)
                  }}
                  >
                    Comprar
                  </Button> 
                </ModalFooter>
              </Modal>
        </Container>
    </>
  );
}

export default withRouter(ModalCompra);
