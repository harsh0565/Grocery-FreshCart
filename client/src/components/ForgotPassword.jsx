// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const resetFeedback = () => {
//         setMessage('');
//         setError('');
//     };

//     const handleSendOtp = async () => {
//         resetFeedback();
//         try {
//             const { data } = await axios.post('/api/user/send-otp', { email });
//             if (data?.success) {
//                 setMessage(data.message || 'OTP sent successfully!');
//                 setStep(2);
//             } else {
//                 setError(data.error || 'Failed to send OTP.');
//             }
//         } catch (err) {
//             setError('An error occurred. Please try again later.');
//         }
//     };

//     const handleVerifyOtp = async () => {
//         resetFeedback();
//         try {
//             const { data } = await axios.post('/api/user/verify-otp', { email, otp });
//             if (data?.success) {
//                 setMessage(data.message || 'OTP verified successfully!');
//                 setStep(3);
//             } else {
//                 setError(data.error || 'Invalid OTP.');
//             }
//         } catch (err) {
//             setError('An error occurred. Please try again later.');
//         }
//     };

//     const handleResetPassword = async () => {
//         resetFeedback();
//         try {
//             const { data } = await axios.post('/api/user/forgot-password', { email, newPassword });
//             if (data?.success) {
//                 setMessage(data.message || 'Password reset successfully!');
//                 setStep(1);
//                 setEmail('');
//                 setOtp('');
//                 setNewPassword('');
//             } else {
//                 setError(data.error || 'Failed to reset password.');
//             }
//         } catch (err) {
//             setError('An error occurred. Please try again later.');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
//             <div className="bg-white text-gray-600 w-full max-w-md p-6 md:p-8 rounded-2xl shadow-lg">
//                 <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Forgot Password?</h2>

//                 {step === 1 && (
//                     <>
//                         <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email Address</label>
//                         <input
//                             id="email"
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter your email"
//                             className="w-full mb-4 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 outline-none rounded-md py-3 px-4 text-sm"
//                         />
//                         <button
//                             onClick={handleSendOtp}
//                             className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-md shadow-md transition-transform active:scale-95"
//                         >
//                             Send OTP
//                         </button>
//                     </>
//                 )}

//                 {step === 2 && (
//                     <>
//                         <label htmlFor="otp" className="block mb-1 font-medium text-gray-700">Enter OTP</label>
//                         <input
//                             id="otp"
//                             type="text"
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                             placeholder="Enter the OTP"
//                             className="w-full mb-4 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 outline-none rounded-md py-3 px-4 text-sm"
//                         />
//                         <button
//                             onClick={handleVerifyOtp}
//                             className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-md shadow-md transition-transform active:scale-95"
//                         >
//                             Verify OTP
//                         </button>
//                     </>
//                 )}

//                 {step === 3 && (
//                     <>
//                         <label htmlFor="new-password" className="block mb-1 font-medium text-gray-700">New Password</label>
//                         <input
//                             id="new-password"
//                             type="password"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             placeholder="Enter new password"
//                             className="w-full mb-4 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 outline-none rounded-md py-3 px-4 text-sm"
//                         />
//                         <button
//                             onClick={handleResetPassword}
//                             className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-md shadow-md transition-transform active:scale-95"
//                         >
//                             Reset Password
//                         </button>
//                     </>
//                 )}

//                 {message && <p className="mt-4 text-green-600 text-sm text-center">{message}</p>}
//                 {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;
import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [resettingPassword, setResettingPassword] = useState(false);
    const {navigate} = useAppContext();
    const resetFeedback = () => {
        setMessage('');
        setError('');
    };

    const handleSendOtp = async () => {
        resetFeedback();
        setSendingOtp(true);  // Set sending OTP state to true
        try {
            const { data } = await axios.post('/api/user/send-otp', { email });
            if (data?.success) {
                setMessage(data.message || 'OTP sent successfully!');
                setStep(2);
            } else {
                setError(data.error || 'Failed to send OTP.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setSendingOtp(false);  // Reset sending OTP state after the operation
        }
    };

    const handleVerifyOtp = async () => {
        resetFeedback();
        setVerifyingOtp(true);  // Set verifying OTP state to true
        try {
            const { data } = await axios.post('/api/user/verify-otp', { email, otp });
            if (data?.success) {
                setMessage(data.message || 'OTP verified successfully!');
                setStep(3);
            } else {
                setError(data.error || 'Invalid OTP.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setVerifyingOtp(false);  // Reset verifying OTP state after the operation
        }
    };

    const handleResetPassword = async () => {
        resetFeedback();
        setResettingPassword(true);  // Set resetting password state to true
        try {
            const { data } = await axios.post('/api/user/forgot-password', { email, newPassword });
            if (data?.success) {
                setMessage(data.message || 'Password reset successfully!');
                setStep(1);
                setEmail('');
                setOtp('');
                setNewPassword('');
                navigate("/");

            } else {
                setError(data.error || 'Failed to reset password.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setResettingPassword(false);  // Reset resetting password state after the operation
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="bg-white text-gray-600 w-full max-w-md p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Forgot Password?</h2>

                {step === 1 && (
                    <>
                        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full mb-4 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 outline-none rounded-md py-3 px-4 text-sm"
                        />
                        <button
                            onClick={handleSendOtp}
                            className={`cursor-pointer w-full ${sendingOtp ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-medium py-3 rounded-md shadow-md transition-transform active:scale-95`}
                            disabled={sendingOtp}
                        >
                            {sendingOtp ? "Sending OTP..." : "Send OTP"}
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <label htmlFor="otp" className="block mb-1 font-medium text-gray-700">Enter OTP</label>
                        <input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter the OTP"
                            className="w-full mb-4 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 outline-none rounded-md py-3 px-4 text-sm"
                        />
                        <button
                            onClick={handleVerifyOtp}
                            className={`cursor-pointer w-full ${verifyingOtp ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-medium py-3 rounded-md shadow-md transition-transform active:scale-95`}
                            disabled={verifyingOtp}
                        >
                            {verifyingOtp ? "Verifying OTP..." : "Verify OTP"}
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <label htmlFor="new-password" className="block mb-1 font-medium text-gray-700">New Password</label>
                        <input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full mb-4 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 outline-none rounded-md py-3 px-4 text-sm"
                        />
                        <button
                            onClick={handleResetPassword}
                            className={`cursor-pointer w-full ${resettingPassword ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-medium py-3 rounded-md shadow-md transition-transform active:scale-95`}
                            disabled={resettingPassword}
                        >
                            {resettingPassword ? "Resetting Password..." : "Reset Password"}
                        </button>
                    </>
                )}

                {message && <p className="mt-4 text-green-600 text-sm text-center">{message}</p>}
                {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
