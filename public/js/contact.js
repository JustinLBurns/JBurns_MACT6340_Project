"use strict";

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const formData = new FormData(event.target);

    try {
        const response = await fetch("/mail", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log(result.message); 

        
        alert("Your message has been sent successfully!");
    } catch (error) {
        console.error("Error submitting the form:", error);
        alert("There was an error sending your message.");
    }
});
