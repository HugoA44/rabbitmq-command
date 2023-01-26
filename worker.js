const commandModel = require("./api/models/command");

class Worker {
  constructor(rabbitMQService) {
    this.rabbitMQService = rabbitMQService;
  }

  async start() {
    try {
      await this.rabbitMQService.connect();
      this.rabbitMQService.consume("commandQueue", async (msg) => {
        const command = msg;
        command.status = "ok";
        try {
          await commandModel.updateCommand(command);
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Worker;
