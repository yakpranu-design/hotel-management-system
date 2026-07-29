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

    snapshot.forEach((doc) => {

        const data = doc.data();

        grandTotal += Number(data.total || 0);

        tbody.innerHTML += `
        <tr>

            <td>${data.customerName}</td>

            <td>${data.date}</td>

            <td>₹${data.total}</td>

        </tr>
        `;

    });

    document.getElementById("grandTotal").textContent =
        grandTotal;

}

document
.getElementById("loadReportBtn")
.addEventListener("click", loadReport);