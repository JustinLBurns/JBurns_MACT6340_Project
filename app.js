import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine and define the views directory
app.set("view engine", "ejs");
app.set("views", "public/views");

// Middleware to serve static files (CSS, images, JS, etc.)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.render("index", { page: "home" }); // ✅ Pass 'page' variable
});

app.get("/about", (req, res) => {
    res.render("about", { page: "about" });
});

app.get("/contact", (req, res) => {
    res.render("contact", { page: "contact" });
});

// Route to send emails
app.post("/mail", async (req, res) => {
    console.log("Mail button clicked");
    console.log("Form Data:", req.body);

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        let transporter = nodemailer.createTransport({
            host: process.env.GMAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_SECURE === "true", // Ensure it's a boolean comparison
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });

        let mailOptions = {
            from: process.env.MESSAGE_FROM,
            to: process.env.MESSAGE_TO,
            subject: `Contact Form: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // ✅ FIXED: Correctly assigning text
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
