import React, { useContext }  from "react";
import { Context } from '../../AppContext';
import Alert from '@material-ui/lab/Alert';
//import CheckIcon from '@material-ui/icons/Check';


// reactstrap components
import {
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators
} from "reactstrap";

// core components
const items = [
  {
    src: "url(" + require("assets/img/bg40.jpg") + ")",
    content: (
      <Row>
        <Col className="ml-auto mr-auto" md="8">
          <h1 className="title">Compra en Bsale...</h1>
          <h4 className="description text-white">
            Donde encontraras de todo.
          </h4>
        </Col>
      </Row>
    ),
    altText: "",
    caption: ""
  },
  {
    src: "url(" + require("assets/img/bg41.jpg") + ")",
    content: (
      <Row>
        <Col className="ml-auto mr-auto text-center" md="8">
          <h1 className="title">Porque te conocemos.</h1>
          <h4 className="description text-white">
            Compra las ultimas tendencias...
          </h4>
        </Col>
      </Row>
    ),
    altText: "",
    caption: ""
  },
  {
    src: "url(" + require("assets/img/bg42.png") + ")",
    content: (
      <Row>
        <Col className="ml-auto mr-auto" md="8">
          <h1 className="title">Para todos los estilos.</h1>
          <h4 className="description text-white">
            Atrevete a usarnos tenemos soluciones para todos los gustos....
          </h4>
        </Col>
      </Row>
    ),
    altText: "",
    caption: ""
  }
];

function EcommerceHeader() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const { store} = useContext(Context);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  console.log(store.productoAgregado.code ==200, "que hay aqui")
  return (
    <>
      {store.error === null?
      <Alert  severity="success">
        Producto agregado exitosamente. 
      </Alert> : null}

      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {items.map(item => {
          return (
            <CarouselItem
              onExiting={onExiting}
              onExited={onExited}
              key={item.src}
            >
              <div className="page-header header-filter">
                <div
                  className="page-header-image"
                  style={{
                    backgroundImage: item.src
                  }}
                ></div>
                <div className="content-center text-center">{item.content}</div>
              </div>
            </CarouselItem>
          );
        })}
        <a
          className="left carousel-control carousel-control-prev"
          data-slide="prev"
          href="#pablo"
          onClick={e => {
            e.preventDefault();
            previous();
          }}
          role="button"
        >
          <span className="now-ui-icons arrows-1_minimal-left" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="right carousel-control carousel-control-next"
          data-slide="next"
          href="#pablo"
          onClick={e => {
            e.preventDefault();
            next();
          }}
          role="button"
        >
          <span className="now-ui-icons arrows-1_minimal-right" />
          <span className="sr-only">Next</span>
        </a>
      </Carousel>
    </>
  );
}

export default EcommerceHeader;
