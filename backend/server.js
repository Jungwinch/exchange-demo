  users.push(user);
  res.json({ user, token: issueToken(user) });
});

app.post("/order", (req, res) => {
  const { side, price, qty, userId } = req.body;
  orders[side].push({ price, qty, userId });

  orders.BUY.sort((a, b) => b.price - a.price);
  orders.SELL.sort((a, b) => a.price - b.price);

  publish("book:update", orders);

  if (
    orders.BUY[0] &&
    orders.SELL[0] &&
    orders.BUY[0].price >= orders.SELL[0].price
  ) {
    const buy = orders.BUY.shift();
    const sell = orders.SELL.shift();

    publish("trade:executed", {
      price: sell.price,
      qty: sell.qty,
      ts: Date.now()
    });
  }

  res.json({ ok: true });
});

app.listen(3001, () => console.log("API running on 3001"));


