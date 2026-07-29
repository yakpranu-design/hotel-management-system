import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    where
} from "firebase/firestore";

let customerMobile = "";

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
                data-name="${customer.name}"
                data-mobile="${customer.mobile}">
                ${customer.name}
            </option>
        `;
    });

}

// Generate Weekly Bill
async function generateBill() {

    const customerSelect = document.getElementById("customerSelect");

    const customerId = customerSelect.value;

    if (!customerId) {
        alert("Please select a customer");
        return;
    }

    const customerOption =
        customerSelect.options[customerSelect.selectedIndex];

    const customerName = customerOption.dataset.name;

    customerMobile = customerOption.dataset.mobile;

    const tbody = document.getElementById("billBody");

    tbody.innerHTML = "";

    let grandTotal = 0;

    const q = query(
        collection(db, "dailyEntries"),
        where("customerId", "==", customerId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        alert("No entries found for this customer.");
        document.getElementById("grandTotal").textContent = "0";
        return;
    }

    snapshot.forEach((entryDoc) => {

        const data = entryDoc.data();

        grandTotal += Number(data.total || 0);

        tbody.innerHTML += `
        <tr>
            <td>${data.date}</td>
            <td>${data.breakfast} (${data.breakfastQty})</td>
            <td>${data.lunch} (${data.lunchQty})</td>
            <td>${data.dinner} (${data.dinnerQty})</td>
            <td>₹${data.total}</td>
        </tr>
        `;

    });

    document.getElementById("grandTotal").textContent = grandTotal;

}

// Generate Button
document
    .getElementById("generateBtn")
    .addEventListener("click", generateBill);

// Print
document
    .getElementById("printBtn")
    .addEventListener("click", () => {

        window.print();

    });

// WhatsApp
document
    .getElementById("whatsappBtn")
    .addEventListener("click", () => {

        const customerSelect =
            document.getElementById("customerSelect");

        const customerName =
            customerSelect.options[
                customerSelect.selectedIndex
            ].dataset.name;

        const grandTotal =
            document.getElementById("grandTotal").textContent;

        const msg =
`🏨 Sivasakthi Hotel

Customer : ${customerName}

Weekly Total : ₹${grandTotal}

Thank You 🙏`;

        window.open(
            `https://wa.me/91${customerMobile}?text=${encodeURIComponent(msg)}`,
            "_blank"
        );

    });

// PDF Download
document
    .getElementById("downloadPdfBtn")
    .addEventListener("click", async () => {

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF();

        await pdf.html(document.querySelector(".login-box"), {

            callback: function (pdf) {

                pdf.save("Weekly_Bill.pdf");

            }

        });

    });

// Load Customers
loadCustomers();