function sendWhatsApp(customerName, mobile, total) {

    const message =
`🏨 Sivasakthi Hotel

வணக்கம் ${customerName},

இந்த வார ஹோட்டல் கணக்கு

மொத்தம் : ₹${total}

நன்றி 🙏
Sivasakthi Hotel`;

    const url =
`https://wa.me/91${mobile}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}

window.sendWhatsApp = sendWhatsApp;