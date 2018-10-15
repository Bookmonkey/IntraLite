var Service = require("node-windows").Service;

// Create a new service object
var svc = new Service({
  name: "Intralite",
  description: "Internal Web, with links and noticeboard.",
  script: "C:\\inetpub\\wwwroot\\intralite\\server\\app.js"
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  console.log("Service successfully created");
  svc.start();
});

svc.install();
