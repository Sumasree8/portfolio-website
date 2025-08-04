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

const db = firebase.firestore();
const storage = firebase.storage();

// Download tracking
document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("download-resume");
  const downloadCountElement = document.getElementById("download-count");
  const status = document.getElementById("download-status");

  // Resume Download + Logging
  if (downloadBtn) {
    downloadBtn.addEventListener("click", async () => {
      try {
        // Log the download
        await db.collection("resumeDownloads").add({
          timestamp: new Date(),
          userAgent: navigator.userAgent
        });

        // Trigger download
        window.open("assets/resume.pdf", "_blank");
        status.textContent = "✅ Download started!";
      } catch (err) {
        console.error("❌ Download logging failed:", err);
        status.textContent = "❌ Couldn't log the download.";
      }
    });
  }

  // Fetch total count
  if (downloadCountElement) {
    db.collection("resumeDownloads")
      .get()
      .then(snapshot => {
        downloadCountElement.textContent = `📥 Total Resume Downloads: ${snapshot.size}`;
      })
      .catch(err => {
        console.error("❌ Couldn't fetch download count:", err);
        downloadCountElement.textContent = "⚠️ Error fetching count";
      });
  }
});

const uploadInput = document.getElementById("upload-resume");

// uplloading
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

        // Replace local iframe source with the new Firebase-hosted PDF
        const iframe = document.querySelector(".resume-container iframe");
        iframe.src = newURL;
        status.textContent = "✅ Resume updated!";
      } catch (err) {
        console.error("Upload failed:", err);
        status.textContent = "❌ Upload failed.";
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
    .then(() => {
      alert("✅ Logged in!");
    })
    .catch(err => {
      alert("❌ Login failed. Check credentials.");
      console.error(err);
    });
});

// Logout handler
document.getElementById("logout-button")?.addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    alert("👋 Logged out.");
  });
});

