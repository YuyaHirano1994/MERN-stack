const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const auth = require("./utils/auth");
const cors = require("cors");
app.use(cors());
const connectDB = require("./utils/database");
const { ItemModel, UserModel } = require("./utils/schemaModels");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ITEM functions
// Create Item
app.post("/item/create", auth, async (req, res) => {
  try {
    await connectDB();
    await ItemModel.create(req.body);
    return res.status(200).json({ message: "Create SUCCESS!!" });
  } catch (error) {
    return res.status(400).json({ message: "Failed create Item..." });
  }
});

// Read All Items
app.get("/", async (req, res) => {
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return res.status(200).json({ message: "Loaded All Items", allItems: allItems });
  } catch (error) {
    return res.status(400).json({ message: "Failed load Items..." });
  }
});

// Read SIngle Item
app.get("/item/:id", async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    return res.status(200).json({ message: "Loaded Item", singleItem: singleItem });
  } catch (error) {
    return res.status(400).json({ message: "Failed load Item..." });
  }
});
// Update Item
app.put("/item/update/:id", auth, async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    if (singleItem === req.body.email) {
      await ItemModel.updateOne({ _id: req.params.id }, req.body);
      return res.status(200).json({ message: "Success Edit Item" });
    } else {
      throw new Error();
    }
  } catch (error) {
    return res.status(400).json({ message: "Failed Edit Item..." });
  }
});
// Delete Item
app.delete("/item/delete/:id", auth, async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    if (singleItem === req.body.email) {
      await ItemModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({ message: "Delete Item Success" });
    } else {
      throw new Error();
    }
  } catch (error) {
    return res.status(400).json({ message: "Failed Delete Item..." });
  }
});

// USER functions
// Register User
app.post("/user/register", async (req, res) => {
  try {
    await connectDB();
    await UserModel.create(req.body);
    return res.status(200).json({ message: "Create User SUCCESS!!" });
  } catch (error) {
    return res.status(400).json({ message: "Failed create Item..." });
  }
});
// Login User
const secret_key = "mern-stack";
app.post("/user/login", async (req, res) => {
  try {
    await connectDB();
    const saveUserData = await UserModel.findOne({ email: req.body.email });
    if (saveUserData) {
      if (req.body.password === saveUserData.password) {
        const payload = {
          email: req.body.email,
        };
        const token = jwt.sign(payload, secret_key, { expiresIn: "23h" });
        console.log(`token: ${token}`);
        return res.status(200).json({ message: "Login User SUCCESS!!" });
      } else {
        return res.status(400).json({ message: "Password is incorrect" });
      }
    } else {
      return res.status(400).json({ message: "Cannot find User" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Login User Failed!!" });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening on localhost port 5000");
});
