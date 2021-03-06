import { URL } from "../constants.js";
import ApiFacade from "./apiFacade";

const examFacade = () => {
  const createUser = (user) => {
    const options = ApiFacade.makeOptions("POST", true, user);
    return fetch(URL + "/api/user", options).then(ApiFacade.handleHttpErrors);
  };
  const fetchTrips = () => {
    const options = ApiFacade.makeOptions("GET", true);
    return fetch(URL + "/api/exam/trips", options).then(
      ApiFacade.handleHttpErrors
    );
  };

  const addUserToTrip = (inputJson) => {
    const options = ApiFacade.makeOptions("POST", true, inputJson);
    return fetch(URL + "/api/exam/trips", options).then(
      ApiFacade.handleHttpErrors
    );
  };

  const deleteTrip = (tripId) => {
    const options = ApiFacade.makeOptions("DELETE", true);
    return fetch(URL + "/api/exam/trips/" + tripId, options).then(
      ApiFacade.handleHttpErrors
    );
  };

  const createTrip = (inputJson) => {
    const options = ApiFacade.makeOptions("POST", true, inputJson);
    return fetch(URL + "/api/exam/newtrip", options).then(
      ApiFacade.handleHttpErrors
    );
  };

  const createGuide = (inputJson) => {
    const options = ApiFacade.makeOptions("POST", true, inputJson);
    return fetch(URL + "/api/exam/newguide", options).then(
      ApiFacade.handleHttpErrors
    );
  };

  const fetchTripById = (id) => {
    const options = ApiFacade.makeOptions("GET", true);
    return fetch(URL + "/api/exam/trips/" + id, options).then(
      ApiFacade.handleHttpErrors
    );
  };

  const fetchGuides = () => {
    const options = ApiFacade.makeOptions("GET", true);
    return fetch(URL + "/api/exam/guides", options).then(
      ApiFacade.handleHttpErrors
    );
  };

  const updateTrip = (trip) => {
    const options = ApiFacade.makeOptions("PUT", true, trip);
    return fetch(URL + "/api/exam/trips", options).then(
      ApiFacade.handleHttpErrors
    );
  };

  return {
    createUser,
    fetchTrips,
    addUserToTrip,
    deleteTrip,
    createTrip,
    createGuide,
    fetchTripById,
    fetchGuides,
    updateTrip,
  };
};

export default examFacade();
