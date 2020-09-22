


// reducer for the uploading files list
export function uploadListReducer(state, { type, action }) {
    let newstate = { ...state };
    switch (type) {
      case "ADD":
        newstate = { ...newstate, ...action };
        break;
      case "DELETE":
        delete newstate[action];
        break;
      case "EDIT":
        for (let i of newstate) {
          if (i["id"] === action) {
            i["edit"] = true;
          } else {
            i["edit"] == false;
          }
        }
        break;
      case "ABORT":
        newstate = {
          ...newstate,
          [action]: { ...newstate[action], abort: true },
        };
        break;
      default:
        newstate = newstate
    }
    return newstate;
  }