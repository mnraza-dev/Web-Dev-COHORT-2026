import Skeleton from "./Skeleton";

const CatCard = ({ data = {} }) => {
  const {
    image = null,
    loading = false,
    error = null,
    getRandomCatImage = () => { },
  } = data;

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-[480px] text-center space-y-4">

      <h1 className="text-xl font-semibold text-gray-800">
        🐱 Random Cat Viewer
      </h1>

      <div className="w-[400px] h-[300px] mx-auto">

        {loading && <Skeleton />}

        {!loading && !error && image && (
          <img
            src={image}
            alt="Random Cat"
            className="w-full h-full object-cover rounded-xl transition-opacity duration-500"
          />
        )}
      </div>

      {error && (
        <div className="space-y-2">
          <p className="text-red-500 text-sm">{error}</p>
          <button
            onClick={getRandomCatImage}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      )}

      <button
        onClick={getRandomCatImage}
        disabled={loading}
        className={`w-full py-2 cursor-pointer rounded-lg text-white font-medium transition 
          ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
          }`}
      >
        {loading ? "Fetching..." : "Get New Cat"}
      </button>
    </div>
  );
};

export default CatCard;