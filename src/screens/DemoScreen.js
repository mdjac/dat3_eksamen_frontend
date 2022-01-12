import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import demoFacade from "../facades/demoFacade";

const DemoScreen = (props) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    demoFacade
      .dataThreads()
      .then((inputData) => {
        console.log("INPUTDATA");
        setData(inputData);
      })
      .catch((fullError) => {
        fullError.then((err) => {
          console.log("ERROR");
          console.log(err);
          setError(err.message);
        });
      });
    //fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const inputData = await demoFacade.dataThreads();
      setData(inputData);
    } catch (error) {
      const e = await error;
      setError(e.message);
    }
  };

  return (
    <>
      <h2 className="header">DemoScreen</h2>
      {data && (
        <React.Fragment>
          <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    {Object.keys(data.weather).map((header, index) => {
                      return <th key={index}>{header}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr key={data.weather.title}>
                    <td>{data.weather.title}</td>
                    <td>{data.weather.location_type}</td>
                    <td>{data.weather.latt_long}</td>
                  </tr>
                </tbody>
              </Table>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Currency Name</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(data.currencies).map(([key, value]) => {
                    return (
                      <tr>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
          <div class="col-4"></div>
        </React.Fragment>
      )}
      {error && (
        <React.Fragment>
          <h2>{error}</h2>
        </React.Fragment>
      )}
    </>
  );
};

export default DemoScreen;
