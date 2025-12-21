const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, items, total } = req.body;

  try {
    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "k.niveka03@gmail.com",
        pass: "cxqs royz jegt zsio" // use app password if 2FA enabled
      }
    });

    const itemList = items.map(i => `${i.name} x ${i.qty} = Rs.${i.total}`).join("\n");

    const mailOptions = {
      from: "k.niveka03@gmail.com",
      to: email,
      subject: "Order Confirmation - Niveka Store",
      text: `Thank you for your order!\n\nItems:\n${itemList}\n\nTotal: Rs.${total}\n\nPickup at the store.`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Order placed and email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email" });
  }
});

module.exports = router;
