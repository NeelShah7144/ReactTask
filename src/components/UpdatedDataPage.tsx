import React from 'react';
import { useLocation } from 'react-router-dom';

const UpdatedDataPage: React.FC = () => {
  const location = useLocation();
  const { updatedData } = location.state || { updatedData: [] };

  return (
    <div>
      <h2>Updated Data</h2>
      {updatedData.map((product: any) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <ul>
            {product.product_sku_price.map((sku: any, index: number) => (
              <li key={index}>
                
                <ul>
                  <li>
                    <strong>Wholesale Price:</strong> {sku.input_wholesale_price}
                  </li>
                  <li>
                    <strong>Wholesale Expiry Price:</strong> {sku.input_wholesale_expiry_price}
                  </li>
                  <li>
                    <strong>Retail Price:</strong> {sku.input_retail_price}
                  </li>
                  <li>
                    <strong>Retail Expiry Price:</strong> {sku.input_retail_expiry_price}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UpdatedDataPage;
