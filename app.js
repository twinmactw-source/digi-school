// 1. Import Firebase directly from the web (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// 2. Your Firebase Configuration (I pasted your exact keys here)
const firebaseConfig = {
  apiKey: "AIzaSyA0YrLjGNxq4AiaUgdkbPKB5K9I4vazn9w",
  authDomain: "digi-school-bfcd0.firebaseapp.com",
  projectId: "digi-school-bfcd0",
  storageBucket: "digi-school-bfcd0.firebasestorage.app",
  messagingSenderId: "555147927306",
  appId: "1:555147927306:web:4586112c5d651ad52524f3"
};

// 3. Initialize the App and Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Listen for the button click
document.getElementById("createBtn").addEventListener("click", async function() {
    
    // Get the text from the input boxes
    const name = document.getElementById("studentName").value;
    const rollNo = document.getElementById("rollNo").value;
    const className = document.getElementById("className").value;

    // Check if fields are empty
    if (!name || !rollNo || !className) {
        alert("Please fill out all fields!");
        return;
    }

    // Change button text so you know it's working
    const btn = document.getElementById("createBtn");
    btn.innerText = "Creating...";

    try {
        // A. Save the data to Firebase
        const docRef = await addDoc(collection(db, "students"), {
            name: name,
            roll_no: rollNo,
            class_section: className,
            created_at: new Date()
        });

        const studentId = docRef.id; 
        console.log("Success! Student ID is:", studentId);

        // B. Create the custom link for this specific student
        const baseUrl = window.location.href.replace("admin.html", "").replace("index.html", ""); 
        const studentLink = `${baseUrl}student.html?id=${studentId}`;

        // C. Generate the QR Code
        document.getElementById("qrcode").innerHTML = ""; 
        new QRCode(document.getElementById("qrcode"), {
            text: studentLink,
            width: 250,
            height: 250
        });

        alert("Student added successfully! QR Code generated.");

        // Clear the form
        document.getElementById("studentName").value = "";
        document.getElementById("rollNo").value = "";
        document.getElementById("className").value = "";

    } catch (error) {
        console.error("Error saving to database: ", error);
        alert("Error saving student! Check the console.");
    } finally {
        // Reset button text
        btn.innerText = "Create Student & Generate QR";
    }
});
