// getAPIPAth
function getAPIPath(ENV) {
  switch (ENV) {
    case "development":
      return "http://localhost:3000";
      break;

    case "production":
      return "http://10.100.20.155:8080";
      return

    case "staging":
      return "http://localhost:8080";
      return;

    default:
      return "http://localhost:3000";
      break;
  }
}

const Utils = {
  getAPIPath
};

export default Utils;