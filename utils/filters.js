import { API } from "./api";
export const filtersData = async () => {
  const res = await API.get("products/all");
  const product = res?.data;

  let ram = product?.map((item) => item?.ram);
  let storage = product?.map((item) => item?.storage);
  let brand = product?.map((item) => item?.brand);
  let battery = product?.map((item) => item?.battery);
  let screen = product?.map((item) => item?.screen);
  let network = product?.map((item) => item?.network);
  return [
    {
      name: "Ram",
      data: ram,
    },
    {
      name: "Storage",
      data: storage,
    },
    {
      name: "Brand",
      data: brand,
    },
    {
      name: "Battery",
      data: battery,
    },
    {
      name: "Screen",
      data: screen,
    },
    {
      name: "Network connectivity",
      data: network,
    },
  ];
};
