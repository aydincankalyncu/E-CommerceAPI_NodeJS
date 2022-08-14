const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");
  
  const router = require("express").Router();
  const Cart = require("../models/Cart");
  
  router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
      const savedCartt = await newCart.save();
      res.status(200).json(savedCartt);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  // Get User Cart
  router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const cart = await Cart.find({userId: req.params.id});
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // Get All

  router.get("/", verifyTokenAndAdmin, async (req,res) =>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
  })
  
  module.exports = router;
  