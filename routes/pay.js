const express = require("express");
const { payWithFlutterwave, verifyPayment } = require("../controller/pay");
const router = express.Router();

router.post("/payment", payWithFlutterwave);
router.get("/verify", verifyPayment);

module.exports = router;
