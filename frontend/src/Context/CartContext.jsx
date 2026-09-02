import { useContext, useEffect} from "react";
import {createContext, useMemo, useState} from "react";
import { authContext } from "./AuthContext";
import api from "../services/api/api";

export const CartContext = createContext();

export function CartProvider({children}) {
  const [cart, setCart] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const {loggedIn} = useContext(authContext);
  const fetchProducts = async (page = 1 ) => {
  try {
    setLoading(true);
    const res = await api.get(`/auth/getItems?page=${page}`);

    setInitialProducts(res.data.items);
    setTotalProducts(res.data.totalProducts);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  useEffect(()=>{
    if(loggedIn){
    fetchProducts()
  }
  }, [loggedIn]);

  //+ Add Item
  const addToCart = (product) => {
    setCart((prevCart) => {
      const prevItem = prevCart.find((item) => item._id === product._id);
      if (prevItem) {
        return prevCart.map((item) => (item._id === product._id ? {...item, quantity: item.quantity + 1} : item));
      } else {
        return [...prevCart, {...product, quantity: 1}];
      }
    });
  };
  //+ Remove Item
  const removeItem = (productId, removeAll = false) => {
    setCart((prevCart) => {
      const preItems = prevCart.find((items) => items._id === productId);
      if (!preItems) {
        return prevCart;
      }
      if (preItems.quantity === 1 || removeAll) {
        return prevCart.filter((items) => items._id != productId);
      } else {
        return prevCart.map((item) => (item._id == productId ? {...item, quantity: item.quantity - 1} : item));
      }
    });
  };
  //+ Clear Cart
  const clearCart = () => setCart([]);
  //+ Total Count
  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  //+ Total Price
  const totalPrice = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);
  //+ Category
  const availableCategories = ["All", ...new Set(initialProducts.map((p) => p.category))];

  const products = initialProducts;
  return <CartContext.Provider value={{products, cart, addToCart, availableCategories, clearCart,totalProducts, removeItem, cartCount, totalPrice, fetchProducts, loading, setLoading}}>{children}</CartContext.Provider>;
}
