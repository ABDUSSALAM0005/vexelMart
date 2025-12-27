// import { useCart } from "../context/CartContext";
// import { Minus, Plus, TrashIcon } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { Alert, AlertDescription, AlertTitle } from "../components/ui/Alert";
// import { ShoppingCart } from "lucide-react";
// import { useState } from "react";
// import api from "../components/lib/axios";
// import { useAuth } from "../context/AuthContext";


// const CartPage = () => {
//   const { state, dispatch } = useCart();
//   const { user } = useAuth();

//   //   const addToCartHandler = () => {
//   //   const existItem = state.cartItems.find(
//   //     (x) => x.id === product.id
//   //   );

//   //   const qty = existItem ? existItem.qty + 1 : 1;

//   //   if (product.countInStock < qty) {
//   //     alert("Sorry, product is out of stock");
//   //     return;
//   //   }

//   //   dispatch({
//   //     type: "ADD_TO_CART",
//   //     payload: { ...product, qty }
//   //   });
//   // };

//   const increaseQty = async (item) => {
//     if (item.qty < item.countInStock) {
//       //update local cart
//       dispatch({
//         type: "UPDATE_QTY",
//         payload: {
//           id: item._id,
//           qty: item.qty + 1,
//         },
//       });
//     }

//     // persist to backend if user is logged in

//     if (user?.token) {
//       try {
//         await api.post(
//           "/cart",
//           { productId: item._id, qty: item.qty + 1 },
//           { headers: { Authorization: `Bearer ${user.token}` } }
//         );
//       } catch (err) {
//         console.error("Failed to update cart on server:", err);
//       }
//     }
//   };

//   const decreaseQty = async (item) => {
//     if (item.qty === 1) {
//       dispatch({ type: "REMOVE_FROM_CART", payload: item._id });
//     } else {
//       dispatch({
//         type: "UPDATE_QTY",
//         payload: { id: item._id, qty: item.qty - 1 },
//       });
//     }

//     if (user?.token) {
//       try {
//         await api.post(
//           "/cart",
//           { productId: item._id, qty: item.qty - 1 },
//           { headers: { Authorization: `Bearer ${user.token}` } }
//         );
//       } catch (err) {
//         console.error("Failed to update cart on server:", err);
//       }
//     }
//   };

//   const navigate = useNavigate();
//   const checkOutHandler = () => {
//     navigate("/signin?redirect=/shipping");
//   };

//   const subtotal = state.cartItems.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   const totalItems = state.cartItems.reduce((acc, item) => acc + item.qty, 0);
//   if (state.cartItems.length === 0) {
//     return (
//       <Alert
//         variant="destructive"
//         className="max-w-lg mx-auto mt-12 flex justify-center"
//       >
//         <div className="flex flex-col items-center">
//           <ShoppingCart className="h-8 w-8 text-destructive" />

//           <AlertTitle className="text-lg">Your cart is empty</AlertTitle>

//           <AlertDescription className="text-sm">
//             Looks like you haven’t added anything yet.
//           </AlertDescription>

//           <Link
//             to="/"
//             className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
//           >
//             Go Shopping →
//           </Link>
//         </div>
//       </Alert>
//     );
//   } else {
//     return (
//       <div className="mt-8">
//         <div className="flow-root">
//           <ul role="list" className="my-6 divide-y divide-gray-200">
//             {state.cartItems.map((item) => (
//               <li key={item._id} className="flex py-6">
//                 <div>
//                   {" "}
//                   <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
//                     <img src={item.image} className="size-full object-cover" />
//                   </div>
//                   <div className="text-center">
//                     <button
//                       onClick={() =>
//                         dispatch({
//                           type: "REMOVE_FROM_CART",
//                           payload: item._id,
//                         })
//                       }
//                       className="flex p-2 rounded-md justify-around text-red-500 mt-2 hover:transition-all duration-300 hover:bg-primary/10 hover:text-red-400 "
//                     >
//                       <TrashIcon width={15} />
//                       <p className="mx-2">Delete</p>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="ml-4 flex flex-1 flex-col">
//                   <div>
//                     <div className="flex justify-between text-base font-medium">
//                       <h3>
//                         <a href="">{item.name}</a>
//                       </h3>
//                       <p className="ml-4">${item.price}</p>
//                     </div>
//                     <p className="mt-1 text-sm">{item.description}</p>
//                   </div>
//                   <div className="flex flex-1 items-end justify-between text-sm">
//                     <p className="text-gray-50"></p>

