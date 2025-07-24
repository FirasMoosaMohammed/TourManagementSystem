import { useState } from "react";
import { getSchedule, updateSchedule } from "../../api/fetchApi";
import { toast } from "react-hot-toast";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { AppContext } from "../AppContextApi";
import { useContext } from "react";

function EditSchedule({ id }) {
  const [show, setShow] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [scheduleData, setScheduleData] = useState({
    title: "",
    package: "",
    start_date: "",
    end_date: "",
  });

  const { packages, fetchSchedules } = useContext(AppContext);

  const handleShow = async () => {
    try {
      const res = await getSchedule(id);
      const schedule = res.data;

      setScheduleData({
        title: schedule.title,
        package: schedule.package,
        start_date: schedule.start_date,
        end_date: schedule.end_date,
      });

      setShow(true);
    } catch {
      toast.error("Failed to load schedule details");
    }
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setScheduleData({ ...scheduleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (scheduleData.end_date < scheduleData.start_date) {
      toast.error("End date cannot be before start date.");
      return;
    }

    try {
      const payload = {
        title: scheduleData.title,
        package: parseInt(scheduleData.package),
        start_date: scheduleData.start_date,
        end_date: scheduleData.end_date,
      };

      await updateSchedule(id, payload);
      toast.success("Schedule updated successfully");
      fetchSchedules();
      handleClose();
    } catch (err) {
      console.error("error", err);
      toast.error("Failed to update schedule");
    }
  };

  return (
    <>
      <button className="btn btn-success btn-sm" onClick={handleShow}>
        Edit
      </button>

      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="title" label="Title" className="mb-3">
              <Form.Control
                type="text"
                name="title"
                value={scheduleData.title}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="package" label="Package" className="mb-3">
              <Form.Select
                name="package"
                value={scheduleData.package}
                onChange={handleChange}
                required
              >
                <option value="">Select Package</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel
              controlId="start_date"
              label="Start Date"
              className="mb-3"
            >
              <Form.Control
                type="date"
                name="start_date"
                value={scheduleData.start_date}
                onChange={handleChange}
                required
                min={today}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="end_date"
              label="End Date"
              className="mb-3"
            >
              <Form.Control
                type="date"
                name="end_date"
                value={scheduleData.end_date}
                onChange={handleChange}
                required
                min={scheduleData.start_date || today}
              />
            </FloatingLabel>

            <div className="text-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditSchedule;
