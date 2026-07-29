function printBill(customerName, total) {

    const bill = `
    <html>
    <head>
        <title>Sivasakthi Hotel Bill</title>
        <style>
            body{
                font-family:Arial;
                padding:30px;
            }

            h2{
                text-align:center;
            }

            table{
                width:100%;
                border-collapse:collapse;
            }

            th,td{
                border:1px solid #000;
                padding:10px;
                text-align:center;
            }

        </style>
    </head>

    <body>

    <h2>🏨 Sivasakthi Hotel</h2>

    <h3>Weekly Bill</h3>

    <p><b>Customer :</b> ${customerName}</p>

    <hr>

    <h2>Total Amount : ₹${total}</h2>

    <hr>

    <p>Thank You 🙏</p>

    </body>
    </html>
    `;

    const win = window.open("", "", "width=800,height=700");

    win.document.write(bill);

    win.document.close();

    win.print();

}

window.printBill = printBill;