import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { userLogin } from "../api/fetchApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const formSubmit = () => {
    const { username, password } = user;
    if (!username || !password) {
      toast.error("Invalid data!");
      return;
    } else {
      userLogin(user)
        .then((res) => {
          console.log(res.data);
          const token = res.data.token;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("role", res.data.role);

          console.log(res.data.role);

          toast.success("Login Successful!");

          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            toast.error("Only admin users can log in!");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Invalid credentials!");
        });
    }
  };

  return (
    <div className="container w-50 mt-5 text-center">
      <h1>Login</h1>
      <FloatingLabel
        controlId="floatingUsername"
        label="Username"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="abc"
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
      </FloatingLabel>
      <div className="d-flex justify-content-around mt-3">
        <button className="btn btn-info" onClick={formSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
