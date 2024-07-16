import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './DataTable'; // Adjust the path based on your project structure

interface SkuPrice {
  wholesale_price: number;
  wholesale_expiry_price: number;
  retail_price: number;
  effective_date: string;
  retail_expiry_price: number;
}

interface ProductData {
  id: number;
  name: string;
  product_sku_price: SkuPrice[];
}

const Task: React.FC = () => {
  const [myData, setMyData] = useState<ProductData[]>([]);

  const getDataViaApi = async () => {
    try {
      const response = await axios.get(
        "https://eaf-dms-api.yecor.com/api/pricing/productprice/?warehouse_id=22&ordering=&brand_id=&category_id__id=&variants__group_name__id=&limit=10000&show_future_price=false",
        {
          headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5MSwidXNlcm5hbWUiOiJlYWZydWl0c3VhdHdtQHlvcG1haWwuY29tIiwiZXhwIjoxNzIxNzM2MjgxLCJlbWFpbCI6ImVhZnJ1aXRzdWF0d21AeW9wbWFpbC5jb20iLCJvcmlnX2lhdCI6MTcyMDQ0MDI4MX0.K8jiMtlHbWJu_O5gjQY6Www_Jwbxu_602fD8Q5wwoLc'
          }
        }
      );

      console.log('API response:', response); // Log the entire response
      console.log('API response data:', response.data); // Log the response data

      const data = response.data.results;

      if (Array.isArray(data)) {
        // const filteredData = data.map((item: any) => ({
        //   name: item.name,
        //   id: item.id,
        //   product_sku_price: item.product_sku_price.map((sku: any) => ({
        //     wholesale_price: sku.wholesale_price,
        //     wholesale_expiry_price: sku.wholesale_expiry_price, 
        //     retail_price: sku.retail_price,
        //     effective_date: sku.effective_date,
        //     retail_expiry_price: sku.retail_expiry_price, 
        //   }))
        // }));
        setMyData(data);
      } else {
        console.error("Response data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getDataViaApi();
  }, []);

  return (
    <div>
      <h1>Data fetched, check the console for details.</h1>
      <DataTable data={myData} />
    </div>
  );
}

export default Task;
