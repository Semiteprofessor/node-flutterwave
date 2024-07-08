const express = require("express");
const paymentRoutes = require("./routes/pay");

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.use("/api/pay", paymentRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
