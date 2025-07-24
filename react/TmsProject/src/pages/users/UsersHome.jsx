import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { listPackages, listSchedules } from "../../api/fetchApi";
import { Link } from "react-router-dom";
import UsersNavbar from "../UsersNavbar";
import CarouselComponent from "./CarouselComponent";
import Footer from "../Footer";

function UsersHome() {
  const [packages, setPackages] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    listPackages()
      .then((res) => {
        setPackages(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("Error fetching packages!", err));

    listSchedules()
      .then((res) => {
        setSchedules(res.data);
      })
      .catch((err) => console.error("Error fetching schedules:", err));
  }, []);

  return (
    <div>
      <UsersNavbar />
      <CarouselComponent />

      <Container className="py-5">
        <h2 className="mt-4 mb-3">Tour Packages</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <Col key={pkg.id}>
                <Link
                  to={`/packages/${pkg.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card className="h-100 shadow-sm border-secondary">
                    {pkg.images && pkg.images.length > 0 && (
                      <div style={{ height: "200px", overflow: "hidden" }}>
                        <Card.Img
                          variant="top"
                          src={pkg.images[0].image}
                          alt={pkg.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                    <Card.Body>
                      <Card.Title>{pkg.title}</Card.Title>
                      <Card.Text>
                        {pkg.origin} → {pkg.destination}
                      </Card.Text>
                      <Card.Text>From ₹{pkg.base_amount}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <p>No packages available</p>
          )}
        </Row>

        <h2 className="mt-5 mb-3">Schedules</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {schedules.length > 0 ? (
            schedules.map((sch) => (
              <Col key={sch.id}>
                <Link
                  to={`/schedules/${sch.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card className="h-100 shadow-sm border-secondary">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{sch.title}</Card.Title>
                      <Card.Text>
                        {sch.start_date} → {sch.end_date}
                      </Card.Text>

                      {sch.package_details && (
                        <>
                          <h6 className="mt-3">
                            Package: {sch.package_details?.title}
                          </h6>
                          <Row className="mt-2">
                            {sch.package_details.images &&
                            sch.package_details.images.length > 0 ? (
                              sch.package_details.images.map((img, index) => (
                                <Col key={index} xs={4} className="mb-2">
                                  <img
                                    src={img.image}
                                    alt={`Pkg Img ${index}`}
                                    className="img-fluid rounded shadow-sm"
                                    style={{
                                      height: "80px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </Col>
                              ))
                            ) : (
                              <Col>
                                <p>No images</p>
                              </Col>
                            )}
                          </Row>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <p>No schedules available</p>
          )}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default UsersHome;
