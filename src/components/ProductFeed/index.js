import Product from "../Product";

function ProductFeed({ products }) {
  return (
    <div className=" grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-4 lg:grid-col-4 xl:grid-col-5 -mt-5">
      {products
        .slice(0, 12)
        .map(
          ({
            id,
            title,
            price,
            description,
            category,
            image,
            rate,
            requirePrescription,
          }) => (
            <Product
              key={id}
              id={id}
              title={title}
              category={category}
              price={Number(price)}
              description={description}
              image={image}
              rate={rate}
              requirePrescription={requirePrescription}
            />
          )
        )}
    </div>
  );
}

export default ProductFeed;
