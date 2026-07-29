import { db } from "./firebase.js";

import {
    collection,
    addDoc
} from "firebase/firestore";

async function saveCustomer() {

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const address = document.getElementById("address").value.trim();
    const salaryType = document.getElementById("salaryType").value;

    if (!name || !mobile || !address || !salaryType) {
        alert("Please fill all fields");
        return;
    }

    await addDoc(collection(db, "customers"), {
        name,
        mobile,
        address,
        salaryType,
        credit: 0
    });

    alert("✅ Customer Added Successfully");

    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("address").value = "";
    document.getElementById("salaryType").value = "";
}

window.saveCustomer = saveCustomer;