import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { deletePackage, deleteSchedule } from "../../api/fetchApi";
import { toast } from "react-hot-toast";
import AdminNavbar from "../AdminNavbar";
import AddPackage from "./AddPackage";
import AddSchedule from "./AddSchedule";
import EditPackage from "./EditPackage";
import EditSchedule from "./EditSchedule";
import { AppContext } from "../AppContextApi";
import { useContext } from "react";

function AdminHome() {
  const {
    packages,
    schedules,
    fetchPackages,
    fetchSchedules,
    setPackages,
    setSchedules,
  } = useContext(AppContext);

  const handleDeletePackage = (id) => {
    deletePackage(id)
      .then(() => {
        toast.success("Package deleted successfully");
        fetchPackages();
      })
      .catch(() => toast.error("Failed to delete package"));
  };

  const handleDeleteSchedule = (id) => {
    deleteSchedule(id)
      .then(() => {
        toast.success("Schedule deleted successfully");
        fetchSchedules();
      })
      .catch(() => toast.error("Failed to delete schedule"));
  };

  return (
    <div>
      <AdminNavbar />
      <Container className="py-5">
        <h1 className="mb-4">Welcome, Admin!</h1>

        <AddPackage />
        <AddSchedule />

        <h2 className="mt-2">Tour Packages</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <Col key={pkg.id}>
                <Card className="h-100 shadow-sm border-secondary">
                  {pkg.images?.length > 0 && (
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
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{pkg.title}</Card.Title>
                    <Card.Text>
                      {pkg.origin} → {pkg.destination}
                    </Card.Text>
                    <Card.Text>From ₹{pkg.base_amount}</Card.Text>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <EditPackage
                        id={pkg.id}
                        packages={packages}
                        setPackages={setPackages}
                        onClose={() => {}}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeletePackage(pkg.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No packages available</p>
          )}
        </Row>

        <h2 className="mt-5">Schedules</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {schedules.length > 0 ? (
            schedules.map((sch) => (
              <Col key={sch.id}>
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
                                  style={{ height: "80px", objectFit: "cover" }}
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

                    <div className="mt-auto d-flex justify-content-between">
                      <EditSchedule id={sch.id} />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteSchedule(sch.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No schedules available</p>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default AdminHome;
