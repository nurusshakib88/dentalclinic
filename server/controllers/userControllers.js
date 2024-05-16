// controllers/userControllers.js
const UserModel = require("../model/User");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.json({ token: token, userId: user._id });
        } else {
          res.status(401).json("Unauthorized: The password is incorrect");
        }
      } else {
        res.status(404).json("Not Found: No record existed");
      }
    })
    .catch((err) => {
      res.status(500).json("Internal Server Error");
    });
};

exports.register = (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

exports.logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

exports.getAllUsers = (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  UserModel.findByIdAndDelete(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getUserInfo = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const userId = decoded.userId;
    UserModel.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal server error" });
      });
  });
};


exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  UserModel.findByIdAndUpdate(userId, updateData, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

