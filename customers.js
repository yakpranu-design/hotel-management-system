import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
} from "firebase/firestore";

const tbody = document.getElementById("customerBody");

async function loadCustomers() {

    tbody.innerHTML = "";

    const snapshot = await getDocs(collection(db, "customers"));
    console.log("Customers:", snapshot.size);

snapshot.forEach((customerDoc) => {
    console.log(customerDoc.id);
    console.log(customerDoc.data());
});

    snapshot.forEach((customerDoc) => {

        const customer = customerDoc.data();

        tbody.innerHTML += `
        <tr>

            <td>${customer.name}</td>

            <td>${customer.mobile}</td>

            <td>${customer.address}</td>

            <td>${customer.salaryType}</td>

            <td>
                <button onclick="editCustomer(
                    '${customerDoc.id}',
                    '${customer.name}',
                    '${customer.mobile}',
                    '${customer.address}',
                    '${customer.salaryType}'
                )">
                    ✏️
                </button>
            </td>

            <td>
                <button onclick="deleteCustomer('${customerDoc.id}')">
                    🗑️
                </button>
            </td>

        </tr>
        `;
    });

}

function searchCustomer() {

    const value = document
        .getElementById("searchCustomer")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#customerBody tr");

    rows.forEach((row) => {

        row.style.display =
            row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

    });

}

async function editCustomer(id, name, mobile, address, salaryType) {

    const newName = prompt("Customer Name", name);
    if (newName === null) return;

    const newMobile = prompt("Mobile", mobile);
    if (newMobile === null) return;

    const newAddress = prompt("Address", address);
    if (newAddress === null) return;

    const newSalary = prompt("Salary Type", salaryType);
    if (newSalary === null) return;

    await updateDoc(doc(db, "customers", id), {

        name: newName,
        mobile: newMobile,
        address: newAddress,
        salaryType: newSalary

    });

    alert("✅ Customer Updated");

    loadCustomers();

}

async function deleteCustomer(id) {

    if (!confirm("Delete this customer?")) return;

    await deleteDoc(doc(db, "customers", id));

    alert("🗑️ Customer Deleted");

    loadCustomers();

}

window.searchCustomer = searchCustomer;
window.editCustomer = editCustomer;
window.deleteCustomer = deleteCustomer;

loadCustomers();