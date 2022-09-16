import Product from "../Product";

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 -mt-10 md:-mt-30 ">
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
