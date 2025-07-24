import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSchedule } from "../../api/fetchApi";
import EnquiryForm from "../../pages/users/EnquiryForm";
import UsersNavbar from "../UsersNavbar";
import { Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import Terms from "./Terms";
import Footer from "../Footer";

function ScheduleDetail() {
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    getSchedule(id).then((res) => setSchedule(res.data));
  }, [id]);

  if (!schedule) return <p className="text-center mt-5">Loading...</p>;

  const pkg = schedule.package_details;

  return (
    <div>
      <UsersNavbar />
      <div className="package-detail-container">
        <Row className="flex-md-row flex-column h-100 m-0">
          <Col md={6} className="gallery-col">
            {pkg?.images && pkg.images.length > 0 ? (
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
            <h1>{schedule.title}</h1>
            <p className="text-muted">
              <FontAwesomeIcon icon={faLocationDot} />
              &nbsp;
              {pkg?.origin} → {pkg?.destination}
            </p>
            <h5 className="mb-2">
              {" "}
              <FontAwesomeIcon icon={faCalendar} />
              <span className=" fw-normal">
                &nbsp;
                {schedule.start_date}
              </span>{" "}
              <FontAwesomeIcon icon={faArrowRight} />
              &nbsp;
              <span className="fw-normal">{schedule.end_date}</span>
            </h5>
            <h4 className="text-success mb-4 mt-4">₹ {pkg?.base_amount}</h4>

            <h4>Itinerary:</h4>
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: pkg?.itinerary }}
            />
            <Terms />
            <hr className="package-divider" id="submit" />
            <EnquiryForm scheduleId={schedule.id} />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default ScheduleDetail;
