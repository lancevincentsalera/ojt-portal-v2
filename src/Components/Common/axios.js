import axios from "axios";

export default axios.create({
  baseURL: "https://ojtportal.azurewebsites.net/api",
});
