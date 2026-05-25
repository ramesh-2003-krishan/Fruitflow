import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
    if (req.user == null){
        res.status(403).json({
            "message" : "you must be logged in to create orders"
        });
        return;
    }
    const orderInfo = req.body;

    if(orderInfo.name == null){
        orderInfo.name = req.user.name;
    }

    let orderID = "ff00001";

    const lastOrder = await Order.find().sort({date: -1}).limit(1);

    if(lastOrder.length > 0){
        const lastOrderID = lastOrder[0].orderID;

        const lastOrderNumberString = lastOrderID.replace("ff", "");
        const lastOrderNumber = parseInt(lastOrderNumberString);
        const newOrderNumber = lastOrderNumber + 1;
        const newOrderNumberString = String(newOrderNumber).padStart(5, "0");
        orderID = "ff" + newOrderNumberString;
    }
    try{
        let total = 0;
        let labelledTotal = 0;
        const products = [];

        for(let i=0; i<orderInfo.products.length; i++){
            const item = await Product.findOne({productID: orderInfo.products[i].productID});

            if(item == null){
                res.status(404).json({
                    message: "Product with ID " + orderInfo.products[i].productID + " not found"
                });
                return;
            }
                
            products[i] = {
               
                        productID: item.productID,
                        name: item.name,
                        altNames: item.altNames,
                        quantity: orderInfo.products[i].quantity
               }
            total += item.price * orderInfo.products[i].quantity;
            labelledTotal += item.labelledPrice * orderInfo.products[i].quantity;
        }
        const newOrder = new Order({
            orderID: orderID,
            name: orderInfo.name,
            email: orderInfo.email,
            phone: orderInfo.phone,
            address: orderInfo.address,
            status: "pending",
            products: products,
            date: new Date
        });
        const createdOrder = await newOrder.save();
        res.json({
            message: "Order created successfully",
            orderID: createdOrder.orderID,
            total: total,
            labelledTotal: labelledTotal
        });
    }catch(err){
        res.status(500).json({
            message: "Error creating order",
            error: err
            });
    }
}
    
    
