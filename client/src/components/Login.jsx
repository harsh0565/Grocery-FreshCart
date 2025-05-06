import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
    const [state, setState] = useState("login"); // 'login' or 'register'
    const [step, setStep] = useState("start"); // 'start' -> 'otp-sent' -> 'verified'
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [otpSending, setOtpSending] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const { setShowUserLogin, setUser, navigate } = useAppContext();
    const formRef = useRef();

    // Send OTP
    const handleSendOtp = async () => {
        if (!name || !email) {
            toast.error("Please fill in name and email.");
            return;
        }
        setOtpSending(true);
        try {
            const { data } = await axios.post("/api/user/send-otp", { name, email, }); // dummy password
            if (data?.success) {
                toast.success("OTP sent to your email.");
                setStep("otp-sent");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send OTP.");
        }finally {
            setOtpSending(false); // stop loading
        }
    };

    // Verify OTP
    const handleVerifyOtp = async () => {
        if (!otp) return toast.error("Enter the OTP.");
        try {
            const { data } = await axios.post("/api/user/verify-otp", { email, otp });
            if (data?.success) {
                toast.success("Email verified!");
                setStep("verified");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid OTP.");
        }
    };

    // Final Registration or Login
    const onSubmitHandler = async (e) => {
        e.preventDefault();


        if (!email || !password || (state === "register" && !name)) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const payload = state === "login"
            ? { email, password }
            : { name, email, password };

        const endpoint = state === "login" ? "/api/user/login" : "/api/user/register";

        try {
            const { data } = await axios.post(endpoint, payload);
            if (data?.success) {
                setUser(data.user);
                toast.success(`${state === "login" ? "Logged in" : "Registered"} successfully!`);
                setShowUserLogin(false);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong.";
            toast.error(message); // <- use the message from the server!
        }
    };

    // Close modal on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShowUserLogin(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowUserLogin]);

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm justify-center bg-black/50">
            <form
                ref={formRef}
                onSubmit={onSubmitHandler}
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
            >
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>

                {state === "register" && (
                    <>
                        <div className="w-full">
                            <p>Name</p>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                type="text"
                                placeholder="Enter your name"
                                required
                                disabled={step !== "start"}
                            />
                        </div>
                        <div className="w-full">
                            <p>Email</p>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                type="email"
                                placeholder="Enter your email"
                                required
                                disabled={step !== "start"}
                            />
                        </div>
                        {step === "start" && (
                           <button
                           type="button"
                           className={`${!name || !email ? "cursor-not-allowed" : "cursor-pointer"} bg-primary hover:bg-primary-dull text-white w-full py-2 rounded-md disabled:opacity-50`}
                           onClick={handleSendOtp}
                           disabled={otpSending}
                       >
                           {otpSending ? "Sending OTP..." : "Send OTP"}
                       </button>
                        )}
                        {step === "otp-sent" && (
                            <>
                                <div className="w-full">
                                    <p>Enter OTP</p>
                                    <input
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                        placeholder="6-digit OTP"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="cursor-pointer bg-primary hover:bg-primary-dull text-white w-full py-2 rounded-md"
                                    onClick={handleVerifyOtp}
                                >
                                    Verify Email
                                </button>
                            </>
                        )}
                        {step === "verified" && (
                            <>
                                <div className="w-full">
                                    <p>Create Password</p>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                        type="password"
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="cursor-pointer bg-primary hover:bg-primary-dull text-white w-full py-2 rounded-md"
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </>
                )}

                {state === "login" && (
                    <>
                        <div className="w-full">
                            <p>Email</p>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <p>Password</p>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                type="password"
                                placeholder="Enter password"
                                required
                            />
                        <Link onClick={()=> {navigate('/forgot-password'); window.location.reload(); scrollTo(0,0)}} className="text-blue-500 cursor-pointer mb-3 mt-5" >Forgot Password</Link>
                        </div>
                        <button
                            type="submit"
                            className="cursor-pointer bg-primary hover:bg-primary-dull text-white w-full py-2 rounded-md"
                        >
                            Login
                        </button>
                    </>
                )}

                <p className="text-sm mt-2">
                    {state === "login" ? (
                        <>Create an account?{" "}
                            <span onClick={() => { setState("register"); setStep("start"); }} className="text-indigo-500 cursor-pointer">Click here</span>
                        </>
                    ) : (
                        <>Already have an account?{" "}
                            <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">Click here</span>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
};

export default Login;

