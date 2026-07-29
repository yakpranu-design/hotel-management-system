import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "firebase/firestore";

async function loadDashboard() {

    // Customers
    const customerSnapshot =
        await getDocs(collection(db, "customers"));

    document.getElementById("customerCount").textContent =
        customerSnapshot.size;

    // Menu
    const menuSnapshot =
        await getDocs(collection(db, "menu"));

    document.getElementById("menuCount").textContent =
        menuSnapshot.size;

    // Payments
    const paymentSnapshot =
        await getDocs(collection(db, "payments"));

    let totalCollection = 0;

    paymentSnapshot.forEach((doc) => {

        totalCollection += Number(doc.data().paid || 0);

    });

    document.getElementById("weeklyCollection").textContent =
        "₹" + totalCollection;

    // Pending
    let pending = 0;

    customerSnapshot.forEach((doc) => {

        pending += Number(doc.data().credit || 0);

    });

    document.getElementById("pendingAmount").textContent =
        "₹" + pending;

}

// Logout
function logout() {

    if (confirm("Logout?")) {

        localStorage.removeItem("login");

        location.href = "index.html";

    }

}

window.logout = logout;

loadDashboard();