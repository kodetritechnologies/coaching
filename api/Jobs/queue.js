import { Queue } from "bullmq";
import redisClient from "../Redis/redisClient";

const queue = new Queue("sendEmail", { connection: redisClient });

const addToQueue = async (type, data) => {
  try {
    return await queue.add(type, data);
  } catch (error) {
    console.log(error);
  }
};

export default addToQueue;
