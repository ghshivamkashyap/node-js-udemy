import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let res = await axios.get("http://localhost:4000/order/getallorders");
      if (res.status == 200) {
        setOrders(res.data.data);
        console.log("Data: ", orders);
      }
      console.log("Res: ", res);
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div>
      <nav className="bg-purple-400 fixed top-0 left-0 w-full shadow-lg">
        <ul className="flex justify-evenly p-4">
          <li>
            <a
              href="#home"
              className="text-white font-semibold hover:text-gray-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-white font-semibold hover:text-gray-200"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-white font-semibold hover:text-gray-200"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-16 p-4">
          <h1 className="text-2xl font-bold mb-4">Orders</h1>
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order._id} className="mb-4 p-4 border rounded">
                  <p className="font-bold">Order ID: {order._id}</p>

                  <p>Total Amount: ₹{order.amount}</p>
                  <h2 className="font-semibold mt-2">Products:</h2>
                  <ul className="list-disc ml-6">
                    {order.products.map((product) => (
                      <li key={product._id}>
                        <a
                          href={product.productId.imageUrl} // Pointing to the image URL
                          download
                          className="btn btn-primary bg-green-300 text-blue-500"
                        >
                          Download Image
                        </a>
                        <img
                        className=" bg-cover box-content"
                          src={product.productId.imageUrl}
                          alt={product.productId.title}
                          style={{ width: "150px", height: "150px" }} // You can adjust the size as needed
                        />
                        <p>{product.productId.title}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p className=" font-semibold">
                          Price: {product.productId.price}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
