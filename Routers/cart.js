// import express from "express";
// import cors from "cors";

// const MONGO_URL = "mongodb://localhost";
// const app = express();

// app.use(express.json());
// app.use(cors());

// async function connectMongoDb() {
//   const client = new MongoClient(MONGO_URL);
//   await client.connect();
//   console.log("MogoDB connected...");
//   return client;
// }

// const client = await connectMongoDb();

// app.get("/", (req, res) => {
//   res.send("hello World !!");
// });

// app.get("/mobiles", async (req, res) => {
//   const mobiles = await client
//     .db("ecomdemo")
//     .collection("mobiles")
//     .find()
//     .toArray();
//   res.send(mobiles);
// });

// app.post("/mobiles", async (req, res) => {
//   const mobiles = req.body;
//   console.log(mobiles);
//   const result = await client
//     .db("ecomdemo")
//     .collection("mobiles")
//     .insertMany(mobiles);
//   res.send(result);
// });

// app.get("/cart", async (req, res) => {
//   const mobiles = await client
//     .db("ecomdemo")
//     .collection("cart")
//     .find()
//     .toArray();
//   res.send(mobiles);
// });

// app.put("/cart", async (req, res) => {
//   const mobile = req.body;
//   const { type } = req.query;

//   const itemExist = await client
//     .db("ecomdemo")
//     .collection("cart")
//     .findOne({ _id: mobile._id });

//   if (itemExist) {
//     if (type === "decrement" && itemExist.qty <= 1) {
//       const result = await client
//         .db("ecomdemo")
//         .collection("cart")
//         .deleteOne({ _id: mobile._id });
//       res.send(result);
//     } else {
//       const result = await client
//         .db("ecomdemo")
//         .collection("cart")
//         .updateOne(
//           { _id: mobile._id },
//           { $inc: { qty: type === "increment" ? +1 : -1 } }
//         );
//       res.send(result);
//     }
//   } else {
//     const result = await client
//       .db("ecomdemo")
//       .collection("cart")
//       .insertOne({ ...mobile, qty: 1 });
//     res.send(result);
//   }
// });

// app.listen(9000, () => console.log("..server is connected"));