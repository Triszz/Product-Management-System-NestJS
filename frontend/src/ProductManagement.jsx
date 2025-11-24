import { useMemo, useState, useEffect } from "react";
import { useContext } from "react";
import ThemeContext from "./ThemeContext";
import { ProductAPI } from "./services/api";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [searchName, setSearchName] = useState("");
  const [result, setResult] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await ProductAPI.getAll();
      setProducts(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const maxId = () => {
    let maxId = 0;
    for (const product of products) {
      maxId = Math.max(maxId, product.id);
    }
    return maxId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const newProduct = {
      id: maxId() + 1,
      name: name.trim(),
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };
    try {
      await ProductAPI.create({
        name: name.trim(),
        quantity: parseInt(quantity),
        price: parseFloat(price),
      });
      setProducts([...products, newProduct]);
      setName("");
      setQuantity("");
      setPrice("");
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const product = products.find(
      (product) =>
        product.name.toLowerCase() === searchName.trim().toLowerCase()
    );
    if (!product) {
      setResult(-1);
    } else {
      setResult({
        name: product.name,
        quantity: parseInt(product.quantity),
        price: parseFloat(product.price),
      });
    }
  };

  const totalValue = useMemo(() => {
    let total = 0;
    for (const product of products) {
      total += product.price * product.quantity;
    }
    return total;
  }, [products]);

  return (
    <div className="min-h-screen flex justify-center items-start py-1 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-8">
          Product Management System
        </h1>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <div className="product-list mb-8">
            <h2 className="text-lg font-medium mb-4">Product list</h2>
            <ol className="list-decimal list-inside space-y-2">
              {products.map((product) => (
                <li key={product.id} className="pl-2">
                  {product.name} - Quantity: {product.quantity} - Price:{" "}
                  {product.price}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="product-form mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h2 className="text-lg font-medium mb-4">Add product form</h2>
            <label className="mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border-2 border-gray-400 rounded mb-4"
            />
            <label className="mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full p-2 border-2 border-gray-400 rounded mb-4"
            />
            <label className="mb-2">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-2 border-2 border-gray-400 rounded mb-4"
            />
            <button
              type="submit"
              className={`w-full rounded p-3 hover:cursor-pointer ${
                theme === "light"
                  ? "bg-blue-400 text-white"
                  : "bg-gray-800 text-gray-500"
              } hover:opacity-90`}
            >
              Add product
            </button>
          </form>
        </div>
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <div className="mt-2 list-disc list-inside">
              {errors.map((error, index) => (
                <div key={index}>{error.errors.join(", ")}</div>
              ))}
            </div>
          </div>
        )}

        <div className="search-product mb-8">
          <form onSubmit={handleSearch} className="flex flex-col">
            <h2 className="text-lg font-medium mb-4">Search product</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                required
                placeholder="Enter product name"
                className="flex-1 p-2 border-2 border-gray-400 rounded"
              />
              <button
                type="submit"
                className={`px-6 rounded hover:cursor-pointer ${
                  theme === "light"
                    ? "bg-blue-400 text-white"
                    : "bg-gray-800 text-gray-500"
                } hover:opacity-90`}
              >
                Search
              </button>
            </div>
          </form>
          {result === -1 && (
            <div className="text-red-600">
              <strong>Product not found!</strong>
            </div>
          )}
          {result !== -1 && result && (
            <div className="text-green-600">
              <strong>Found:</strong> {result.name} - Quantity:{" "}
              {result.quantity} - Price: {result.price}
            </div>
          )}
        </div>

        <div className="total-value text-center">
          <strong className="text-lg">Total value: {totalValue}</strong>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
