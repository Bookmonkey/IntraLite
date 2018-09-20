// getAPIPAth
function getAPIPath(ENV) {
  switch (ENV) {
    case "development":
      return "http://localhost:3000";
      break;

    case "production":
      return

    case "production_host":
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