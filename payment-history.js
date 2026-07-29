import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "firebase/firestore";

async function loadPayments() {

    const tbody = document.getElementById("paymentBody");

    tbody.innerHTML = "";

    const snapshot = await getDocs(collection(db, "payments"));

    snapshot.forEach((paymentDoc) => {

        const payment = paymentDoc.data();

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${payment.customerName}</td>
            <td>${payment.date}</td>
            <td>₹${payment.total}</td>
            <td>₹${payment.paid}</td>
            <td>₹${payment.balance}</td>
        `;

        tbody.appendChild(row);

    });

}

loadPayments();