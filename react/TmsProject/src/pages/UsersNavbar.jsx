import { useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/TerraTrails2.png";
import { listPackages, listSchedules } from "../api/fetchApi";

function UsersNavbar() {
  const [packages, setPackages] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    listPackages().then((res) => setPackages(res.data || []));
    listSchedules().then((res) => setSchedules(res.data || []));
  }, []);

  return (
    <Navbar className="bg-primary px-3">
      <Container className="d-flex justify-content-between align-items-center flex-wrap">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center mb-2 mb-md-0"
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", width: "auto" }}
          />
        </Link>

        <Nav className="me-auto d-flex align-items-center gap-3 flex-wrap">
          <Link
            to="/"
            className="text-white navbar-brand"
            style={{ fontSize: "small", textDecoration: "none" }}
          >
            Home
          </Link>

          <NavDropdown
            title={<span style={{ color: "white" }}>Packages</span>}
            id="packages-dropdown"
            menuVariant="light"
            className="text-white"
            style={{ fontSize: "small" }}
          >
            {packages.length === 0 ? (
              <NavDropdown.Item disabled>No packages</NavDropdown.Item>
            ) : (
              packages.map((pkg) => (
                <NavDropdown.Item
                  as={Link}
                  key={pkg.id}
                  to={`/packages/${pkg.id}`}
                >
                  {pkg.title}
                </NavDropdown.Item>
              ))
            )}
          </NavDropdown>

          <NavDropdown
            title={<span style={{ color: "white" }}>Schedules</span>}
            id="schedules-dropdown"
            menuVariant="light"
            className="text-white"
            style={{ fontSize: "small" }}
          >
            {schedules.length === 0 ? (
              <NavDropdown.Item disabled>No schedules</NavDropdown.Item>
            ) : (
              schedules.map((sch) => (
                <NavDropdown.Item
                  as={Link}
                  key={sch.id}
                  to={`/schedules/${sch.id}`}
                >
                  {sch.title}
                </NavDropdown.Item>
              ))
            )}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default UsersNavbar;
