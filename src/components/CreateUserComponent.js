import { useEffect, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import examFacade from "../facades/examFacade";

const CreateUserComponent = () => {
  const initialUser = { username: "", password: "", roles: [] };
  const [user, setUser] = useState(initialUser);
  const [roles, setRoles] = useState(["admin", "user"]);

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setUser({ ...user, [id]: value });
  };

  const handleCheckboxChange = (event) => {
    var isChecked = event.target.checked;
    var value = event.target.value;

    if (isChecked === true && !user.roles.includes(value)) {
      user.roles.push({ rolename: value });
    } else {
      user.roles = user.roles.filter(
        (indexValue) => value !== indexValue.rolename
      );
    }
    setUser({ ...user });
  };

  const createUser = async () => {
    try {
      const response = await examFacade.createUser(user);
      alert("User created!");
    } catch (error) {
      const e = await error;
      alert(e.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.roles.length > 0) {
      createUser();
      setUser(initialUser);
      //Used as checkbox is seperate from object
      event.target.reset();
    } else {
      alert("Please select atleast one role");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#EBEBEB",
        maxWidth: "550px",
        padding: 20,
        borderRadius: 5,
      }}
    >
      <h2>Create user</h2>
      <Form onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              id="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        {roles.map((role) => {
          return (
            <Form.Group
              style={{ maxWidth: "50px", margin: "auto" }}
              className="mb-1"
              key={role}
            >
              <Form.Check
                type="checkbox"
                id="roles"
                label={role}
                value={role}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          );
        })}

        <br></br>
        <Button variant="primary" type="submit" value="Submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateUserComponent;
