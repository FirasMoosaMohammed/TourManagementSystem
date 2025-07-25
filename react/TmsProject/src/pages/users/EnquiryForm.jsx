import { useState, useEffect } from "react";
import { submitEnquiry } from "../../api/fetchApi";
import { toast } from "react-hot-toast";
import { Form, FloatingLabel, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

function EnquiryForm({ packageId = null, scheduleId = null }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      package_id: packageId || undefined,
      schedule_id: scheduleId || undefined,
    };

    try {
      console.log("DATA: ", data);
      await submitEnquiry(data);
      toast.success("Enquiry submitted!");
      setFormData({ name: "", mobile: "", email: "", message: "" });
      handleClose();
    } catch (err) {
      toast.error("Error submitting enquiry");
    }
  };

  return (
    <div>
      <a
        href="#submit"
        className="text-black"
        style={{
          textDecoration: "none",
          fontSize: "1rem",
          fontWeight: "500",
          letterSpacing: "3px",
        }}
        onClick={handleShow}
      >
        &nbsp;ENQUIRE NOW <FontAwesomeIcon icon={faMessage} />
      </a>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingMobile"
              label="Mobile"
              className="mb-3"
            >
              <Form.Control
                type="tel"
                name="mobile"
                placeholder="Enter Mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingMessage"
              label="Message"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                name="message"
                placeholder="Enter your message"
                style={{ height: "100px" }}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <Modal.Footer className="px-0">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EnquiryForm;
