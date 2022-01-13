import { useEffect, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import examFacade from "../facades/examFacade";

const CreateTripComponent = () => {
  const initialTrip = {
    name: "",
    dateTime: "",
    location: "",
    duration: "",
    packingItems: [],
  };
  const [trip, setTrip] = useState(initialTrip);
  const [packingItem, setPackingItem] = useState("");
  const [packingItemList, setPackingItemList] = useState([]);

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setTrip({ ...trip, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    trip.packingItems = packingItemList;
    setTrip({ ...trip });
    createTrip();
  };

  const createTrip = () => {
    //TODO: Create the trip
    console.log(trip);
    setTrip(initialTrip);
    setPackingItemList([]);
    setPackingItem("");
  };

  const handlePackingItemList = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    if (id == "packingItemInput") {
      setPackingItem(value);
    } else if (id == "add") {
      const newList = packingItemList.concat(packingItem);
      setPackingItemList(newList);
      console.log(packingItemList);
    } else if (id == "delete") {
      const newList = [...packingItemList];
      newList.pop();
      setPackingItemList(newList);
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
      <h2>Create Trip</h2>
      <Form onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              id="name"
              value={trip.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Date dd-mm-yy HH:mm</Form.Label>
            <Form.Control
              type="text"
              id="dateTime"
              value={trip.dateTime}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Location:</Form.Label>
            <Form.Control
              type="text"
              id="location"
              value={trip.location}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Duration (Days)</Form.Label>
            <Form.Control
              type="number"
              id="duration"
              value={trip.duration}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Packing item:</Form.Label>
            <Form.Control
              type="text"
              id="packingItemInput"
              value={packingItem}
              onChange={handlePackingItemList}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Button variant="success" id="add" onClick={handlePackingItemList}>
              Add
            </Button>
            <Button
              variant="danger"
              id="delete"
              onClick={handlePackingItemList}
            >
              Delete Last
            </Button>
          </Form.Group>
        </Row>
        {packingItemList.length > 0 && (
          <ul>
            {packingItemList.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        )}
        <br></br>
        <Button variant="primary" type="submit" value="Submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateTripComponent;
