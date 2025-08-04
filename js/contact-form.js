// Firebase config (add your actual config here)
const firebaseConfig = {
  apiKey: "AIzaSyBjxklT4lBI4pI-C3SYHadNYHUBwHpgOA8",
  authDomain: "portfolio-contact-cfd9b.firebaseapp.com",
  projectId: "portfolio-contact-cfd9b",
  storageBucket: "portfolio-contact-cfd9b.firebaseapp.com",
  messagingSenderId: "146460560212",
  appId: "1:146460560212:web:16070c8f5059d718aa96c1"
};

// Prevent duplicate init
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();

// Contact form handler
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const statusMessage = document.getElementById("statusMessage");

  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
      await db.collection("messages").add({
        name,
        email,
        message,
        timestamp: new Date()
      });
      statusMessage.textContent = "✅ Message sent!";
      contactForm.reset();
    } catch (err) {
      console.error("Firestore error:", err);
      statusMessage.textContent = "❌ Could not send message.";
    }
  });
});
