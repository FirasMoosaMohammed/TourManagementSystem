import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addPackage } from "../../api/fetchApi";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AppContext } from "../AppContextApi";
import { useContext } from "react";

function AddPackage() {
  const [form, setForm] = useState({
    title: "",
    origin: "",
    destination: "",
    base_amount: "",
    itinerary: "",
  });
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);

  const { fetchPackages } = useContext(AppContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, origin, destination, base_amount, itinerary } = form;
    if (
      !title ||
      !origin ||
      !destination ||
      !base_amount ||
      !itinerary ||
      images.length === 0
    ) {
      toast.error("Please fill all fields and upload at least one image.");
      return;
    }

    try {
      const packageRes = await addPackage(form);
      const packageId = packageRes.data.id;

      const headers = {
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      };

      await Promise.all(
        images.map(async (img) => {
          const imgData = new FormData();
          imgData.append("image", img);
          imgData.append("package", packageId);

          const res = await fetch("http://127.0.0.1:8000/api/images/", {
            method: "POST",
            headers,
            body: imgData,
          });

          if (!res.ok) {
            const err = await res.text();
            throw new Error(`Image upload failed: ${err}`);
          }
        })
      );

      toast.success("Package added successfully!");
      fetchPackages();

      setForm({
        title: "",
        origin: "",
        destination: "",
        base_amount: "",
        itinerary: "",
      });
      setImages([]);

      handleClose();
    } catch (error) {
      console.error("Error adding package:", error);
      toast.error("Failed to add package.");
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
        Add Package
      </a>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingTitle"
            label="Title"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Title"
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingFrom" label="From" className="mb-3">
            <Form.Control
              type="text"
              name="origin"
              placeholder="From"
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTo" label="To" className="mb-3">
            <Form.Control
              type="text"
              name="destination"
              placeholder="To"
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingAmount"
            label="Base Amount"
            className="mb-3"
          >
            <Form.Control
              type="number"
              name="base_amount"
              placeholder="Enter Base Amount"
              onChange={handleChange}
            />
          </FloatingLabel>

          <Form.Group className="mb-3">
            <Form.Label>Itinerary</Form.Label>
            <ReactQuill
              theme="snow"
              value={form.itinerary}
              onChange={(value) => setForm({ ...form, itinerary: value })}
            />
          </Form.Group>

          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Photos</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files))}
            />
          </Form.Group>
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

export default AddPackage;
