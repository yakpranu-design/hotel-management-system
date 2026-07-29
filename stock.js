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

// Load Stock
async function loadStock() {

    const tbody = document.getElementById("stockBody");

    tbody.innerHTML = "";

    const snapshot = await getDocs(collection(db, "stock"));

    snapshot.forEach((stockDoc) => {

        const stock = stockDoc.data();

        tbody.innerHTML += `
        <tr>

            <td>${stock.itemName}</td>

            <td>${stock.quantity}</td>

            <td>${stock.unit}</td>

            <td>

                <button onclick="window.editStock(
                    '${stockDoc.id}',
                    '${stock.itemName}',
                    '${stock.quantity}',
                    '${stock.unit}'
                )">
                    ✏️
                </button>

            </td>

            <td>

                <button onclick="window.deleteStock('${stockDoc.id}')">
                    🗑️
                </button>

            </td>

        </tr>
        `;

    });

}

// Save Stock
async function saveStock() {

    const itemName = document.getElementById("itemName").value.trim();
    const quantity = Number(document.getElementById("quantity").value);
    const unit = document.getElementById("unit").value;

    if (!itemName || quantity <= 0) {
        alert("Enter valid stock details");
        return;
    }

    if (editId) {

        await updateDoc(doc(db, "stock", editId), {

            itemName,
            quantity,
            unit

        });

        alert("✅ Stock Updated");

        editId = null;

    } else {

        await addDoc(collection(db, "stock"), {

            itemName,
            quantity,
            unit

        });

        alert("✅ Stock Added");

    }

    document.getElementById("itemName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("unit").value = "Kg";

    loadStock();

}

// Edit
function editStock(id, itemName, quantity, unit) {

    document.getElementById("itemName").value = itemName;
    document.getElementById("quantity").value = quantity;
    document.getElementById("unit").value = unit;

    editId = id;

}

// Delete
async function deleteStock(id) {

    if (!confirm("Delete this stock item?")) return;

    await deleteDoc(doc(db, "stock", id));

    alert("🗑️ Stock Deleted");

    loadStock();

}

document
.getElementById("saveBtn")
.addEventListener("click", saveStock);

window.editStock = editStock;
window.deleteStock = deleteStock;

loadStock();