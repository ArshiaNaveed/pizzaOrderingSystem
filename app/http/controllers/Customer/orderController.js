const Order = require("../../../models/order");
const passport = require("passport");

function orderController() {
  return {
    store(req, res) {
      // Validate request
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "All fields are required");
        return res.redirect("/cart");
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });
      order
        .save()
        .then((result) => {
          // Order.populate(result, { path: "customerId" }, (err, placedOrder) => {
          req.flash("success", "Order placed successfully");
          delete req.session.cart;

          return res.redirect("customers/orders");
        })
        .catch((err) => {
          req.flash("Error", "Something Went Wrong");
          return res.redirect("/cart");
        });
    },
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.render("customers/orders", { orders: orders });
    },
  };
}

module.exports = orderController;
