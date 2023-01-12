import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../../../Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProductsAction,
  clearError,
  updateProductAction,
} from "../../../../Redux/Actions/productAction";
import { useEffect } from "react";
import { getAllCategoryAction } from "../../../../Redux/Actions/categoryAction";
import Loader from "../../../../Components/Loader/Loader";
import { useLocation, useParams, useNavigate } from "react-router-dom";
const UpdateProducts = () => {
  const dispatch = useDispatch();
  const Location = useLocation();
  const Navigate = useNavigate();
  const { productId } = useParams();

  const {
    loading,
    Categories,
    error: categoryError,
  } = useSelector((state) => state.getAllCategory);

  const {
    loading: productLoading,
    success,
    error: productError,
    message,
  } = useSelector((state) => {
    return state.updateProduct;
  });

  const [name, setName] = useState(
    Location.state.productName ? Location.state.productName : ""
  );

  const [rate, setRate] = useState(
    Location.state.productRate ? Location.state.productRate : ""
  );

  const [stocks, setStocks] = useState(
    Location.state.productStock ? Location.state.productStock : ""
  );

  const [weight, setWeight] = useState([0.5]);

  const [image, setImage] = useState("");

  const [previewImage, setPreviewImage] = useState(
    Location.state.productImage ? Location.state.productImage : ""
  );

  const [category, setCategory] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  //handel image
  const handelImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setPreviewImage(window.URL.createObjectURL(e.target.files[0]));
  };

  //handel weight
  const handelWeightChecked = (e) => {
    const isChecked = e.target.checked;
    const convertNumber = Number(e.target.value);
    const isExit = weight.includes(convertNumber);
    if (isChecked) {
      weight.push(convertNumber);
    } else {
      const index = weight.indexOf(convertNumber);
      weight.splice(index, 1);
    }
  };

  const handelAddProductSubmit = (e) => {
    e.preventDefault();
    if (category == "") {
      alert("Category:Select Category..!!");
    } else {
      const productFormData = new FormData();
      productFormData.append("name", name);
      productFormData.append("rate", rate);
      productFormData.append("stocks", stocks);
      productFormData.append("category", category);
      weight.map((kg) => {
        productFormData.append("kilogramOption", kg);
      });
      productFormData.append("image", image);
      dispatch(updateProductAction(productId, productFormData));
    }
  };

  if (productError) {
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }

  useEffect(() => {
    dispatch(getAllCategoryAction());
  }, [success]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        {loading || productLoading ? (
          <Loader LoadingName={"Loading Product"} />
        ) : (
          <>
            <div className="dashboard-sub-heading">
              <h1>Update Product</h1>
            </div>
            <div className="add-product-form-box">
              <form
                encType="multipart/form-data"
                onSubmit={(e) => {
                  handelAddProductSubmit(e);
                }}
              >
                <div className="product-name">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="product-rate">
                  <input
                    type="number"
                    placeholder="Rate /Kg"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    required
                  />
                </div>
                <div className="product-stocks">
                  <input
                    type="number"
                    placeholder="Stocks"
                    value={stocks}
                    onChange={(e) => setStocks(e.target.value)}
                    required
                  />
                </div>
                <span>Select Weight </span>
                <div className="product-weight">
                  <br />
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="0.5"
                      checked
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">0.5 KG</label>
                  </div>
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="1"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">1 KG</label>
                  </div>
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="1.5"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">1.5 KG</label>
                  </div>
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="2"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">2 KG</label>
                  </div>{" "}
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="2.5"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">2.5 KG</label>
                  </div>
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="3"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">3 KG</label>
                  </div>
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="3.5"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">3.5 KG</label>
                  </div>
                </div>
                <br />
                <div className="product-category">
                  <select
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    required
                  >
                    <option value="">Choose Category</option>
                    {Categories &&
                      Categories.map((category) => {
                        return (
                          <option value={category._id}>
                            {category.categoryName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <br />
                <br />
                <div className="product-image">
                  <input
                    type="file"
                    accept="images/*"
                    onChange={(e) => {
                      handelImageChange(e);
                    }}
                  />
                </div>
                <div className="product-preview">
                  {previewImage ? <img src={previewImage} alt="" /> : ""}
                </div>

                {productError ? (
                  <div className="upload-error">
                    <h1>{productError}</h1>
                  </div>
                ) : (
                  ""
                )}
                {updateSuccess ? (
                  <div className="upload-error">
                    <h1>{message}</h1>
                  </div>
                ) : (
                  ""
                )}
                <div className="add-product-form-btn">
                  <button type="submit">Update Product</button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UpdateProducts;