//                     <div className="flex justify-around">
//                       <button
//                         onClick={() => decreaseQty(item)}
//                         type="button"
//                         className="shadow-xl bg-primary/20 p-1 rounded-full hover:transition-all duration-300 hover:bg-primary/10"
//                       >
//                         <Minus />
//                       </button>
//                       <p className="text-xl p-1 mx-2">{item.qty}</p>
//                       <button
//                         disabled={item.qty >= item.countInStock}
//                         onClick={() => increaseQty(item)}
//                         type="button"
//                         className="shadow-xl bg-primary p-1 rounded-md hover:transition-all duration-300 hover:bg-primary/50"
//                       >
//                         <Plus />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <div className="py-6">
//             <div className="border-t border-gray-100 px-4 py-6 sm:px-6">
//               <div className="flex justify-between text-base font-medium">
//                 <p>SubTotal</p>
//                 <p>${subtotal.toFixed(2)}</p>
//               </div>
//               <div className="flex justify-between text-base font-medium">
//                 <p></p>
//                 <p>({totalItems} Items)</p>
//               </div>
//               <p className="mt-0.5 text-sm">
//                 Shipping and taxes calculated at checkout.
//               </p>
//             </div>

//             <div className="mt-6">
//               <a
//                 onClick={checkOutHandler}
//                 className={`flex items-center justify-center rounded-md px-6 py-3 text-white font-medium shadow
//     ${
//       state.cartItems.length === 0
//         ? "bg-gray-400 cursor-not-allowed"
//         : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
//     }
//   `}
//               >
//                 Checkout
//               </a>
//             </div>
//             <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//               <p>
//                 or{" "}
//                 <Link
//                   to="/"
//                   type="button"
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   Continue Shopping
//                   <span aria-hidden="true"> &rarr;</span>
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// };

// // <h2 className="font-semibold">{item.name}</h2>
// //     <p>{item.price}</p>
// //     <p>Qty: {item.qty}</p>

// export default CartPage;

// import { useCart } from "../context/CartContext";
// import { Minus, Plus, TrashIcon } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { Alert, AlertDescription, AlertTitle } from "../components/ui/Alert";
// import { ShoppingCart } from "lucide-react";
// import api from "../components/lib/axios";
// import { useAuth } from "../context/AuthContext";

// const CartPage = () => {
//   const { state, dispatch } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const increaseQty = async (item) => {
//     dispatch({ type: "UPDATE_QTY", payload: { id: item.product._id, qty: item.qty + 1 } });

