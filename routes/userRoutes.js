const userRoutes = require("express").Router();
const {
  dashboard,
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  reqError,
  login,
  ubahRoleUser,
  searchUser,
  reqPasswordReset,
  resetPassword,
} = require("../controller/userController");
const { verifyToken, verifyRole1 } = require("../middleware/auth");

userRoutes.post("/login", login);

userRoutes.get("/dashboard", verifyToken,dashboard);
userRoutes.get("/users", getAllUsers);
userRoutes.get("/searchUser", verifyToken, searchUser);
userRoutes.get("/users/:id", verifyToken, getUserById);
userRoutes.post("/tambahUser", addUser);
userRoutes.delete("/hapusUser/:id", verifyToken, verifyRole1, deleteUser);
userRoutes.put("/ubahRoleUser/:id", ubahRoleUser);
userRoutes.post("/req-reset-password", reqPasswordReset);

userRoutes.post("/change-password/:id/:token", resetPassword);

module.exports = userRoutes;
