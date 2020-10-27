// reducer for the uploading files list
export function uploadListReducer(state, { type, action }) {
  console.log("action", action, "type", type);
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
          i["edit"] = false;
        }
      }
      break;
    case "COMPLETED":
      newstate = {
        ...newstate,
        [action]: { ...newstate[action], status: "completed" },
      };
      break;
      case "CANEDIT":
        newstate = {
          ...newstate,
          [action]: { ...newstate[action], status: "canedit" },
        };
        break;
    case "ACTIVE":
      newstate = {
        ...newstate,
        [action]: { ...newstate[action], status: "active" },
      };
      break;
    case "PENDING":
      newstate = {
        ...newstate,
        action: { ...newstate[action], status: "pending" },
      };
      break;
    case "ABORT":
      newstate = {
        ...newstate,
        [action]: { ...newstate[action], abort: true },
      };
      break;
    default:
      newstate = newstate;
  }
  return newstate;
}
