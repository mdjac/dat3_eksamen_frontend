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

  return {
    createUser,
    fetchTrips,
    addUserToTrip,
    deleteTrip,
    createTrip,
  };
};

export default examFacade();
