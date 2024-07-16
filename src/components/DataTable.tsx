import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProductSkuPrice {
  wholesale_price: any;
  wholesale_expiry_price: any;
  retail_price: any;
  retail_expiry_price: any;
}

interface ProductData {
  id: any;
  name: any;
  product_sku_price: ProductSkuPrice[];
}

interface DataTableProps {
  data: ProductData[];
}

type ProductSkuPriceKeys = keyof ProductSkuPrice;

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [editableData, setEditableData] = useState<ProductData[]>(data);
  const [originalData, setOriginalData] = useState<ProductData[]>(data);
  const [changes, setChanges] = useState<Map<string, any>>(new Map());
  const [validationErrors, setValidationErrors] = useState<Map<string, string>>(
    new Map()
  );
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setEditableData(data);
    setOriginalData(data);
    setChanges(new Map());
    setValidationErrors(new Map());
    setSubmitted(false); // Reset submitted state
  }, [data]);

  const handleInputChange = (
    productIndex: number,
    skuIndex: number,
    field: any,
    value: any
  ) => {
    // Check if the entered value is numeric
    if (/^\d*\.?\d*$/.test(value)) {
      // Display an error message or handle as per your UI/UX design
      const updatedData: any = [...editableData];

      // Initialize product_sku_price array if it's undefined
      if (!updatedData[productIndex].product_sku_price) {
        updatedData[productIndex].product_sku_price = [{} as ProductSkuPrice];
      }

      // Ensure the skuIndex exists
      if (!updatedData[productIndex].product_sku_price[skuIndex]) {
        updatedData[productIndex].product_sku_price[skuIndex] =
          {} as ProductSkuPrice;
      }

      // Update the changed field
      updatedData[productIndex].product_sku_price[skuIndex][field] = value;

      // Mark this field as changed
      const changeKey = `${productIndex}-${skuIndex}-${field}`;
      setChanges((prevChanges) => new Map(prevChanges).set(changeKey, value));

      setEditableData(updatedData);
    }
  };

  const validateData = () => {
    const newErrors = new Map();

    editableData.forEach((product, productIndex) => {
      product.product_sku_price.forEach((sku: any, skuIndex) => {
        const changesKeyPrefix = `${productIndex}-${skuIndex}-`;

        // Check if any of the fields are changed for this SKU
        const fieldsChanged = [
          "input_wholesale_price",
          "input_wholesale_expiry_price",
          "input_retail_price",
          "input_retail_expiry_price",
        ].some((key) => changes.has(changesKeyPrefix + key));

        if (fieldsChanged) {
          // Check if each required field is filled
          const fieldErrors: any = {};
          [
            "input_wholesale_price",
            "input_wholesale_expiry_price",
            "input_retail_price",
            "input_retail_expiry_price",
          ].forEach((key) => {
            if (!sku[key]) {
              fieldErrors[key] = "This field is required.";
            }
          });

          if (Object.keys(fieldErrors).length > 0) {
            newErrors.set(`${productIndex}-${skuIndex}`, fieldErrors);
          }
        }
      });
    });

    setValidationErrors(newErrors);
    return newErrors.size === 0;
  };

  const handleSubmit = () => {
    if (!validateData()) {
      //alert('Please fill all required fields before submitting.');
      return;
    }

    const updatedData = editableData.map((product, productIndex) => {
      const updatedSkus = product.product_sku_price.map((sku, skuIndex) => {
        const changesKeyPrefix = `${productIndex}-${skuIndex}-`;
        const updatedSku: Partial<ProductSkuPrice> = {};

        (Object.keys(sku) as ProductSkuPriceKeys[]).forEach((key) => {
          const changeKey = changesKeyPrefix + key;
          if (changes.has(changeKey)) {
            updatedSku[key] = changes.get(changeKey);
          }
        });

        return updatedSku;
      });

      return {
        ...product,
        product_sku_price: updatedSkus,
      };
    });

    const onlyUpdatedData = updatedData.filter((product) =>
      product.product_sku_price.some((sku) => Object.keys(sku).length > 0)
    );

    // Update placeholders with the submitted values
    setOriginalData(editableData);
    setSubmitted(true);

    // Call API to update the data (assuming you have a function for this)
    // updateApiData(onlyUpdatedData);

    navigate("/updated-data", { state: { updatedData: onlyUpdatedData } });
  };

  const handleCancel = () => {
    setEditableData(originalData); // Reset to original data
    setChanges(new Map()); // Clear any tracked changes
    setValidationErrors(new Map()); // Clear validation errors
    setSubmitted(false); // Reset submitted state
  };

  return (
    <div>
      <h2>Product Data Table</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Wholesale Price</th>
            <th>Wholesale Expiry Price</th>
            <th>Retail Price</th>
            <th>Retail Expiry Price</th>
          </tr>
        </thead>
        <tbody>
          {editableData.map((product: any, productIndex: any) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              {[
                "input_wholesale_price",
                "input_wholesale_expiry_price",
                "input_retail_price",
                "input_retail_expiry_price",
              ].map((field: any, skuIndex: any) => (
                <td key={field}>
                  <input
                    type="text"
                    value={product.product_sku_price[0]?.[field] || ""}
                    placeholder={
                      product.product_sku_price.length > 0
                        ? product.product_sku_price[0][
                            field.replace("input_", "")
                          ] || "0.00"
                        : "0.00"
                    }
                    onChange={(e) =>
                      handleInputChange(productIndex, 0, field, e.target.value)
                    }
                  />
                  {validationErrors.get(`${productIndex}-0`)?.[field] && (
                    <span className="error">
                      {validationErrors.get(`${productIndex}-0`)?.[field]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>{" "}
      </table>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default DataTable;
