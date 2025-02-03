import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));


app.post("/mail", (req, res) => {
  console.log("Mail button clicked");

  
  console.log("Form Data:", req.body);

  
  res.json({ message: "Form submitted successfully!" });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
