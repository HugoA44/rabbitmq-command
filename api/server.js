const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const command = require("./models/command");
command.createTable();

const RabbitMQService = require("../helpers/RabbitMQService");
const Worker = require("../worker");
const rabbitMQService = new RabbitMQService();
const worker = new Worker(rabbitMQService);
worker.start();

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/commands", async (req, res) => {
  try {
    const rows = await command.getCommands();
    res.json(rows);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get("/api/commands/:id", async (req, res) => {
  try {
    const row = await command.getCommand(req.params.id);
    res.json(row);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.post("/api/commands", async (req, res) => {
  try {
    const commandId = await command.createCommand(req.body);
    rabbitMQService.publish("commandQueue", { commandId });
    res.json({ commandId });
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
