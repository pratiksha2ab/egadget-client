import ProductAddToCart from "../ItemCard";
import Product from "../Product";

function ProductFeed({ products }) {
  return (
    <div className="flex flex-wrap ">
      {products.map(({ id, title, price, brand, category, image }) => (
        <ProductAddToCart
          brand={brand}
          key={id}
          id={id}
          title={title}
          category={category}
          price={Number(price)}
          image={image}
          rate={price}
        />
      ))}
    </div>
  );
}

export default ProductFeed;
