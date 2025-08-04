import { assets, plans } from '../assets/assets.js';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';    

function BuyCredit() {
    const { user, backendUrl, token, setShowLogin,getCredits } = useContext(AppContext);
    const navigate = useNavigate();

    const paymentRazorPay = async (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_API_KEY,
            amount: order.amount,
            currency: order.currency,
            name: "Imagify",
            description: "Purchase Credits",
            image: assets.logo,
            order_id: order.id,
            handler: async (response) => {
                console.log("Payment successful:", response);
                try {
                    const { data } = await axios.post(
                        `${backendUrl}/api/user/verify-razor`,response,
                        { headers: { token } }
                    );
                    if (data.success) {
                        getCredits();
                        navigate('/')
                        toast.success("Payment successful! Credits added.");
                    }
                } catch (error) {
                    toast.error("Error verifying payment:", error);
                    
                }
            }
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const initpay = async (plan) => {
        try {
            if (!user) {
                setShowLogin(true);
                return;
            }
            const { data } = await axios.post(
                backendUrl + '/api/user/pay-razor',
                { planId: plan.id },
                { headers: { token } }
            );
            if (data.success) {
                paymentRazorPay(data.order);
            }
        } catch (error) {
            console.error("Error during Razorpay payment:", error);
        }
    };

    return (
        <div className="h-screen flex flex-col justify-start mt-20 items-center bg-gradient-to-br from-blue-50 to-purple-50">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 mb-6 rounded-full px-4 py-2 font-semibold transition shadow cursor-pointer">
                Our Plans
            </button>
            <h2 className="text-3xl font-bold mb-12 text-center text-blue-800">Buy Credits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 w-full max-w-6xl justify-items-center">
                {plans.map(plan => (
                    <div
                        key={plan.id}
                        className="border border-blue-100 rounded-3xl p-10 shadow-xl bg-white/80 flex flex-col items-center w-full max-w-xs transition hover:shadow-2xl"
                    >
                        <h3 className="text-2xl font-semibold mb-3 text-center text-blue-700">{plan.id}</h3>
                        <p className="text-gray-600 mb-2 text-center">
                            Price: <span className="font-bold text-blue-600">${plan.price}</span>
                        </p>
                        <p className="text-gray-600 mb-2 text-center">
                            Credits: <span className="font-bold text-blue-600">{plan.credits}</span>
                        </p>
                        <p className="text-gray-400 mb-8 text-center">{plan.desc}</p>
                        <button
                            onClick={() => initpay(plan)}
                            className="mt-auto bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl px-7 py-2 font-semibold transition shadow cursor-pointer"
                        >
                            {user ? 'Buy Now' : 'Get Started'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BuyCredit;
