// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBjxklT4lBI4pI-C3SYHadNYHUBwHpgOA8",
  authDomain: "portfolio-contact-cfd9b.firebaseapp.com",
  projectId: "portfolio-contact-cfd9b",
  storageBucket: "portfolio-contact-cfd9b.appspot.com",
  messagingSenderId: "146460560212",
  appId: "1:146460560212:web:16070c8f5059d718aa96c1"
};

// Init Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

// Resume Download (simple, no tracking)
document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("download-resume");
  const status = document.getElementById("download-status");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      window.open("assets/resume.pdf", "_blank");
      status.textContent = "✅ Download started!";
    });
  }
});

// Resume Upload (Admin only)
const uploadInput = document.getElementById("upload-resume");

if (uploadInput) {
  uploadInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const confirmUpload = confirm("Are you sure you want to replace the current resume?");
    if (!confirmUpload) return;

    const resumeRef = storage.ref("resume.pdf");

    try {
      await resumeRef.put(file);
      const newURL = await resumeRef.getDownloadURL();

      // Update iframe with new resume
      const iframe = document.querySelector(".resume-container iframe");
      iframe.src = newURL;

      document.getElementById("download-status").textContent = "✅ Resume updated!";
    } catch (err) {
      console.error("Upload failed:", err);
      document.getElementById("download-status").textContent = "❌ Upload failed.";
    }
  });
}

// === Admin Auth Logic ===
firebase.auth().onAuthStateChanged((user) => {
  const uploadField = document.querySelector(".admin-upload");
  const loginForm = document.getElementById("admin-login");
  const logoutArea = document.getElementById("logout-area");

  if (user) {
    console.log("✅ Logged in:", user.email);
    if (uploadField) uploadField.style.display = "block";
    if (loginForm) loginForm.style.display = "none";
    if (logoutArea) logoutArea.style.display = "block";
  } else {
    if (uploadField) uploadField.style.display = "none";
    if (loginForm) loginForm.style.display = "block";
    if (logoutArea) logoutArea.style.display = "none";
  }
});

// Login handler
document.getElementById("login-button")?.addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-password").value;

  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => alert("✅ Logged in!"))
    .catch(err => {
      alert("❌ Login failed. Check credentials.");
      console.error(err);
    });
});

// Logout handler
document.getElementById("logout-button")?.addEventListener("click", () => {
  firebase.auth().signOut().then(() => alert("👋 Logged out."));
});
