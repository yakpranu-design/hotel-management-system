import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

let editId = null;

// Save Menu
async function saveMenu() {

    const category = document.getElementById("category").value;
    const itemName = document.getElementById("itemName").value.trim();
    const price = Number(document.getElementById("itemPrice").value);

    if (!category || !itemName || !price) {
        alert("Please fill all fields");
        return;
    }

    if (editId) {

        await updateDoc(doc(db, "menu", editId), {
            category,
            itemName,
            price
        });

        editId = null;

        alert("✅ Menu Updated");

    } else {

        await addDoc(collection(db, "menu"), {
            category,
            itemName,
            price
        });

        alert("✅ Menu Added");
    }

    document.getElementById("category").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";

    loadMenu();
}

// Load Menu
async function loadMenu() {

    const tbody = document.getElementById("menuBody");

    tbody.innerHTML = "";

    const snapshot = await getDocs(collection(db, "menu"));

    snapshot.forEach((menuDoc) => {

    const menu = menuDoc.data();

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${menu.category}</td>
        <td>${menu.itemName}</td>
        <td>₹${menu.price}</td>
        <td><button class="editBtn">✏️</button></td>
        <td><button class="deleteBtn">🗑️</button></td>
    `;

    row.querySelector(".editBtn").addEventListener("click", () => {
        editMenu(menuDoc.id, menu.category, menu.itemName, menu.price);
    });

    row.querySelector(".deleteBtn").addEventListener("click", () => {
        deleteMenu(menuDoc.id);
    });

    tbody.appendChild(row);
});

}

// Search
function searchMenu() {

    const value = document
        .getElementById("searchMenu")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#menuBody tr");

    rows.forEach((row) => {

        row.style.display =
            row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";
    });
}

// Edit
function editMenu(id, category, itemName, price) {

    document.getElementById("category").value = category;
    document.getElementById("itemName").value = itemName;
    document.getElementById("itemPrice").value = price;

    editId = id;
}

// Delete
async function deleteMenu(id) {

    if (!confirm("Delete this menu item?")) return;

    await deleteDoc(doc(db, "menu", id));

    alert("🗑️ Menu Deleted");

    loadMenu();
}

window.saveMenu = saveMenu;
window.searchMenu = searchMenu;
window.editMenu = editMenu;
window.deleteMenu = deleteMenu;

loadMenu();