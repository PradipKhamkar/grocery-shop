import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../../../Components/Header/Header";
import "../ViewsProducts/ViewProducts.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Components/Loader/Loader";
import { useEffect } from "react";
import { deleteProductAction } from "../../../../Redux/Actions/productAction";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  deleteCategoryAction,
  getAllCategoryAction,
} from "../../../../Redux/Actions/categoryAction";

const ViewCategory = () => {
  const dispatch = useDispatch();
  const {
    loading,
    Categories,
    error: categoryError,
  } = useSelector((state) => state.getAllCategory);

  const {
    loading: deleteLoading,
    error: deleteCategoryError,
    success: deleteSuccess,
  } = useSelector((state) => state.deleteCategory);

  //Delete Product
  const deleteCategory = (id) => {
    dispatch(deleteCategoryAction(id));
  };

  useEffect(() => {
    dispatch(getAllCategoryAction());
  }, [deleteSuccess]);

  //Delete Product
  const deleteProduct = (id) => {
    dispatch(deleteProductAction(id));
  };
  //   if (deleteProductError) {
  //     setTimeout(() => {
  //       dispatch(clearError());
  //     }, 5000);
  //   }
  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        {loading || deleteLoading ? (
          <Loader
            LoadingName={
              deleteLoading ? "Deleting Category" : "Fetching Category"
            }
          />
        ) : (
          <>
            <div className="dashboard-sub-heading">
              <h1>All Category</h1>
            </div>
            {/* {deleteSuccess ? <span>{"Product Deleted..!!"}</span> : ""}
            {deleteProductError ? <span>{deleteProductError}</span> : ""} */}
            <div className="products-table">
              <table>
                <thead>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th colSpan={2}>Actions</th>
                </thead>
                {Categories &&
                  Categories.map((category) => {
                    return (
                      <tbody key={category._id}>
                        <td>{category._id}</td>
                        <td>{category.categoryName}</td>
                        <td>
                          <img
                            src={category.categoryImage}
                            alt="category Image"
                          />
                        </td>
                        <td>
                          <Link
                            to={`/admin/update/category/${category._id}`}
                            state={{
                              categoryName: category.categoryName,
                              categoryImage: category.categoryImage,
                            }}
                          >
                            <HiPencilAlt />
                          </Link>
                        </td>
                        <td
                          onClick={() => {
                            deleteCategory(category._id);
                          }}
                        >
                          <FaTrash />
                        </td>
                      </tbody>
                    );
                  })}
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ViewCategory;
