import examFacade from "../facades/examFacade";
import Table from "react-bootstrap/Table";
import { Modal, Container, Row, Col, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const TripsComponent = (props) => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState();

  //For userstory#2 showing guide details
  const [modalShow, setModalShow] = useState(false);
  const [modalGuide, setModalGuide] = useState({
    id: -1,
    name: "",
    gender: "",
    birthYear: -1,
    image: "",
  });

  useEffect(() => {
    examFacade
      .fetchTrips()
      .then((inputData) => {
        console.log("INPUTDATA");
        setTrips(inputData);
      })
      .catch((fullError) => {
        fullError.then((err) => {
          console.log("ERROR");
          console.log(err);
          setError(err.message);
        });
      });
  }, []);

  const addUserToTrip = async (tripId) => {
    let json = { tripId: tripId };
    console.log(json);
    try {
      const response = await examFacade.addUserToTrip(json);
      alert(response.message);
    } catch (error) {
      const e = await error;
      alert(e.message);
    }
  };

  const deleteTrip = async (tripId) => {
    let json = { tripId: tripId };
    console.log(json);
    /*
    try {
      const response = await examFacade.addUserToTrip(json);
      alert(response.message);
    } catch (error) {
      const e = await error;
      alert(e.message);
    }
    */
  };

  return (
    <>
      <h1>All Trips</h1>
      {trips.length > 0 ? (
        <>
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Date & Time</td>
                  <td>Location</td>
                  <td>Duration (days)</td>
                  <td>Packing Items</td>
                  <td>Guide</td>
                </tr>
              </thead>
              <tbody>
                {trips.map((x) => {
                  return (
                    <tr key={x.id}>
                      <td>{x.id}</td>
                      <td>{x.name}</td>
                      <td>{x.dateTime}</td>
                      <td>{x.location}</td>
                      <td>{x.duration}</td>
                      <td>
                        <ul>
                          {x.packingItems.map((item) => {
                            return <li>{item.name}</li>;
                          })}
                        </ul>
                      </td>
                      <td>
                        {x.guide.name}
                        <br></br>
                        <>
                          <div style={{ padding: 1 }}>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                setModalShow(true);
                                setModalGuide(x.guide);
                              }}
                            >
                              See details {x.guide.name}
                            </Button>
                          </div>
                          <div style={{ padding: 1 }}>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                addUserToTrip(x.id);
                              }}
                            >
                              Add me!
                            </Button>
                          </div>
                          {props.user.roles.includes("admin") && (
                            <div style={{ padding: 1 }}>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  deleteTrip(x.id);
                                }}
                              >
                                Delete Trip
                              </Button>
                            </div>
                          )}
                          <MyModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            guide={modalGuide}
                          />
                        </>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        <>
          <h2>Failed fetching data</h2>
          <p>Error MSG: {error}</p>
        </>
      )}
    </>
  );
};

const MyModal = (props) => {
  useEffect(() => {}, [props]);
  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        // centered //Try these 2 settings out
        // fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Guide Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ul key={props.guide.id}>
              <li> ID: {props.guide.id}</li>
              <li>Name: {props.guide.name}</li>
              <li>Birth Year: {props.guide.birthYear}</li>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <img
                  src={props.guide.image}
                  alt="Failed loading image"
                  width="200"
                  height="200"
                />
              </div>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TripsComponent;
