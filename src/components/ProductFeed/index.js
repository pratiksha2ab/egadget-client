import Product from "../Product";

function ProductFeed({ products }) {
  return (
    <div className=" grid grid-flow-row-dense md:grid-cols-4 lg:grid-col-4 xl:grid-col-5 md:-mt-52">
      {products.map(({ id, title, price, description, category, image, rate }) => (
        <Product
          key={id}
          id={id}
          title={title}
          category={category}
          price={price}
          description={description}
          image={image}
          rate={rate}
        />
      ))}
    </div>
  );
}

export default ProductFeed;
