import examFacade from "../facades/examFacade";
import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";

const DisplayTripsComponent = () => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState();

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
  return (
    <>
      <h1>User Story#1 - All Trips</h1>
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

export default DisplayTripsComponent;
