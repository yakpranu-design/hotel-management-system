import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "firebase/firestore";

async function loadReport() {

    const tbody = document.getElementById("reportBody");

    tbody.innerHTML = "";

    let grandTotal = 0;

    const snapshot = await getDocs(collection(db, "dailyEntries"));

    snapshot.forEach((entryDoc) => {

        const data = entryDoc.data();

        grandTotal += Number(data.total || 0);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${data.customerName}</td>
            <td>${data.date}</td>
            <td>₹${data.total}</td>
            <td>${data.paymentStatus}</td>
        `;

        tbody.appendChild(row);

    });

    document.getElementById("monthlyTotal").textContent = grandTotal;

}

document
    .getElementById("loadReportBtn")
    .addEventListener("click", loadReport);