import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use PORT from .env or fallback to 3000

app.use(express.static("public")); // Serve static files
app.use(express.urlencoded({ extended: true })); // Body parsing for forms
app.use(express.json());

app.post("/mail", (req, res) => {
  console.log("Mail button clicked");
  console.log("Form Data:", req.body);
  res.json({ message: "Form submitted successfully!" });
});

app.listen(port, () => {
  console.log(process.env.SENSITIVE_INFO);
  console.log(`Example app listening on port ${port}`);
});


