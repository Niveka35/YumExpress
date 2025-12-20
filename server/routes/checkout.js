const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/checkout", async (req, res) => {
  const { items, total, payment } = req.body;

  // send confirmation email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourgmail@gmail.com",
      pass: "app-password"
    }
  });

  let message = `
    Your order is confirmed!
    Total: Rs. ${total}
    Payment: ${payment}
    Pickup Only - We will email when ready.
  `;

  await transporter.sendMail({
    from: "yourgmail@gmail.com",
    to: "customer@gmail.com",
    subject: "Order Confirmation - Grocery Store",
    text: message
  });

  res.json({ success: true });
});

module.exports = router;
