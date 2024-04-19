import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification,signInWithEmailAndPassword,sendPasswordResetEmail,signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

    // Your Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyC5YDUU2TAwLbg0YOAOg-FsLgc67VD6aH8",
        authDomain: "e-waste-locator-3442a.firebaseapp.com",
        databaseURL: "https://e-waste-locator-3442a-default-rtdb.firebaseio.com/",
        projectId: "e-waste-locator-3442a",
        storageBucket: "e-waste-locator-3442a.appspot.com",
        messagingSenderId: "405875878189",
        appId: "1:405875878189:web:e232daffdfeac723c8cba4",
        measurementId: "G-7J0Q6M70BT"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getDatabase();  
    
    
    // Add event listener to signupSubmit button
    document.getElementById("signupSubmit").addEventListener("click", function (event) {
        event.preventDefault();
        var email = document.getElementById("signupEmail").value;
        var password = document.getElementById("signupPassword").value;
        var username = document.getElementById("username").value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        set(ref(db, 'users/' + userCredential.user.uid), {
                            email: email,
                            username: username
                        }).then(() => {
                            console.log("User data stored successfully.");
                            alert("Verification email sent. Please verify your email to complete registration.");
                            window.location.href = "index.html";
                        }).catch((error) => {
                            console.error("Error storing user data:", error.message);
                            alert("Error storing user data: " + error.message);
                        });
                    })
                    .catch((error) => {
                        console.error("Error sending verification email:", error.message);
                        alert("Error sending verification email: " + error.message);
                    });
            })
            .catch((error) => {
                console.error("Registration error:", error.message);
                alert("Registration error: " + error.message);
            });
    });

    document.getElementById("loginSubmit").addEventListener("click", function (event) {
        event.preventDefault();
        var email = document.getElementById("loginUsername").value;
        var password = document.getElementById("loginPassword").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert("Login successfully!!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                alert(errorMessage);
            });
    });
    document.getElementById("forgotPassword").addEventListener("click", function (event) {
        event.preventDefault();
        var email = document.getElementById("loginUsername").value;
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Password reset email sent. Please check your inbox.");
                })
                .catch((error) => {
                    console.error(error);
                    alert("Error sending password reset email. Please try again later.");
                });
        } else {
            alert("Please enter your email address.");
        }
    });

    // logging out
    // logging in and out
    document.querySelector('.logout').addEventListener('click', () => {
        auth.signOut()
            .then(() => {
                console.log('User signed out');
            })
            .catch((error) => {
                console.log(error.message);
            });
    });

    console.log()