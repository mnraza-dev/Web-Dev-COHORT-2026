import { useEffect, useState, useRef } from "react";
import Skeleton from "./components/Skeleton";
import CatCard from "./components/CatCard";
const App = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);

  const getRandomCatImage = async () => {
    if (controllerRef.current) controllerRef.current.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(import.meta.env.VITE_API_URL,
        { signal: controller.signal }
      );

      if (!response.ok) throw new Error("Failed to fetch cat image");

      const data = await response.json();
      const imageUrl = data?.data?.image;

      if (!imageUrl) throw new Error("Invalid API response");

      setImage(imageUrl);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomCatImage();
    return () => controllerRef.current?.abort();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <CatCard data={{ image, loading, error, getRandomCatImage }} />

    </div>);
};

export default App;