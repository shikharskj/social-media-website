const express = require("express");

const router = express.Router();
console.log("Router Loaded");

const homeController = require("../controllers/home_controller");
const contactController = require("../controllers/contact_controller");

router.get("/",homeController.home);
router.get("/contact",contactController.contact);
router.use("/users",require("./users"));
router.use("/posts",require("./posts"));
router.use("/comments",require("./comments"))

//for any further routes, access from here
//router.use("/router_name", require("./router_file"));

module.exports = router;