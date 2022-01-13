import { useEffect, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import examFacade from "../facades/examFacade";

const CreateGuideComponent = () => {
  const initialGuide = { name: "", gender: "", birthYear: "", image: "" };
  const [guide, setGuide] = useState(initialGuide);

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setGuide({ ...guide, [id]: value });
  };

  const createGuide = async () => {
    try {
      const response = await examFacade.createGuide(guide);
      alert("Guide with ID:" + response.id + " created!");
      console.log(response);
    } catch (error) {
      const e = await error;
      alert(e.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createGuide();
    setGuide(initialGuide);
  };
  return (
    <>
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
        <h2>Create Guide</h2>
        <Form onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                id="name"
                value={guide.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                type="text"
                id="gender"
                value={guide.gender}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Birth year:</Form.Label>
              <Form.Control
                type="number"
                id="birthYear"
                value={guide.birthYear}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Image (NOT REQUIRED):</Form.Label>
              <Form.Control
                type="text"
                id="image"
                value={guide.image}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <br></br>
          <Button variant="primary" type="submit" value="Submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateGuideComponent;
