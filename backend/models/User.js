const db = require("../config/db");

class User {
  static async create(firstName, lastName, email, hashedPassword) {
    const [result] = await db.query(
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  static async saveResetToken(email, token, expiry) {
    await db.query(
      "UPDATE users SET resetToken=?, resetTokenExpiry=? WHERE email=?",
      [token, expiry, email]
    );
  }

  static async findByToken(token) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE resetToken=? AND resetTokenExpiry > NOW()",
      [token]
    );
    return rows[0];
  }

  static async updatePassword(id, hashedPassword) {
    await db.query(
      "UPDATE users SET password=?, resetToken=NULL, resetTokenExpiry=NULL WHERE id=?",
      [hashedPassword, id]
    );
  }
}

module.exports = User;
