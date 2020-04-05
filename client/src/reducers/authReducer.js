import { FETCH_USER } from "../actions/types";
export default function(state = null, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}

/*
FETCH_USER can be null - waiting for response or some payload user logged
in or false user not logged in
*/
