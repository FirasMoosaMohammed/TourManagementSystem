import { useState } from "react";
import { getPackage, updatePackage } from "../../api/fetchApi";
import { toast } from "react-hot-toast";
import { Modal, Button, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AppContext } from "../AppContextApi";
import { useContext } from "react";

function EditPackage({ id }) {
  const [show, setShow] = useState(false);

  const [packageData, setPackageData] = useState({
    title: "",
    origin: "",
    destination: "",
    base_amount: "",
    itinerary: "",
    images: [],
  });

  const [existingImages, setExistingImages] = useState([]);

  const { fetchPackages } = useContext(AppContext);

  const handleShow = async () => {
    await fetchPackage();
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const fetchPackage = async () => {
    try {
      const res = await getPackage(id);
      const data = res.data;
      setPackageData({
        title: data.title,
        origin: data.origin,
        destination: data.destination,
        base_amount: data.base_amount,
        itinerary: data.itinerary,
        images: [],
      });
      setExistingImages(data.images || []);
    } catch {
      toast.error("Failed to load package details");
    }
  };

  const handleChange = (e) => {
    setPackageData({ ...packageData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setPackageData({ ...packageData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateData = {
        title: packageData.title,
        origin: packageData.origin,
        destination: packageData.destination,
        base_amount: packageData.base_amount,
        itinerary: packageData.itinerary,
      };

      await updatePackage(id, updateData);
      toast.success("Package updated");

      const headers = {
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      };

      if (packageData.images.length > 0) {
        for (const img of existingImages) {
          await fetch(`http://127.0.0.1:8000/api/images/${img.id}/`, {
            method: "DELETE",
            headers,
          });
        }

        for (const img of packageData.images) {
          const imgData = new FormData();
          imgData.append("image", img);
          imgData.append("package", id);

          await fetch("http://127.0.0.1:8000/api/images/", {
            method: "POST",
            headers,
            body: imgData,
          });
        }
      }

      fetchPackages();
      handleClose();
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  return (
    <>
      <button className="btn btn-success btn-sm" onClick={handleShow}>
        Edit
      </button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="title" label="Title" className="mb-3">
              <Form.Control
                type="text"
                name="title"
                value={packageData.title}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="origin" label="From" className="mb-3">
              <Form.Control
                type="text"
                name="origin"
                value={packageData.origin}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="destination" label="To" className="mb-3">
              <Form.Control
                type="text"
                name="destination"
                value={packageData.destination}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="base_amount"
              label="Base Amount"
              className="mb-3"
            >
              <Form.Control
                type="number"
                name="base_amount"
                value={packageData.base_amount}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <Form.Group className="mb-3">
              <Form.Label>Itinerary</Form.Label>
              <ReactQuill
                theme="snow"
                value={packageData.itinerary}
                onChange={(value) =>
                  setPackageData({ ...packageData, itinerary: value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Upload New Images</Form.Label>
              <Form.Control type="file" multiple onChange={handleImageChange} />
            </Form.Group>

            {existingImages.length > 0 && (
              <>
                <h6>Existing Images</h6>
                <Row className="mb-3">
                  {existingImages.map((img, index) => (
                    <Col xs={4} md={3} lg={2} key={index} className="mb-2">
                      <img
                        src={img.image}
                        alt={`Package ${index}`}
                        className="img-fluid rounded shadow-sm"
                        style={{ height: "100px", objectFit: "cover" }}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            )}

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

export default EditPackage;
