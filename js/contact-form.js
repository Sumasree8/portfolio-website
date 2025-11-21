// ====== Contact Form JS ======

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjxklT4lBI4pI-C3SYHadNYHUBwHpgOA8",
  authDomain: "portfolio-contact-cfd9b.firebaseapp.com",
  projectId: "portfolio-contact-cfd9b",
  storageBucket: "portfolio-contact-cfd9b.appspot.com",
  messagingSenderId: "146460560212",
  appId: "1:146460560212:web:16070c8f5059d718aa96c1"
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

// Firestore reference
const db = firebase.firestore();

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const statusMessage = document.getElementById("statusMessage");

  // Submit event listener
  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      statusMessage.textContent = "❌ Please fill in all fields.";
      return;
    }

    try {
      // Save message to Firestore (collection: "contacts")
      await db.collection("contacts").add({
        name,
        email,
        message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      statusMessage.textContent = "✅ Message sent!";
      contactForm.reset();
    } catch (err) {
      console.error("Firestore error:", err);
      statusMessage.textContent = "❌ Could not send message.";
    }
  });
});
