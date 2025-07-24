import { useState } from "react";
import { addSchedule } from "../../api/fetchApi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import { AppContext } from "../AppContextApi";
import { useContext } from "react";

function AddSchedule() {
  const [form, setForm] = useState({
    title: "",
    start_date: "",
    end_date: "",
    package: "",
  });
  const [show, setShow] = useState(false);

  const { packages, fetchSchedules } = useContext(AppContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    const { title, start_date, end_date, package: pkg } = form;
    if (!title || !start_date || !end_date || !pkg) {
      toast.error("Please fill all fields.");
      return;
    }

    if (end_date < start_date) {
      toast.error("End date cannot be before start date.");
      return;
    }

    try {
      await addSchedule(form);
      toast.success("Schedule added successfully!");
      fetchSchedules();

      setForm({
        title: "",
        start_date: "",
        end_date: "",
        package: "",
      });

      handleClose();
    } catch (error) {
      console.error("Failed to add schedule", error);
      toast.error("Error adding schedule");
    }
  };

  return (
    <div>
      <a
        href="#"
        className="text-white navbar-brand"
        style={{ fontSize: "small" }}
        onClick={handleShow}
      >
        Add Schedule
      </a>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingTitle"
            label="Title"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingStart"
            label="Start Date"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              min={today}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingEnd"
            label="End Date"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              min={form.start_date || today}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPackage"
            label="Package"
            className="mb-3"
          >
            <Form.Select
              name="package"
              value={form.package}
              onChange={handleChange}
            >
              <option value="">Select Package</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddSchedule;
