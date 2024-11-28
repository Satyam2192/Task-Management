
const Loader = () => {

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-purple-600 border-t-transparent"></div>
            <p className="ml-4 text-gray-600">Loading...</p>
        </div>
    );
};

export default Loader;