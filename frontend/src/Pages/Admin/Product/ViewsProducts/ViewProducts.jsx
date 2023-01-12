import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../../../Components/Header/Header";
import "./ViewProducts.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Components/Loader/Loader";
import { useEffect } from "react";
import {
  clearError,
  deleteProductAction,
  getAllProductsAction,
} from "../../../../Redux/Actions/productAction";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

const ViewProducts = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.getAllProducts
  );
  const {
    loading: deleteLoading,
    error: deleteProductError,
    DeletedProduct,
    success: deleteSuccess,
  } = useSelector((state) => state.deleteProduct);

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [deleteSuccess]);

  //Delete Product
  const deleteProduct = (id) => {
    dispatch(deleteProductAction(id));
  };

  if (deleteProductError) {
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        {loading || deleteLoading ? (
          <Loader
            LoadingName={
              deleteLoading ? "Deleting Product" : "Fetching Products"
            }
          />
        ) : (
          <>
            <div className="dashboard-sub-heading">
              <h1>All Products</h1>
            </div>
            {deleteSuccess ? <span>{"Product Deleted..!!"}</span> : ""}
            {deleteProductError ? <span>{deleteProductError}</span> : ""}
            <div className="products-table">
              <table>
                <thead>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Rate</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th colSpan={2}>Actions</th>
                </thead>
                {products &&
                  products.map((product) => {
                    return (
                      <tbody key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>
                          <img src={product.url} alt="product Image" />
                        </td>
                        <td>₹ {product.rate}/Kg</td>
                        <td>{product.category.categoryName}</td>
                        <td>{product.stocks}</td>
                        <td
                          style={{
                            fontWeight: 500,
                            textTransform: "uppercase",
                            color: product.stocks <= 0 ? "red" : "green",
                          }}
                        >
                          {product.stocks <= 0 ? "Out Of Stock" : "In Stock"}
                        </td>

                        <td>
                          <Link
                            to={`/admin/update/products/${product._id}`}
                            state={{
                              productName: product.name,
                              productRate: product.rate,
                              productStock: product.stocks,
                              productCategory: product.category.categoryName,
                              productImage: product.url,
                              productWeight: product.kilogramOption,
                            }}
                          >
                            <HiPencilAlt />
                          </Link>
                        </td>

                        <td
                          className="admin-delete-products-icon"
                          onClick={() => {
                            deleteProduct(product._id);
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

export default ViewProducts;
