import Product from "../Product";

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 -mt-10 md:-mt-30 ">
      {products.map(
          ({
            id,
            title,
            price,
           
            category,
            image,
          
            }) => (
            <Product
              key={id}
              id={id}
              title={title}
              category={category}
              price={Number(price)}
            
              image={image}
              rate={price}
            />
          )
        )}
    </div>
  );
}

export default ProductFeed;
