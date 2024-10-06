import express from "express";
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3123, () => console.log("Server ready on port 3123."));

export default app;