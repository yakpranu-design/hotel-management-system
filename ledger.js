import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc
} from "firebase/firestore";

// Load Customers
async function loadCustomers() {

    const select = document.getElementById("customerSelect");

    select.innerHTML = `<option value="">Select Customer</option>`;

    const snapshot = await getDocs(collection(db, "customers"));

    snapshot.forEach((customerDoc) => {

        const customer = customerDoc.data();

        select.innerHTML += `
            <option value="${customerDoc.id}">
                ${customer.name}
            </option>
        `;
    });

}

// Load Ledger
async function loadLedger() {

    const customerId =
        document.getElementById("customerSelect").value;

    if (!customerId) {
        alert("Please Select Customer");
        return;
    }

    const tbody =
        document.getElementById("ledgerBody");

    tbody.innerHTML = "";

    // Daily Entries
    const dailyQuery = query(
        collection(db, "dailyEntries"),
        where("customerId", "==", customerId)
    );

    const dailySnapshot = await getDocs(dailyQuery);

    dailySnapshot.forEach((entryDoc) => {

        const data = entryDoc.data();

        tbody.innerHTML += `
        <tr>

            <td>${data.date}</td>

            <td>Food Bill</td>

            <td style="color:red;">
                +₹${data.total}
            </td>

            <td>-</td>

        </tr>
        `;
    });

    // Payments
    const paymentQuery = query(
        collection(db, "payments"),
        where("customerId", "==", customerId)
    );

    const paymentSnapshot = await getDocs(paymentQuery);

    paymentSnapshot.forEach((paymentDoc) => {

        const payment = paymentDoc.data();

        tbody.innerHTML += `
        <tr>

            <td>${payment.date}</td>

            <td>Payment</td>

            <td style="color:green;">
                -₹${payment.paid}
            </td>

            <td>₹${payment.balance}</td>

        </tr>
        `;
    });

    // Current Balance
    const customerRef = doc(db, "customers", customerId);

    const customerDoc = await getDoc(customerRef);

    document.getElementById("currentBalance").textContent =
        customerDoc.data().credit || 0;

}

document
.getElementById("loadLedgerBtn")
.addEventListener("click", loadLedger);

loadCustomers();