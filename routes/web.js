const homecontroller = require("../app/http/controllers/homeController");
const authcontroller = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/Customer/cartController");
const orderController = require("../app/http/controllers/Customer/orderController");

const guest = require("../app/http/middlware/guest");
const auth = require("../app/http/middlware/auth");

function initRoutes(app) {
  app.get("/", homecontroller().index);
  app.get("/login", guest, authcontroller().login);
  app.post("/login", authcontroller().postLogin);
  app.get("/register", guest, authcontroller().register);
  app.post("/register", authcontroller().postRegister);
  app.post("/logout", authcontroller().logout);

  app.get("/cart", cartController().cart);
  app.post("/update-cart", cartController().update);
  // Customer routes
  app.post("/orders", orderController().store);
  app.get("/customers/orders", orderController().index);
}
module.exports = initRoutes;
