import Customer from "../../models/authentications/customer.schema.js";
import Contact from "../../models/cms/contact.schema.js";
import Item from "../../models/ecommerce/item.schema.js";
import Order from "../../models/ecommerce/order.schema.js";
import Review from "../../models/ecommerce/review.schema.js";
import SupportTicket from "../../models/support/support-ticket.schema.js";

export const dashboardCounts = async (req, res) => {
  try {
    const { _id,  } = req.admin;
    const currentYear = new Date().getFullYear();

    const [customers, contacts, items, orders, reviews, supports, ordersData] =
      await Promise.all([
        Customer.find({  deletedAt: null }).countDocuments(),
        Contact.find({  deletedAt: null }).countDocuments(),
        Item.find({ admin: _id,  deletedAt: null }).countDocuments(),
        Order.find({  deletedAt: null }).countDocuments(),
        Review.find({  deletedAt: null }).countDocuments(),
        SupportTicket.find({  deletedAt: null }).countDocuments(),
        Order.aggregate([
          {
            $match: {
              deletedAt: null,
              createdAt: {
                $gte: new Date(`${currentYear}-01-01T00:00:00Z`),
                $lt: new Date(`${currentYear + 1}-01-01T00:00:00Z`),
              },
            },
          },
          {
            $group: {
              _id: { $month: "$createdAt" },
              totalOrders: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
          {
            $project: {
              _id: 0,
              month: "$_id",
              totalOrders: 1,
            },
          },
        ]),
      ]);

    const data = {
      customers,
      contacts,
      items,
      orders,
      reviews,
      supports,
      ordersData,
    };

    return res.status(200).json({
      status: "success",
      message: "Dashboard counts fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const recentProducts = async (req, res) => {
  try {
    const { _id,  } = req.admin;
    const products = await Item.find({
      admin: _id,
      
      deletedAt: null,
    })
      .sort({ createdAt: -1 })
      .limit(5);
    return res.status(200).json({
      status: "success",
      message: "Recent Item fetch successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
