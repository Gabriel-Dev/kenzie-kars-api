import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors/AppError";
import { announcementRoutes } from "./routers/announcement.routes";
import { usersRoutes } from "./routers/user.routes";
import { loginRoutes } from "./routers/login.routes";
import cors from "cors";
import { addressRoutes } from "./routers/address.routes";
import { imageRoutes } from "./routers/image.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import { commentsRoutes } from "./routers/comment.routes";

const app: Application = express();
app.use(express.json());

app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", usersRoutes);
app.use("/address", addressRoutes);
app.use("/login", loginRoutes);
app.use("/announcements", announcementRoutes);
app.use("/image", imageRoutes);
app.use("/comments", commentsRoutes);

app.use(handleErrors);

export default app;
