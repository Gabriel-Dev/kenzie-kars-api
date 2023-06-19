import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors/AppError";
import { announcementRoutes } from "./routers/announcement.routes";
import { usersRoutes } from "./routers/user.routes";
import { loginRoutes } from "./routers/login.routes";
import cors from "cors";
import { addressRoutes } from "./routers/address.routes";
import { imageRoutes } from "./routers/image.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/users/:id/address", addressRoutes);
app.use("/login", loginRoutes);
app.use("/announcements", announcementRoutes);
app.use('/announcements/:id/image', imageRoutes);

app.use(handleErrors);

export default app;
