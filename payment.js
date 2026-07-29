import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";

let totalBill = 0;

// Load Customers
async function loadCustomers() {

    const select = document.getElementById("customerSelect");

    select.innerHTML = `<option value="">Select Customer</option>`;

    const snapshot = await getDocs(collection(db, "customers"));

    snapshot.forEach((customerDoc) => {

        const customer = customerDoc.data();

        select.innerHTML += `
            <option
                value="${customerDoc.id}"
                data-name="${customer.name}">
                ${customer.name}
            </option>
        `;
    });

}

// Calculate Bill
async function calculateBill() {

    const customerId =
        document.getElementById("customerSelect").value;

    if (!customerId) {
        alert("Select Customer");
        return;
    }

    const customerRef = doc(db, "customers", customerId);

    const customerDoc = await getDoc(customerRef);

    totalBill = customerDoc.data().credit || 0;

    document.getElementById("totalAmount").textContent = totalBill;

    calculateBalance();

}

// Balance
function calculateBalance() {

    const paid =
        Number(document.getElementById("paidAmount").value || 0);

    document.getElementById("balanceAmount").textContent =
        totalBill - paid;

}

// Save Payment
async function savePayment() {

    const select = document.getElementById("customerSelect");

    if (!select.value) {
        alert("Please select a customer");
        return;
    }

    const customerId = select.value;

    const customerName =
        select.options[select.selectedIndex].dataset.name;

    const paid =
        Number(document.getElementById("paidAmount").value || 0);

    const balance = totalBill - paid;

    await addDoc(collection(db, "payments"), {

        customerId,
        customerName,

        total: totalBill,

        paid,

        balance,

        date: new Date().toLocaleDateString()

    });
    const customerRef = doc(db, "customers", customerId);

await updateDoc(customerRef, {
    credit: balance
});

    alert("✅ Payment Saved");

    document.getElementById("paidAmount").value = "";

    document.getElementById("balanceAmount").textContent = "0";

}

// Events
document
    .getElementById("calculateBtn")
    .addEventListener("click", calculateBill);

document
    .getElementById("paidAmount")
    .addEventListener("input", calculateBalance);

document
    .getElementById("saveBtn")
    .addEventListener("click", savePayment);

// Load
loadCustomers();