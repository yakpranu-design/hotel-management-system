import { db } from "./firebase.js";
import {
    collection,
    getDocs,
    query,
    where
} from "firebase/firestore";

let customerMobile = "";

async function loadCustomers() {

    const select = document.getElementById("customerSelect");

    select.innerHTML = '<option value="">Select Customer</option>';

    const snapshot = await getDocs(collection(db, "customers"));

    snapshot.forEach((customerDoc) => {

        const customer = customerDoc.data();

        select.innerHTML += `
        <option
            value="${customer.name}"
            data-id="${customerDoc.id}"
            data-mobile="${customer.mobile}">
            ${customer.name}
        </option>`;
    });

}


// Generate Weekly Bill
async function generateBill() {

   const customer = customerSelect.value;

if (!customer) {
    alert("Please select a customer");
    return;
}

const customerOption = customerSelect.options[customerSelect.selectedIndex];

const customerId = customerOption.dataset.id;

customerMobile = customerOption.dataset.mobile;

const q = query(
    collection(db, "dailyEntries"),
    where("customer", "==", customerId)
);
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {

        const data = doc.data();

        grandTotal += Number(data.total);

        tbody.innerHTML += `
        
        <tr>
            <td>${data.date}</td>
            <td>${data.breakfast} (${data.breakfastQty})</td>
            <td>${data.lunch} (${data.lunchQty})</td>
            <td>${data.dinner} (${data.dinnerQty})</td>
            <td>₹${data.total}</td>
        </tr>`;
    });

    document.getElementById("grandTotal").innerHTML = grandTotal;

    // Print Button
    document.getElementById("printBtn").onclick = () => {
        window.print();
    };

    // WhatsApp Button
    document.getElementById("whatsappBtn").onclick = () => {

        const msg =
`🏨 Sivasakthi Hotel

Customer : ${customer}

Weekly Total : ₹${grandTotal}

Thank You 🙏`;

        window.open(
            `https://wa.me/91${customerMobile}?text=${encodeURIComponent(msg)}`
        );

    };

}

window.generateBill = generateBill;

loadCustomers();
document
.getElementById("downloadPdfBtn")
.addEventListener("click", async () => {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    await pdf.html(document.querySelector(".login-box"), {

        callback: function (pdf) {

            pdf.save("Weekly_Bill.pdf");

        },

        x: 10,
        y: 10

    });

});