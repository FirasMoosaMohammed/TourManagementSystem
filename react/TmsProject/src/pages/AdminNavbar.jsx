import { Container, Navbar, Button, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/TerraTrails2.png";
import AddPackage from "./admin/AddPackage";
import AddSchedule from "./admin/AddSchedule";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <Navbar expand="md" className="bg-primary px-3">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand
          as={Link}
          to="/admin"
          className="d-flex align-items-center"
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", width: "auto" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="admin-navbar-nav" className="bg-light" />

        <Navbar.Collapse id="admin-navbar-nav">
          <Nav
            className="me-auto align-items-center w-100 flex-column flex-md-row gap-3"
            style={{
              backgroundColor: "#1b1b1b",
              borderRadius: "5px",
              padding: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            <Link
              to="/admin"
              className="text-white navbar-brand "
              style={{ fontSize: "small", textDecoration: "none" }}
            >
              Dashboard
            </Link>

            <div>
              <AddPackage />
            </div>

            <div>
              <AddSchedule />
            </div>

            <Link
              to="/admin/enquiries"
              className="text-white navbar-brand "
              style={{ fontSize: "small", textDecoration: "none" }}
            >
              Enquiries
            </Link>

            {/* Logout for mobile screens */}
            <div className="d-md-none">
              <Button
                variant="link"
                onClick={handleLogout}
                style={{
                  textDecoration: "none",
                  color: "#bc4b4b",
                  fontWeight: "500",
                  padding: 0,
                }}
              >
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={{ fontSize: "1.0rem", marginRight: "6px" }}
                ></i>
                Logout
              </Button>
            </div>
          </Nav>

          {/* Logout for desktop screens */}
          <div className="d-none d-md-flex align-items-center mx-3">
            <Button
              variant="link"
              onClick={handleLogout}
              style={{
                textDecoration: "none",
                color: "#bc4b4b",
                fontWeight: "500",
                padding: 0,
              }}
            >
              <i
                className="fa-solid fa-right-from-bracket"
                style={{ fontSize: "1.0rem", marginRight: "6px" }}
              ></i>
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
