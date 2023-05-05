const express = require("express");
const router = express.Router();
const {getCompanies, addCompany,removeCompany} = require("../controller/companies");

router.get("/:id", getCompanies);
router.post("/:id",addCompany );
router.delete("/:id",removeCompany);
module.exports = router;