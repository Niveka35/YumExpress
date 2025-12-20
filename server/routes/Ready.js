router.post("/order-ready", async (req, res) => {
  await transporter.sendMail({
    from: "yourgmail@gmail.com",
    to: "customer@gmail.com",
    subject: "Your Order Is Ready for Pickup",
    text: "Your grocery order is now ready. You can pick it up anytime!"
  });

  res.json({ success: true });
});
