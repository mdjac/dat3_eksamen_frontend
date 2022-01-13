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

  return {
    createUser,
    fetchTrips,
    addUserToTrip,
  };
};

export default examFacade();
