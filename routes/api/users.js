const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator');

router.post('/',[
    check('name').isLength({ min: 5})
], (req, res) => {
    console.log(req.body);
  res.send("User Routes");
});

module.exports = router;
