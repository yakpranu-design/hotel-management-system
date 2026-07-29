function searchCustomer() {

    const input = document.getElementById("search").value.toLowerCase();

    const table = document.getElementById("customerTable");

    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {

        const text = rows[i].textContent.toLowerCase();

        if (text.includes(input)) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";

        }

    }

}

window.searchCustomer = searchCustomer;