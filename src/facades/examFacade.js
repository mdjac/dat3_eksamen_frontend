import { URL } from "../constants.js";
import ApiFacade from "./apiFacade";

const examFacade = () => {
  const createUser = (user) => {
    const options = ApiFacade.makeOptions("POST", true, user);
    return fetch(URL + "/api/user", options).then(ApiFacade.handleHttpErrors);
  };

  return {
    createUser,
  };
};

export default examFacade();
