import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

async function loadCustomers() {
  const tbody = document.getElementById("customerBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "customers"));

    snapshot.forEach((customerDoc) => {
      const customer = customerDoc.data();

      tbody.innerHTML += `
        <tr>
          <td>${customer.name || ""}</td>
          <td>${customer.mobile || ""}</td>
          <td>${customer.address || ""}</td>
          <td>${customer.salaryType || ""}</td>
          <td>
            <button>Edit</button>
          </td>
          <td>
            <button onclick="deleteCustomer('${customerDoc.id}')">
              Delete
            </button>
          </td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error loading customers:", error);
    alert("Failed to load customers.");
  }
}

async function deleteCustomer(id) {
  try {
    await deleteDoc(doc(db, "customers", id));
    alert("Customer deleted successfully");
    loadCustomers();
  } catch (error) {
    console.error("Delete Error:", error);
    alert("Failed to delete customer.");
  }
}

window.deleteCustomer = deleteCustomer;

loadCustomers();