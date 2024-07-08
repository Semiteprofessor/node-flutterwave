require("dotenv").config();
const axios = require("axios");

const payWithFlutterwave = async (req, res) => {
  const { amount, email, phonenumber, name } = req.body;

  if (!email || !amount) {
    return res.status(400).json({ error: "Email and amount are required" });
  }

  const payload = {
    tx_ref: `tx-${Date.now()}`,
    amount,
    currency: "NGN",
    redirect_url: "http://localhost:3000/verify",
    payment_options: "card",
    customer: {
      email,
      phonenumber,
      name,
    },
    customizations: {
      title: "Pied Piper Payments",
      description: "Middleout isn't free. Pay the price",
      logo: "https://assets.piedpiper.com/logo.png",
    },
  };

  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { transaction_id } = req.query;

  if (!transaction_id) {
    return res.status(400).json({ error: "Transaction ID is required" });
  }

  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  payWithFlutterwave,
  verifyPayment,
};
