import TripsComponent from "../components/TripsComponent";
import { Form, Col, Row, Button } from "react-bootstrap";
import uuid from "react-uuid";
import examFacade from "../facades/examFacade";
import React, { useState, useEffect } from "react";
import { useLocation, Redirect, useHistory, useParams } from "react-router-dom";

const EditTripScreen = (props) => {
  const initialTrip = {
    name: "",
    dateTime: "",
    location: "",
    duration: "",
    packingItems: [],
    //guide: { id: "", name: "", gender: "", birthYear: "", image: "" },
  };
  const { id } = useParams();
  const [trip, setTrip] = useState(initialTrip);
  const [packingItem, setPackingItem] = useState({ id: "", name: "" });
  const [guides, setGuides] = useState();
  /*
  const [guides, setGuides] = useState([
    { id: -10, name: "", gender: "", birthYear: "", image: "" },
  ]);
  */

  useEffect(() => {
    examFacade
      .fetchTripById(id)
      .then((inputData) => {
        console.log("INPUTDATA");
        setTrip(inputData);
      })
      .catch((fullError) => {
        fullError.then((err) => {
          console.log("ERROR");
          console.log(err);
          alert(err.message);
        });
      });

    examFacade
      .fetchGuides()
      .then((inputData) => {
        console.log("INPUTDATA");
        setGuides(inputData);
      })
      .catch((fullError) => {
        fullError.then((err) => {
          console.log("ERROR");
          console.log(err);
          alert(err.message);
        });
      });
  }, [id]);

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setTrip({ ...trip, [id]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("submitted");
    console.log("TEST");
    console.log(trip);
    console.log(trip.packingItems);
  };

  const handlePackingItemList = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    if (id == "packingItemInput") {
      setPackingItem({ ...packingItem, name: value });
    } else if (id == "add") {
      const newList = trip.packingItems.concat(packingItem);
      trip.packingItems = newList;
      setTrip({ ...trip });
      console.log("add");
    } else if (id == "delete") {
      console.log("delete");
      const newList = [...trip.packingItems];
      newList.pop();
      trip.packingItems = newList;
      setTrip({ ...trip });
    }
  };
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      {props.user && props.user.roles.includes("admin") ? (
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
            <h2>Edit Trip</h2>
            <h4>{id}</h4>
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
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Packing item:</Form.Label>
                    <Form.Control
                      type="text"
                      id="packingItemInput"
                      value={packingItem.name}
                      onChange={handlePackingItemList}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button
                      variant="success"
                      id="add"
                      onClick={handlePackingItemList}
                    >
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
                {trip.packingItems.length > 0 && (
                  <ul>
                    {trip.packingItems.map((item) => {
                      return <li key={uuid()}>{item.name}</li>;
                    })}
                  </ul>
                )}
              </Row>
              {guides && (
                <>
                  <label for="guidesId">Guide: </label>
                  <select name="guidesId" id="guidesId">
                    {guides.map((g) => {
                      if (g.id == trip.guide.id) {
                        return (
                          <option value="g.id" selected>
                            {g.name}
                          </option>
                        );
                      } else {
                        return <option value="g.id">{g.name}</option>;
                      }
                    })}
                  </select>
                  <br></br>
                </>
              )}
              <Button variant="primary" type="submit" value="Submit">
                Submit
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <h2 className="header">You are not allowed here!</h2>
      )}
    </div>
  );
};

export default EditTripScreen;