//     if (user?.token) {
//       try {
//         await api.post(
//           "/cart",
//           { productId: item.product._id, qty: item.qty + 1 },
//           { headers: { Authorization: `Bearer ${user.token}` } }
//         );
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const decreaseQty = async (item) => {
//     if (item.qty === 1) {
//       dispatch({ type: "REMOVE_FROM_CART", payload: item.product._id });
//     } else {
//       dispatch({ type: "UPDATE_QTY", payload: { id: item.product._id, qty: item.qty - 1 } });
//     }

//     if (user?.token) {
//       try {
//         await api.post(
//           "/cart",
//           { productId: item.product._id, qty: item.qty - 1 },
//           { headers: { Authorization: `Bearer ${user.token}` } }
//         );
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const checkOutHandler = () => navigate("/signin?redirect=/shipping");

//   const subtotal = state.cartItems.reduce(
//     (acc, item) => acc + item.product.price * item.qty,
//     0
//   );

//   const totalItems = state.cartItems.reduce((acc, item) => acc + item.qty, 0);

//   if (state.cartItems.length === 0)
//     return (
//       <Alert variant="destructive" className="max-w-lg mx-auto mt-12 flex justify-center">
//         <div className="flex flex-col items-center">
//           <ShoppingCart className="h-8 w-8 text-destructive" />
//           <AlertTitle className="text-lg">Your cart is empty</AlertTitle>
//           <AlertDescription className="text-sm">
//             Looks like you haven’t added anything yet.
//           </AlertDescription>
//           <Link
//             to="/"
//             className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
//           >
//             Go Shopping →
//           </Link>
//         </div>
//       </Alert>
//     );

//   return (
//     <div className="mt-8">
//       <ul role="list" className="my-6 divide-y divide-gray-200">
//         {state.cartItems.map((item) => (
//           <li key={item.product._id} className="flex py-6">
//             <div>
//               <div className="w-24 h-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
//                 <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
//               </div>
//               <div className="text-center mt-2">
//                 <button
//                   onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.product._id })}
//                   className="flex p-2 rounded-md justify-center text-red-500 hover:bg-primary/10 hover:text-red-400"
//                 >
//                   <TrashIcon width={15} />
//                   <span className="ml-1">Delete</span>
//                 </button>
//               </div>
//             </div>

//             <div className="ml-4 flex flex-1 flex-col justify-between">
//               <div>
//                 <div className="flex justify-between text-base font-medium">
//                   <h3>{item.product.name}</h3>
//                   <p>${item.product.price}</p>
//                 </div>
//                 <p className="text-sm mt-1">{item.product.description}</p>
//               </div>

//               <div className="flex items-center mt-4">
//                 <button
//                   onClick={() => decreaseQty(item)}
//                   className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
//                 >
//                   <Minus />
//                 </button>
//                 <p className="mx-2 text-lg">{item.qty}</p>
//                 <button
//                   onClick={() => increaseQty(item)}
//                   disabled={item.qty >= item.product.countInStock}
//                   className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
//                 >
//                   <Plus />
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="border-t border-gray-100 px-4 py-6 sm:px-6">
//         <div className="flex justify-between text-base font-medium">
//           <p>Subtotal</p>
//           <p>${subtotal.toFixed(2)}</p>
//         </div>
//         <div className="flex justify-between text-base font-medium">
//           <p></p>
//           <p>({totalItems} Items)</p>
//         </div>
//         <p className="mt-0.5 text-sm">Shipping and taxes calculated at checkout.</p>

//         <button
//           onClick={checkOutHandler}
//           className={`mt-4 w-full py-3 rounded-md text-white font-medium ${
//             state.cartItems.length === 0
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-indigo-600 hover:bg-indigo-700"
//           }`}
//         >
//           Checkout
//         </button>

//         <div className="mt-4 text-center text-sm text-gray-500">
//           <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Continue Shopping &rarr;
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

// import { useCart } from "../context/CartContext";
// import { Minus, Plus, TrashIcon } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { Alert, AlertDescription, AlertTitle } from "../components/ui/Alert";
// import { ShoppingCart } from "lucide-react";
// import api from "../components/lib/axios";
// import { useAuth } from "../context/AuthContext";

// const CartPage = () => {
//   const { state, dispatch } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const increaseQty = async (item) => {
//     if (item.qty < item.product?.countInStock) {
//       dispatch({
//         type: "UPDATE_QTY",
//         payload: { id: item.product._id, qty: item.qty + 1 },
//       });
//     }

//     if (user?.token) {
//       try {
//         await api.post(
//           "/cart",
//           { productId: item.product._id, qty: item.qty + 1 },
//           { headers: { Authorization: `Bearer ${user.token}` } }
//         );
//       } catch (err) {
//         console.error("Failed to update cart on server:", err);
//       }
//     }
//   };

//   const decreaseQty = async (item) => {
//     if (item.qty === 1) {
//       dispatch({ type: "REMOVE_FROM_CART", payload: item.product._id });
//     } else {
//       dispatch({
//         type: "UPDATE_QTY",
//         payload: { id: item.product._id, qty: item.qty - 1 },
//       });
//     }

//     if (user?.token) {
//       try {
//         await api.post(
//           "/cart",
//           { productId: item.product._id, qty: item.qty - 1 },
//           { headers: { Authorization: `Bearer ${user.token}` } }
//         );
//       } catch (err) {
//         console.error("Failed to update cart on server:", err);
//       }
//     }
//   };

//   const checkOutHandler = () => {
//     navigate("/signin?redirect=/shipping");
//   };

//   // Calculate subtotal and total items safely
//   const subtotal = state.cartItems.reduce(
//     (acc, item) => acc + (item.product?.price || 0) * item.qty,
//     0
//   );

//   const totalItems = state.cartItems.reduce((acc, item) => acc + item.qty, 0);

//   if (state.cartItems.length === 0) {
//     return (
//       <Alert
//         variant="destructive"
//         className="max-w-lg mx-auto mt-12 flex justify-center"
//       >
//         <div className="flex flex-col items-center">
//           <ShoppingCart className="h-8 w-8 text-destructive" />
//           <AlertTitle className="text-lg">Your cart is empty</AlertTitle>
//           <AlertDescription className="text-sm">
//             Looks like you haven’t added anything yet.
//           </AlertDescription>
//           <Link
//             to="/"
//             className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
//           >
//             Go Shopping →
//           </Link>
//         </div>
//       </Alert>
//     );
//   }

//   return (
//     <div className="mt-8">
//       <div className="flow-root">
//         <ul role="list" className="my-6 divide-y divide-gray-200">
//           {state.cartItems.map((item) => (
//             <li key={item.product?._id} className="flex py-6">
//               <div>
//                 <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
//                   <img
//                     src={item.product?.image}
//                     alt={item.product?.name}
//                     className="size-full object-cover"
//                   />
//                 </div>
//                 <div className="text-center">
//                   <button
//                     onClick={() =>
//                       dispatch({
//                         type: "REMOVE_FROM_CART",
//                         payload: item.product._id,
//                       })
//                     }
//                     className="flex p-2 rounded-md justify-around text-red-500 mt-2 hover:transition-all duration-300 hover:bg-primary/10 hover:text-red-400"
//                   >
//                     <TrashIcon width={15} />
//                     <p className="mx-2">Delete</p>
//                   </button>
//                 </div>
//               </div>

//               <div className="ml-4 flex flex-1 flex-col">
//                 <div>
//                   <div className="flex justify-between text-base font-medium">
//                     <h3>
//                       <a href="">{item.product?.name}</a>
//                     </h3>
//                     <p className="ml-4">${item.product?.price}</p>
//                   </div>
//                   <p className="mt-1 text-sm">{item.product?.description}</p>
//                 </div>
//                 <div className="flex flex-1 items-end justify-between text-sm">
//                   <div className="flex justify-around">
//                     <button
//                       onClick={() => decreaseQty(item)}
//                       type="button"
//                       className="shadow-xl bg-primary/20 p-1 rounded-full hover:transition-all duration-300 hover:bg-primary/10"
//                     >
//                       <Minus />
//                     </button>
//                     <p className="text-xl p-1 mx-2">{item.qty}</p>
//                     <button
//                       disabled={item.qty >= item.product?.countInStock}
//                       onClick={() => increaseQty(item)}
//                       type="button"
//                       className="shadow-xl bg-primary p-1 rounded-md hover:transition-all duration-300 hover:bg-primary/50"
//                     >
//                       <Plus />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>

//         <div className="py-6">
//           <div className="border-t border-gray-100 px-4 py-6 sm:px-6">
//             <div className="flex justify-between text-base font-medium">
//               <p>SubTotal</p>
//               <p>${subtotal.toFixed(2)}</p>
//             </div>
//             <div className="flex justify-between text-base font-medium">
//               <p></p>
//               <p>({totalItems} Items)</p>
//             </div>
//             <p className="mt-0.5 text-sm">
//               Shipping and taxes calculated at checkout.
//             </p>
//           </div>

//           <div className="mt-6">
//             <button
//               onClick={checkOutHandler}
//               className={`flex w-full items-center justify-center rounded-md px-6 py-3 text-white font-medium shadow
//               ${
//                 state.cartItems.length === 0
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
//               }`}
//             >
//               Checkout
//             </button>
//           </div>

//           <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//             <p>
//               or{" "}
//               <Link
//                 to="/"
//                 type="button"
//                 className="font-medium text-indigo-600 hover:text-indigo-500"
//               >
//                 Continue Shopping
//                 <span aria-hidden="true"> &rarr;</span>
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


import { useCart } from "../context/CartContext";
import { Minus, Plus, TrashIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/Alert";
import { ShoppingCart } from "lucide-react";
import api from "../components/lib/axios";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const increaseQty = async (item) => {
    if (item.qty < item.product.countInStock) {
      dispatch({
        type: "UPDATE_QTY",
        payload: { id: item.product._id, qty: item.qty + 1 },
      });
    }

    if (user?.token) {
      try {
        await api.put(
          "/cart",
          { productId: item.product._id, qty: item.qty + 1 },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      } catch (err) {
        console.error("Failed to update cart:", err);
      }
    }
  };

  const decreaseQty = async (item) => {
    if (item.qty === 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: item.product._id });
    } else {
      dispatch({
        type: "UPDATE_QTY",
        payload: { id: item.product._id, qty: item.qty - 1 },
      });
    }

    if (user?.token) {
      try {
        await api.put(
          "/cart",
          { productId: item.product._id, qty: item.qty - 1 },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      } catch (err) {
        console.error("Failed to update cart:", err);
      }
    }
  };

  const removeItem = async (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item.product._id });

    if (user?.token) {
      try {
        await api.delete(`/cart/${item.product._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } catch (err) {
        console.error("Failed to remove item:", err);
      }
    }
  };

  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  // Compute subtotal safely
  const subtotal = state.cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.qty,
    0
  );
  const totalItems = state.cartItems.reduce((acc, item) => acc + item.qty, 0);

  if (!state.cartItems.length) {
    return (
      <Alert
        variant="destructive"
        className="max-w-lg mx-auto mt-12 flex justify-center"
      >
        <div className="flex flex-col items-center">
          <ShoppingCart className="h-8 w-8 text-destructive" />
          <AlertTitle className="text-lg">Your cart is empty</AlertTitle>
          <AlertDescription className="text-sm">
            Looks like you haven’t added anything yet.
          </AlertDescription>
          <Link
            to="/"
            className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
          >
            Go Shopping →
          </Link>
        </div>
      </Alert>
    );
  }

  return (
    <div className="mt-8">
      <ul role="list" className="my-6 divide-y divide-gray-200">
        {state.cartItems.map((item) =>
          item.product ? (
            <li key={item.product._id} className="flex py-6">
              <div>
                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.image}
                    className="size-full object-cover"
                    alt={item.product.name}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={() => removeItem(item)}
                    className="flex p-2 rounded-md justify-around text-red-500 mt-2 hover:transition-all duration-300 hover:bg-primary/10 hover:text-red-400 "
                  >
                    <TrashIcon width={15} />
                    <p className="mx-2">Delete</p>
                  </button>
                </div>
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between text-base font-medium">
                  <h3>{item.product.name}</h3>
                  <p>${item.product.price}</p>
                </div>
                <p className="mt-1 text-sm">{item.product.description}</p>

                <div className="flex flex-1 items-end justify-end text-sm">
                  <button
                    onClick={() => decreaseQty(item)}
                    className="shadow-xl bg-primary/20 p-1 rounded-full hover:bg-primary/10"
                  >
                    <Minus />
                  </button>
                  <p className="text-xl px-2">{item.qty}</p>
                  <button
                    onClick={() => increaseQty(item)}
                    disabled={item.qty >= item.product.countInStock}
                    className="shadow-xl bg-primary p-1 rounded-md hover:bg-primary/50"
                  >
                    <Plus />
                  </button>
                </div>
              </div>
            </li>
          ) : null
        )}
      </ul>

      <div className="py-6 border-t border-gray-100 px-4 sm:px-6">
        <div className="flex justify-between text-base font-medium">
          <p>SubTotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-base font-medium">
          <p></p>
          <p>({totalItems} Items)</p>
        </div>
        <p className="mt-0.5 text-sm">
          Shipping and taxes calculated at checkout.
        </p>

        <button
          onClick={checkOutHandler}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;


