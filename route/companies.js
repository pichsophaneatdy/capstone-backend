const express = require("express");
const router = express.Router();
const {getCompanies, addCompany,removeCompany} = require("../controller/companies");

router.get("", getCompanies);
router.post("",addCompany );
router.delete("",removeCompany);
module.exports = router;