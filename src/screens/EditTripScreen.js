import TripsComponent from "../components/TripsComponent";
import React, { useState } from "react";
import { useLocation, Redirect, useHistory, useParams } from "react-router-dom";

const EditTripScreen = (props) => {
  const { id } = useParams();
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      {props.user && props.user.roles.includes("admin") ? (
        <>
          <h2 className="header">Edit Trip</h2>
          <p>{id}</p>
        </>
      ) : (
        <h2 className="header">You are not allowed here!</h2>
      )}
    </div>
  );
};

export default EditTripScreen;
