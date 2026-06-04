import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('')
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems); // structuredClone is used to create a deep copy of cartItems
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);


    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          {
            headers: {
              token: token,
            },
          }
        );
        const data = response.data;
        // console.log(data);
        toast.success(response.data?.msg || error.message)
      } catch (error) {
        console.error("Error adding to cart:", error);

        if (error.response?.status === 401) {

          localStorage.removeItem("token");

          setToken("");

          toast.error("Session expired, please login again");

          navigate("/login");

        } else {
          toast.error(error.response?.data?.msg || error.message);
        }
      }
    }
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items])
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error("Error getting cart count:", error);
        }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          {
            headers: {
              token: token,
            },
          }
        );
        // const data = response.data;
        // console.log(data);
        toast.success("Cart updated successfully");
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) { }
      }
    }
    return totalAmount;
  };

  // Get Products Data from Backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      const data = response.data;
      // console.log(data)
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.message);

    }
  };

  
  const getUserCart = async (token) => {
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/get`,
          {},
          {
            headers: {
              token: token,
            },
          }
        );
        if (response.data.success) {
          setCartItems(response.data.cartData);
        } else {
          toast.error("Failed to fetch cart data");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };

  useEffect(() => {
    // console.log(cartItems);
    getProductsData();
    
    // console.log(products)
  }, []);

useEffect(() => {
  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    setToken(storedToken);
  }
}, []);

  useEffect(() => {
  if (token) {
    getUserCart(token);
  }
}, [token]);


// in this useeffect there is an error that this useffect runs only on first render and on page refresh so this useeffect doesnot update the usercart with guestcart(guestcart means cart withlogin ) and this useeffect update cart on page refresh means mannualy and uper useeffect do this work auto

// For maintaining login state on page refresh
  // useEffect(() => {
  //   if (!token && localStorage.getItem("token")) {
  //     setToken(localStorage.getItem("token"));
  //     getUserCart(localStorage.getItem("token"));
  //   }
  // }, []);

  useEffect(() => { }, [cartItems]);
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};
export default ShopContextProvider;
