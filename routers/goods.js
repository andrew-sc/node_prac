const express = require("express");
const Goods = require("../schemas/Goods");
const Cart = require("../schemas/cart");

const router = express.Router();

router.get("/goods", async (req, res, next) => {
  try {
    const { category } = req.query;
    const goods = await Goods.find({ category }).sort("-goodsId");
    res.json({ goods: goods });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 겟
router.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;
  goods = await Goods.findOne({ goodsId: goodsId });
  res.json({ detail: goods });
});

// 포스트
router.post('/goods', async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;
  
    isExist = await Goods.find({ goodsId }); // 중복 검사
    if (isExist.length == 0) {
      await Goods.create({ goodsId, name, thumbnailUrl, category, price });
    }
    res.send({ result: "success" });
});


router.post("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    isCart = await Cart.find({ goodsId });
    console.log(isCart, quantity);
    if (isCart.length) {
        await Cart.updateOne({ goodsId }, { $set: { quantity } });
    } else {
        await Cart.create({ goodsId: goodsId, quantity: quantity });
    }
    res.send({ result: "success" });
});

// 카트에 담았던 거랑 비슷한 형식의 '삭제'
router.delete("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;

    const isGoodsInCart = await Cart.find({ goodsId });
    // ㄴ goodId에 해당하는 것이 카트안에 있는가를 확인하는 것
    if (isGoodsInCart.length > 0) {
        await Cart.deleteOne({ goodsId });
    } // 해당상품이 존재하면 지운다!(몇개를 지울까는 안나왔군)

    res.send({ result: "success" });
})

router.patch("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const isGoodsInCart = await Cart.find({ goodsId });
    if (isGoodsInCart.length > 0) {
        await Cart.updateOne({ goodsId }, { $set: {quantity} });
        // 일치하는 Id의 내용에 수량을 바꿔줘라
    }

    res.send({ result: "success" });
})

router.get("/cart", async (req, res) => {
    const cart = await Cart.find({});
    const goodsId = cart.map(cart => cart.goodsId);
  
    goodsInCart = await Goods.find()
      .where("goodsId")
      .in(goodsId);
  
    concatCart = cart.map(c => {
      for (let i = 0; i < goodsInCart.length; i++) {
        if (goodsInCart[i].goodsId == c.goodsId) {
          return { quantity: c.quantity, goods: goodsInCart[i] };
        }
      }
    });
  
    res.json({
      cart: concatCart
    });
});

module.exports = router;