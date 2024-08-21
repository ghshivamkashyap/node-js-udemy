const express = require("express");
const bp = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");

const app = express();
const port = 3000;
app.use(express.json());
// app.use(bp.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);

app.use("/shop", shopRoutes);

// default router for 404  error page
app.use((req, res, next) => {
  return res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting the server: ", error);
    process.exit(1);
  }
  console.log(`App is running at port ${port}`);
});
