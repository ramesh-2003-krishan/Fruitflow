import Shop from "../models/shop.js";
import { isAdmin } from "./userController.js";

export default async function createShop(req, res) {

    if (!isAdmin(req)) {
        return res.status(401).json({
            message: "only admins can add shops"
        });
    }

    try {
        const count = await Shop.countDocuments();

        const shop = new Shop({
            ...req.body,
            shopID: `SHOP${String(count + 1).padStart(3, "0")}`
        });

        await shop.save();

        res.status(200).json({
            message: "successfully added shop"
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: err.message
        });
    }
}

export async function getShops(req, res) {
    try {
        const shops = await Shop.find();
        res.status(200).json(shops);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching shops",
            error: err.message
        });
    }
}

export async function updateShop(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "only admin can update shops"
        });
    }

    try {
        const shop = await Shop.findOneAndUpdate(
            { shopID: req.params.shopID },   // correct: using shopID field
            req.body,
            { new: true } // returns updated document
        );

        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        res.json({
            message: "Shop updated successfully",
            shop
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating shop",
            error: err.message
        });
    }
}

export async function deleteShop(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "only admin can delete shops"
        });
    }

    try {
        const shop = await Shop.findOneAndDelete({
            shopID: req.params.shopID
        });

        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        res.json({
            message: "Shop deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting shop",
            error: err.message
        });
    }
}