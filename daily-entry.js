import { db } from "./firebase.js";

console.log("NEW DAILY ENTRY JS LOADED");

import {
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";
let menuItems = [];
let customers = [];

// Load Customers
async function loadCustomers() {

    const customerSelect = document.getElementById("customer");

    customerSelect.innerHTML =
        `<option value="">Select Customer</option>`;

    const snapshot = await getDocs(collection(db, "customers"));

    snapshot.forEach((customerDoc) => {

        const customer = customerDoc.data();

        customers.push({
            id: customerDoc.id,
            name: customer.name
        });

        customerSelect.innerHTML += `
            <option value="${customerDoc.id}">
                ${customer.name}
            </option>
        `;
    });

}

// Load Menu
async function loadMenu() {

    const breakfast = document.getElementById("breakfastMenu");
    const lunch = document.getElementById("lunchMenu");
    const dinner = document.getElementById("dinnerMenu");

    breakfast.innerHTML = `<option value="">Select Item</option>`;
    lunch.innerHTML = `<option value="">Select Item</option>`;
    dinner.innerHTML = `<option value="">Select Item</option>`;

    const snapshot = await getDocs(collection(db, "menu"));

    snapshot.forEach((menuDoc) => {

        const item = menuDoc.data();

        menuItems.push(item);

        const option = `
            <option value="${item.itemName}">
                ${item.itemName} - ₹${item.price}
            </option>
        `;

        if (item.category === "Breakfast")
            breakfast.innerHTML += option;

        if (item.category === "Lunch")
            lunch.innerHTML += option;

        if (item.category === "Dinner")
            dinner.innerHTML += option;

    });

}

// Price
function getPrice(itemName) {

    const item = menuItems.find(m => m.itemName === itemName);

    return item ? Number(item.price) : 0;

}

// Calculate Total
function calculateTotal() {

    const total =

        getPrice(document.getElementById("breakfastMenu").value) *
        Number(document.getElementById("breakfastQty").value)

        +

        getPrice(document.getElementById("lunchMenu").value) *
        Number(document.getElementById("lunchQty").value)

        +

        getPrice(document.getElementById("dinnerMenu").value) *
        Number(document.getElementById("dinnerQty").value);

    document.getElementById("todayTotal").textContent = total;

}

// Save Entry
async function saveEntry() {

    const customerId =
        document.getElementById("customer").value;

    if (!customerId) {
        alert("Select Customer");
        return;
    }

    const customer =
        customers.find(c => c.id === customerId);

    await addDoc(collection(db, "dailyEntries"), {

        customerId: customer.id,
        customerName: customer.name,

        breakfast:
            document.getElementById("breakfastMenu").value,

        breakfastQty:
            Number(document.getElementById("breakfastQty").value),

        lunch:
            document.getElementById("lunchMenu").value,

        lunchQty:
            Number(document.getElementById("lunchQty").value),

        dinner:
            document.getElementById("dinnerMenu").value,

        dinnerQty:
            Number(document.getElementById("dinnerQty").value),

        total:
            Number(document.getElementById("todayTotal").textContent),

        paymentStatus: "Pending",

        date: new Date().toLocaleDateString()

    });
const customerRef = doc(db, "customers", customerId);

const customerDoc = await getDoc(customerRef);

const oldCredit = customerDoc.data().credit || 0;

await updateDoc(customerRef, {
    credit: oldCredit + Number(document.getElementById("todayTotal").textContent)
});
    alert("✅ Daily Entry Saved");

    document.getElementById("customer").value = "";

    document.getElementById("breakfastMenu").value = "";
    document.getElementById("breakfastQty").value = 0;

    document.getElementById("lunchMenu").value = "";
    document.getElementById("lunchQty").value = 0;

    document.getElementById("dinnerMenu").value = "";
    document.getElementById("dinnerQty").value = 0;

    document.getElementById("todayTotal").textContent = "0";

}

// Events
document.getElementById("breakfastMenu").addEventListener("change", calculateTotal);
document.getElementById("lunchMenu").addEventListener("change", calculateTotal);
document.getElementById("dinnerMenu").addEventListener("change", calculateTotal);

document.getElementById("breakfastQty").addEventListener("input", calculateTotal);
document.getElementById("lunchQty").addEventListener("input", calculateTotal);
document.getElementById("dinnerQty").addEventListener("input", calculateTotal);

document.getElementById("saveBtn").addEventListener("click", saveEntry);

// Load
loadCustomers();
loadMenu();