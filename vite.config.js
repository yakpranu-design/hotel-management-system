import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        dashboard: resolve(__dirname, "dashboard.html"),
        customers: resolve(__dirname, "customers.html"),
        addCustomer: resolve(__dirname, "add-customer.html"),
        customerHistory: resolve(__dirname, "customer-history.html"),
        menu: resolve(__dirname, "menu.html"),
        dailyEntry: resolve(__dirname, "daily-entry.html"),
        weeklyBill: resolve(__dirname, "weekly-bill.html"),
        payment: resolve(__dirname, "payment.html"),
        paymentHistory: resolve(__dirname, "payment-history.html"),
        report: resolve(__dirname, "report.html"),
        monthlyReport: resolve(__dirname, "monthly-report.html"),
        ledger: resolve(__dirname, "ledger.html"),
        stock: resolve(__dirname, "stock.html"),
        settings: resolve(__dirname, "settings.html")
      }
    }
  }
});