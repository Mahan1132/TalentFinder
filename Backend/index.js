//index is entry point for app (Initialization)
import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const port = 3000;

const uri =
  "mongodb+srv://Mahan:mahan123@cluster0.0ta0gpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

//Routes
app.get("/", (_req, res) => {
  res.send("This is the Homepage.");
});

//Starting the server into a port
app.listen(port, () => {
  console.log(`Server Started at PORT: ${port}`);
});

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);
