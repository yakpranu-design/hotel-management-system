import { db } from "./firebase.js";

import {
    doc,
    setDoc,
    getDoc
} from "firebase/firestore";

const settingsRef = doc(db, "settings", "hotel");

async function loadSettings() {

    const snapshot = await getDoc(settingsRef);

    if (snapshot.exists()) {

        const data = snapshot.data();

        document.getElementById("hotelName").value =
            data.hotelName || "";

        document.getElementById("hotelAddress").value =
            data.hotelAddress || "";

        document.getElementById("hotelPhone").value =
            data.hotelPhone || "";

        document.getElementById("gst").value =
            data.gst || "";

    }

}

async function saveSettings() {

    await setDoc(settingsRef, {

        hotelName:
            document.getElementById("hotelName").value,

        hotelAddress:
            document.getElementById("hotelAddress").value,

        hotelPhone:
            document.getElementById("hotelPhone").value,

        gst:
            document.getElementById("gst").value

    });

    alert("✅ Settings Saved");

}

document
.getElementById("saveBtn")
.addEventListener("click", saveSettings);

loadSettings();