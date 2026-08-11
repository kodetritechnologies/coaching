import express from "express";
import "dotenv/config";
import useragent from "express-useragent";
import "./DATABASE.js";
// import "./Redis/redisClient.js";
// import "./Jobs/worker.js";
const app = express();
const PORT = process.env.PORT || 5000;
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dashBoardRouter from "./routers/dashboard/dashboard.router.js";
import usersRouter from "./routers/authentications/users.router.js";
import ConfigurationRouter from "./routers/configuration/setting.master.router.js";
import CmsRouter from "./routers/cms/cms.router.js";
import EcommerceRouter from "./routers/ecommerce/ecommerce.router.js";
import DashboardlogsRouter from "./routers/dashbordlogs/dashboardlogs.router.js";
import SupportTicketRouter from "./routers/support/supportTicket.router.js";

// Frontend
import PublicEcommerceRouter from "./routers/ecommerce/frontendEcommerce.router.js";
import PublicCmsRouter from "./routers/cms/frontendCms.router.js";
import SupportRouter from "./routers/support/frontendSupportTicket.router.js";
import PublicConfigurationRouter from "./routers/configuration/frontend.setting.master.router.js";

// import  cronStart from "./cron/index.js";
// cronStart()

app.use(useragent.express());
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// setup ejs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const corsOptions = {
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  methods: "GET,POST,PATCH,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static("public"));

app.get("/api", (req, res) => {
  res.send(`${process.env.APP_NAME} api is running...`);
});

// DashBoard
app.use("/api/dashboard", dashBoardRouter);

// Admin
app.use("/api/users", usersRouter);
app.use("/api/configuration", ConfigurationRouter);
app.use("/api/cms", CmsRouter);
app.use("/api/ecommerce", EcommerceRouter);
app.use("/api/dashboardlogs", DashboardlogsRouter);
app.use("/api/support", SupportTicketRouter);

// Frontend
app.use("/api/public/ecommerce", PublicEcommerceRouter);
app.use("/api/public/cms", PublicCmsRouter);
app.use("/api/public/support", SupportRouter);
app.use("/api/public/configuration", PublicConfigurationRouter);

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} server is running on port ${PORT}`);
});
