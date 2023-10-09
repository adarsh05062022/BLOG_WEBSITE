const createConnection = require("../../database");
const jwt = require("jsonwebtoken");
const secret_key = "anmol";
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const connection = await createConnection();

    const [UsernameAlreadyExist] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (UsernameAlreadyExist.length > 0) {
      res.json({ message: "Username already exists" });
    } else {
      const [EmailAlreadyExist] = await connection.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (EmailAlreadyExist.length > 0) {
        res.json({ message: "Email already exists" });
      } else {
        const hasedPassword = await bcrypt.hash(password, 10);

        const [result] = await connection.execute(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [username, email, hasedPassword]
        );

        await connection.end();
        if (result.affectedRows === 1) {
          res.status(201).json({ message: "user added successfully" });
        } else {
          res.status(500).json({ message: "Failed to register" });
        }
      }
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const connection = await createConnection();

    let [result] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    await connection.end();

    result = result[0];

    if (!result) {
      res.status(500).json({ message: "email is not exist" });
    } else {
      const matchPassword = await bcrypt.compare(password, result.password);
      if (matchPassword) {
        const token = jwt.sign({ id: result.user_id }, secret_key, {
          expiresIn: "1d",
        });
        const { password, ...other } = result;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({ message: "login successful" });
      } else {
        res.status(400).json({ message: "password mismatch" });
      }
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const change = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const connection = await createConnection();

  console.log(email, password, confirmPassword);

  try {
    if (password === confirmPassword) {
      const [data] = await connection.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (!data) {
        res.json({ message: "email isn't exist" });
      } else {
        const sql = "UPDATE users SET password = ? WHERE email = ?";
        const values = [password, email];

        const [result] = await connection.execute(sql, values);

        await connection.end();
        if (result.affectedRows > 0) {
          res.json({ message: "User updated successfully" });
        } else {
          res.json({ message: "unsuccesfull" });
        }
      }
    } else {
      res.status(400).json({ message: "passwords mismatch" });
    }
  } catch (error) {}
};


const logout = async (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ message: "you are logged out" });
};

module.exports = { login, register, change, logout };
