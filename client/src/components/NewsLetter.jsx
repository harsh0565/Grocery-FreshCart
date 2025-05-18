import { useAppContext } from "../context/AppContext";

const NewsLetter = () => {
    const {user}  =useAppContext();
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-4 px-6 md:px-0 mt-16">
            <h1 className="text-3xl md:text-4xl font-semibold text-primary-dull animate-typing">
                Never Miss a Deal!
            </h1>

            <p className="text-lg text-gray-600 md:text-xl mb-6">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts.
            </p>

            <form className="flex flex-col sm:flex-row items-center justify-between max-w-3xl w-full space-y-4 sm:space-y-0 sm:space-x-4">
                
                <input
                    value={user?.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
                    type="email"
                    placeholder="Enter your email id"
                    required
                />

                <button
                    type="submit"
                    className="cursor-pointer w-full sm:w-auto mt-4 sm:mt-0 px-8 py-3 bg-primary text-white rounded-md shadow-md hover:bg-primary-dull focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
}

export default NewsLetter;
