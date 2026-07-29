import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

const tableBody = document.getElementById("customerBody");

async function loadCustomerHistory() {
  if (!tableBody) return;

  tableBody.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "customers"));

    if (snapshot.empty) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;">
            No customers found
          </td>
        </tr>
      `;
      return;
    }

    snapshot.forEach((customerDoc) => {
      const customer = customerDoc.data();

      tableBody.innerHTML += `
        <tr>
          <td>${customer.name || ""}</td>
          <td>${customer.mobile || ""}</td>
          <td>${customer.address || ""}</td>
          <td>${customer.salaryType || ""}</td>
          <td>
            <button>Edit</button>
          </td>
          <td>
            <button onclick="editCustomer(
            '${customerDoc.id}',
            '${customer.name || ""}',
            '${customer.mobile || ""}',
            '${customer.address || ""}',
            '${customer.salaryType || ""}'
       )">
       Edit
             </button>
          </td>
        </tr>
      `;
    });

  } catch (error) {
    console.error(error);
    alert("Failed to load customers");
  }
}
async function editCustomer(id, name, mobile, address, salaryType) {

  const newName = prompt("Customer Name", name);
  if (newName === null) return;

  const newMobile = prompt("Mobile", mobile);
  const newAddress = prompt("Address", address);
  const newSalary = prompt("Salary Type", salaryType);

  await updateDoc(doc(db, "customers", id), {
    name: newName,
    mobile: newMobile,
    address: newAddress,
    salaryType: newSalary
  });

  alert("Customer Updated Successfully");

  loadCustomerHistory();
}

async function deleteCustomer(id) {
  if (!confirm("Delete this customer?")) return;

  try {
    await deleteDoc(doc(db, "customers", id));
    alert("Customer deleted successfully");
    loadCustomerHistory();
  } catch (error) {
    console.error(error);
    alert("Delete failed");
  }
}

window.editCustomer = editCustomer;
window.deleteCustomer = deleteCustomer;

loadCustomerHistory();