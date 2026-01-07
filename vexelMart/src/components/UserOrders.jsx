import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listMyOrders } from "../components/lib/auth"; // Adjust path
import { useAuth } from "../context/AuthContext"; // Adjust path
import toast from "react-hot-toast";

const UserOrders = () => {

      const { user, logout } = useAuth(); // Assuming you have logout in context
      const navigate = useNavigate();
      
      const [orders, setOrders] = useState([]);
      const [loadingOrders, setLoadingOrders] = useState(true);
    
      // Fetch Orders on load
      useEffect(() => {
        const fetchOrders = async () => {
          try {
            const data = await listMyOrders();
            setOrders(data);
            setLoadingOrders(false);
          } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load orders");
            setLoadingOrders(false);
          }
        };
    
        if (user) {
          fetchOrders();
        } else {
          navigate('/login');
        }
      }, [navigate, user]);

  return (
    <div>
      <div className="">
        <h3 className="text-2xl font-bold leading-6 text-white mb-4">
          My Orders
        </h3>

        {loadingOrders ? (
          <p>Loading Orders...</p>
        ) : orders.length === 0 ? (
          <div className="bg-gray-800 p-6 rounded-lg">
            <p>You haven't placed any orders yet.</p>
            <Link to="/" className="text-indigo-400 mt-2 inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-700 bg-gray-800">
              <thead className="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    DATE
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    TOTAL
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    PAID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    DELIVERED
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Details</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-gray-800">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white">
                      {order._id.substring(0, 10)}...
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                      ${order.totalPrice}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {order.isPaid ? (
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                          Not Paid
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {order.isDelivered ? (
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                          No
                        </span>
                      )}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        to={`/order/${order._id}`}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
