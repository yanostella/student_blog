import { Router } from "express";
import postRoutes from "../../modules/post/router/postRoutes";
import userRoutes from "../../modules/user/router/userRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/posts", postRoutes);

export default routes;