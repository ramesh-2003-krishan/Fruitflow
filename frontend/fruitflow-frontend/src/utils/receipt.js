import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export function generateReceipt({ orderID, name, email, phone, address, products, paymentMethod, totals, date }) {
    const doc = new jsPDF()

    const pageWidth = doc.internal.pageSize.getWidth()

  
    doc.setFillColor(21, 128, 61) // green-700
    doc.rect(0, 0, pageWidth, 35, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("FruitFlow", 14, 18)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("Fresh Fruits, Delivered Daily", 14, 26)

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("ORDER RECEIPT", pageWidth - 14, 18, { align: "right" })
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.text(`#${orderID}`, pageWidth - 14, 26, { align: "right" })

    
    doc.setTextColor(40, 40, 40)
    let y = 48

    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.text("Order Information", 14, y)
    y += 7

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(90, 90, 90)
    doc.text(`Order Date: ${date}`, 14, y)
    doc.text(`Payment Method: ${formatPaymentMethod(paymentMethod)}`, pageWidth - 14, y, { align: "right" })
    y += 10

  
    doc.setDrawColor(230, 230, 230)
    doc.line(14, y, pageWidth - 14, y)
    y += 8

    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(40, 40, 40)
    doc.text("Delivery Details", 14, y)
    y += 7

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(90, 90, 90)
    doc.text(`Name: ${name}`, 14, y)
    y += 5
    doc.text(`Email: ${email}`, 14, y)
    y += 5
    doc.text(`Phone: ${phone}`, 14, y)
    y += 5
    doc.text(`Address: ${address}`, 14, y)
    y += 10

   
    const tableRows = products.map(item => [
        item.name,
        item.quantity.toString(),
        `Rs. ${item.price.toFixed(2)}`,
        `Rs. ${(item.price * item.quantity).toFixed(2)}`
    ])

    autoTable(doc, {
        startY: y,
        head: [["Item", "Qty", "Price", "Total"]],
        body: tableRows,
        theme: "striped",
        headStyles: {
            fillColor: [21, 128, 61],
            textColor: [255, 255, 255],
            fontStyle: "bold"
        },
        styles: {
            fontSize: 9,
            cellPadding: 4
        },
        columnStyles: {
            1: { halign: "center" },
            2: { halign: "right" },
            3: { halign: "right" }
        }
    })

    let finalY = doc.lastAutoTable.finalY + 10

  
    const totalsX = pageWidth - 14
    doc.setFontSize(9)
    doc.setTextColor(90, 90, 90)
    doc.setFont("helvetica", "normal")

    doc.text("Subtotal:", totalsX - 50, finalY)
    doc.text(`Rs. ${totals.subtotal.toFixed(2)}`, totalsX, finalY, { align: "right" })
    finalY += 6

    if (totals.savings > 0) {
        doc.setTextColor(21, 128, 61)
        doc.text("Savings:", totalsX - 50, finalY)
        doc.text(`-Rs. ${totals.savings.toFixed(2)}`, totalsX, finalY, { align: "right" })
        finalY += 6
        doc.setTextColor(90, 90, 90)
    }

    doc.text("Delivery:", totalsX - 50, finalY)
    doc.setTextColor(21, 128, 61)
    doc.text("Free", totalsX, finalY, { align: "right" })
    finalY += 8

    doc.setDrawColor(200, 200, 200)
    doc.line(totalsX - 50, finalY - 4, totalsX, finalY - 4)

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(40, 40, 40)
    doc.text("Total:", totalsX - 50, finalY + 3)
    doc.setTextColor(21, 128, 61)
    doc.text(`Rs. ${totals.total.toFixed(2)}`, totalsX, finalY + 3, { align: "right" })

  
    const pageHeight = doc.internal.pageSize.getHeight()
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(150, 150, 150)
    doc.text("Thank you for shopping with FruitFlow! 🌿", pageWidth / 2, pageHeight - 20, { align: "center" })
    doc.text("For support, contact us at support@fruitflow.com", pageWidth / 2, pageHeight - 14, { align: "center" })

   
    doc.save(`FruitFlow_Receipt_${orderID}.pdf`)
}

function formatPaymentMethod(method) {
    switch (method) {
        case "cashOnDelivery":
            return "Cash on Delivery"
        case "bank_transfer":
            return "Bank Transfer"
        case "online":
            return "Online Payment"
        default:
            return method
    }
}