import { UserService } from "../services/user.service";
import { UserController } from "../conttrollers/user.controller";
import { Router } from "express";
import { adminMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/users/", userController.getUser.bind(userController));
router.get("/check/", userController.check.bind(userController));
router.get("/users/:id", userController.getUser.bind(userController));
router.get("/users-with-profiles", adminMiddleware, userController.getAllUsersWithProfiles.bind(userController));
router.get("/admin/users", adminMiddleware, userController.getAllUsersWithProfiles.bind(userController));
router.post("/users/", adminMiddleware, userController.addUser.bind(userController));
router.put("/users/:id", adminMiddleware, userController.updateUser.bind(userController));
router.delete("/users/:id", adminMiddleware, userController.deleteUser.bind(userController));

export default router;
