import { Worker } from "bullmq";
import sendEmail from "../mailer.js";
import redisClient from "../Redis/redisClient.js";

const worker = new Worker(
  "sendEmail",
  async (job) => {
    try {
      await sendEmail(job.data.templateName, job.data.sendTo, job.data);
    } catch (error) {
      console.log(error);
    }
  },
  { connection: redisClient }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});
