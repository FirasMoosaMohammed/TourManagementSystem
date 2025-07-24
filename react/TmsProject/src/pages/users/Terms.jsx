import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Terms() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a
        href="#submit"
        className="fw-bold"
        style={{ textDecoration: "none", color:"darkblue"}}
        onClick={handleShow}
      >
        *Terms & Conditions
      </a>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>*Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <li>
              <strong>Booking & Payment</strong>
              <br />
              Full or partial payment confirms your booking. Payment receipts
              are sent via email.
            </li>
            <li>
              <strong>Cancellation & Refunds</strong>
              <br />
              - 30+ days before travel: 80% refund
              <br />
              - 15–29 days: 50% refund
              <br />- Less than 15 days: No refund
            </li>
            <li>
              <strong>Date Changes</strong>
              <br />
              Request changes at least 14 days in advance; subject to
              availability.
            </li>
            <li>
              <strong>Documents</strong>
              <br />
              Carry valid ID. We are not responsible for denied entry due to
              missing documents.
            </li>
            <li>
              <strong>Liability</strong>
              <br />
              We’re not liable for delays, accidents, or third-party service
              issues.
            </li>
            <li>
              <strong>Behavior</strong>
              <br />
              Disruptive behavior may result in removal from the tour without
              refund.
            </li>
            <li>
              <strong>Media Use</strong>
              <br />
              Trip photos/videos may be used in promotions unless you request
              otherwise.
            </li>
            <li>
              <strong>Privacy</strong>
              <br />
              Your data is secure and used only for booking and communication
              purposes.
            </li>{" "}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Terms;
