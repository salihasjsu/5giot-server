const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { wsServerConfig } = require("../config/config");
const EventHubReader = require("./event-hub-reader.js");
const { logger } = require("../logger.js");

const iotHubConnectionString = process.env.IotHubConnectionString;
if (!iotHubConnectionString) {
  console.error(
    `Environment variable IotHubConnectionString must be specified.`
  );
  return;
}
console.log(`Using IoT Hub connection string [${iotHubConnectionString}]`);

const eventHubConsumerGroup = process.env.EventHubConsumerGroup;
console.log(eventHubConsumerGroup);
if (!eventHubConsumerGroup) {
  console.error(
    `Environment variable EventHubConsumerGroup must be specified.`
  );
  return;
}
console.log(`Using event hub consumer group [${eventHubConsumerGroup}]`);

// Redirect requests to the public subdirectory to the root
const wsServerApp = express();
//app.use(express.static(path.join(__dirname, "public")));
//app.use((req, res /* , next */) => {
// res.redirect("/");
//});
const server = http.createServer(wsServerApp);
const wss = new WebSocket.Server({ server });
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        console.log(`Broadcasting data ${data}`);
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

server.listen(wsServerConfig.port, () => {
  logger.debug(
    `Web Socket server started at path ${wsServerConfig.host} on ${wsServerConfig.port}`
  );
});
const eventHubReader = new EventHubReader(
  iotHubConnectionString,
  eventHubConsumerGroup
);

(async () => {
  console.log("Event Hub Reader");
  await eventHubReader.startReadMessage((message, date, deviceId) => {
    try {
      const payload = {
        IotData: message,
        MessageDate: date || Date.now().toISOString(),
        DeviceId: deviceId,
      };
      //   console.log("REC from AZURE", JSON.stringify(payload));
      wss.broadcast(JSON.stringify(payload));
    } catch (err) {
      console.error("Error broadcasting: [%s] from [%s].", err, message);
    }
  });
})().catch();
module.exports = { server };
