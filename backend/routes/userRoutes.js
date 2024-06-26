// routes/user.js
const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  subscribeNewsletter, // New import
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Genel kullanıcı işlemleri ve admin kontrolü
router
  .route("/")
  .get(protect, getUsers) // Sadece adminler tüm kullanıcıları görebilir
  .post(registerUser); // Herkes kayıt olabilir, admin kontrolü burada yapılmasın

// Kullanıcı girişi için ayrı bir rota
router.post("/login", loginUser); // Herkes giriş yapabilir

// ID ile spesifik kullanıcı işlemleri, koruma altında
router
  .route("/:id")
  .get(protect, getUserById) // Sadece adminler belirli bir kullanıcıyı görebilir
  .put(protect, updateUser) // Sadece adminler kullanıcı güncelleyebilir
  .delete(protect, deleteUser); // Sadece adminler kullanıcı silebilir

// Newsletter subscription route
router.post("/subscribe", protect, subscribeNewsletter); // New route

module.exports = router;
