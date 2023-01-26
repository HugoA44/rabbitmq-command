const amqp = require("amqplib");

class RabbitMQService {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    this.connection = await amqp.connect("amqp://localhost:5672");
    this.channel = await this.connection.createChannel();
  }

  async publish(queue, message) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async consume(queue, callback) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) =>
      callback(JSON.parse(msg.content.toString()), msg)
    );
  }

  async ack(msg) {
    this.channel.ack(msg);
  }
  async nack(msg) {
    this.channel.nack(msg);
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}

module.exports = RabbitMQService;
