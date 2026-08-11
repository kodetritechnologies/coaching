import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import BasicProvider from "../authentications/BasicProvider";

function MultiSelectDropdown({ endPoint, value, setValue }) {
  const basicProvider = BasicProvider();

  async function loadOptions(search, loadedOptions, { page }) {
    try {
      const response = await basicProvider.getMethod(
        `${endPoint}?page=${page}&search=${search || ""}`
      );

      const resData = response.data?.data;

      return {
        options:
          resData?.map((item) => ({
            label: item.name,
            value: item._id,
          })) || [],
        hasMore: resData?.hasNextPage || false,
        additional: {
          page: (resData?.page || 1) + 1,
        },
      };
    } catch (error) {
      console.error("Error loading options:", error);
      return {
        options: [],
        hasMore: false,
        additional: {
          page: page,
        },
      };
    }
  }

  return (
    <AsyncPaginate
      value={value}
      loadOptions={loadOptions}
      isMulti
      closeMenuOnSelect={false}
      onChange={setValue}
      additional={{ page: 1 }}
      defaultOptions
    />
  );
}

export default MultiSelectDropdown;
