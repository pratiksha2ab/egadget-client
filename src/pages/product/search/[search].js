import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { filtersData } from "../../../../utils/filters";

const SearchProduct = () => {
  const [filterItem, setFilterItems] = useState({});

  useEffect(async () => {
    const data = await filtersData();
    console.log(data);
    setFilterItems(data);
  }, []);
  const d = ["A", "B", "C", "A"];
  console.log([...new Set(d)]);
  return (
    <div>
      Filter
      {filterItem?.length > 0 && (
        <div>
          {filterItem?.map((item) => (
            <div>
              <h2>{item?.name}</h2>

              {item?.data?.map((pro) => (
                <div className="mb-2">
                  <Checkbox name={pro}>{pro}</Checkbox>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
