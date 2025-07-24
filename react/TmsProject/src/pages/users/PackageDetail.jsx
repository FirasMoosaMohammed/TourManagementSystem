import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPackage } from "../../api/fetchApi";
import EnquiryForm from "../../pages/users/EnquiryForm";
import { Row, Col, Card } from "react-bootstrap";
import UsersNavbar from "../UsersNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Terms from "./Terms";
import Footer from "../Footer";

function PackageDetail() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    getPackage(id).then((res) => setPkg(res.data));
  }, [id]);

  if (!pkg) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div>
      <UsersNavbar />
      <div className="package-detail-container">
        <Row className="flex-md-row flex-column h-100 m-0">
          <Col md={6} className="gallery-col">
            {pkg.images && pkg.images.length > 0 ? (
              <div>
                {pkg.images.map((img, i) => (
                  <Card key={i} className="mb-3 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={img.image}
                      alt={`Tour ${i}`}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  </Card>
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </Col>

          <Col md={6} className="details-col">
            <h1>{pkg.title}</h1>
            <p className="text-muted">
              <FontAwesomeIcon icon={faLocationDot} />
              &nbsp;{pkg.origin} → {pkg.destination}
            </p>
            <h4 className="text-success mb-4">₹ {pkg.base_amount}</h4>

            <h5>Itinerary:</h5>
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: pkg.itinerary }}
            />

            <Terms />

            <hr className="package-divider" id="submit" />
            <EnquiryForm packageId={pkg.id} />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default PackageDetail;
