import first from "/src/assets/carousel1.jpg";
import fifth from "/src/assets/carousel5.jpg";
import second from "/src/assets/carousel2.jpg";
import fourth from "/src/assets/carousel4.jpg";
import third from "/src/assets/carousel3.png";
import { Carousel } from "react-bootstrap";

function CarouselComponent() {
  return (
    <Carousel className="mb-4">
      <Carousel.Item>
        <img className="d-block w-100" src={first} alt="First slide" />
        <Carousel.Caption>
          <h3 style={{ color: "white" }}>Escape the ordinary. Discover the extraordinary.</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={second} alt="Second slide" />
        <Carousel.Caption>
          <h3 style={{ color: "white" }}>Where every journey becomes a story worth telling.</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 slide3-img" src={third} alt="Third slide" />
        <Carousel.Caption className="slide3">
          <h3>Your adventure begins the moment you choose us.</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={fourth} alt="Fourth slide" />
        <Carousel.Caption className="slide4">
          <h3 style={{ color: "white" }}>Unlock destinations. Live unforgettable moments.</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={fifth} alt="Fifth slide" />
        <Carousel.Caption className="slide5">
          <h3>Stop Scrolling. Start Exploring.</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
