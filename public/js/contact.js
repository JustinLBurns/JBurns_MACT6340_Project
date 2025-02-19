"use strict";

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()); // Convert formData to JSON

    try {
        const response = await fetch("/mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Specify JSON
            body: JSON.stringify(data) // Convert data to JSON
        });

        const result = await response.json();
        console.log(result.message); 

        if (response.ok) {
            alert("Your message has been sent successfully!");
            event.target.reset(); // Clear the form
        } else {
            alert("Error: " + result.error);
        }
    } catch (error) {
        console.error("Error submitting the form:", error);
        alert("There was an error sending your message.");
    }
});
