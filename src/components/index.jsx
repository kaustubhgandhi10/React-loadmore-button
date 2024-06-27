import { useEffect, useState } from "react";
import "./styles.css";

export default function LoadMoreButton() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${
          count === 0 ? 0 : count * 10
        }`
      );
      const data = await res.json();

      if (data && data.products && data.products.length) {
        setProducts((prevData) => [...prevData, ...data.products]);
        setLoading(false);
      }
      console.log(data);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 194) setDisableButton(true);
  }, [products]);

  if (loading) {
    return <div>Loading Data ! Please Wait</div>;
  }

  return (
    <div className="container">
      <div className="product-container">
        {products && products.length
          ? products.map((item) => (
              <div className="product" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container">
        <button disabled={disableButton} onClick={() => setCount(count + 1)}>
          Load More Products
        </button>
        {disableButton ? <p>You have reached to 100 products</p> : null}
      </div>
    </div>
  );
}
