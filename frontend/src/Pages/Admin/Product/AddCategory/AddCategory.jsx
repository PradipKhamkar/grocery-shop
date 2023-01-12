import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../../../Components/Header/Header";
import { addCategoryAction } from "../../../../Redux/Actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";

const AddCategory = () => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.addCategory);

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //handel image
  const handelImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        setCategoryImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setPreviewImage(window.URL.createObjectURL(e.target.files[0]));
  };

  //handel submit
  const handelAddCategorySubmit = (e) => {
    e.preventDefault();
    const categoryData = new FormData();
    categoryData.append("categoryName", categoryName);
    categoryData.append("categoryImage", categoryImage);
    dispatch(addCategoryAction(categoryData));
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        <div className="dashboard-sub-heading">
          <h1>Add Category</h1>
        </div>
        <div className="add-product-form-box">
          <form
            encType="multipart/form-data"
            onSubmit={(e) => handelAddCategorySubmit(e)}
          >
            <div className="product-name">
              <input
                type="text"
                value={categoryName}
                placeholder="Category Name"
                required
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div className="product-image">
              <input
                type="file"
                accept="images/*"
                required
                onChange={(e) => handelImageChange(e)}
              />
            </div>
            <div className="product-preview">
              {previewImage ? <img src={previewImage} alt="" /> : ""}
            </div>
            {error ? (
              <div className="upload-error">
                <h1>{error}</h1>
              </div>
            ) : (
              ""
            )}

            {success ? (
              <div className="upload-error">
                <h1>Category Added..!!</h1>
              </div>
            ) : (
              ""
            )}
            <div className="add-product-form-btn">
              <button>Add Category</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
