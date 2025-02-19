import express from "express";
import dotenv from "dotenv";
import { sendMessage } from "./utils.js"; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000

app.use(express.static("public")); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); //

app.post("/mail", async (req, res) => {
  console.log("Mail button clicked");
  console.log("Form Data:", req.body);

  const { subject, text } = req.body;

  if (!subject || !text) {
    return res.status(400).json({ error: "Subject and message text are required." });
  }

  try {
    await sendMessage(subject, text);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



