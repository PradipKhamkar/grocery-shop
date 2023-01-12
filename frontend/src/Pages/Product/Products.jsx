import React from "react";
import "./Product.css";
import Header from "../../Components/Header/Header";
import { BsCartXFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { BiSortUp } from "react-icons/bi";
import Footer from "../../Components/Footer/Footer";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../Redux/Actions/productAction";
import Loader from "../../Components/Loader/Loader";
import { addToCartAction } from "../../Redux/Actions/cartAction";
import { useState } from "react";
import { getAllCategoryAction } from "../../Redux/Actions/categoryAction";
import NotFoundCart from "../../Components/NotFoundCart/NotFoundCart";
import { useParams, useSearchParams } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const [headingCategory, setHeadingCategory] = useState("Products");
  const [searchParams, setSearchParams] = useSearchParams();

  //Get Product From State
  const {
    loading,
    products,
    productsCount,
    error: productError,
  } = useSelector((state) => state.getAllProducts);

  //Get Category From State
  const {
    loading: categoryLoading,
    Categories,
    success,
    error: categoryError,
  } = useSelector((state) => state.getAllCategory);

  //Get Cart Item
  const { cartItems } = useSelector((state) => state.userCart);

  //Filter Product
  const [FilterCategory, setFilterCategory] = useState([]);
  const [price, setPrice] = useState("0-10000");
  const [ApplyError, setApplyError] = useState();
  const [clearFilter, setClearFilter] = useState(false);

  const handelCategoryClick = (e, category) => {
    if (FilterCategory.includes(category)) {
      const categoryIndexNum = FilterCategory.indexOf(category);
      FilterCategory.splice(categoryIndexNum, 1);
      e.target.classList.remove("selected-category");
    } else {
      FilterCategory.push(category);
      e.target.classList.add("selected-category");
    }
  };

  const ApplyFilterBtnClick = () => {
    if (price || FilterCategory.length != 0) {
      dispatch(getAllProductsAction(price, FilterCategory));
      setFilterCategory([]);
      setPrice();
      setApplyError();
      setClearFilter(true);
      setHeadingCategory("Products");
    } else {
      setApplyError("Please Select Filters..!!");
      setTimeout(() => {
        setApplyError(setApplyError());
      }, 5000);
    }
  };

  //Clear Filter
  const clearFilterBtnClick = () => {
    if (clearFilter) {
      dispatch(getAllProductsAction());
      dispatch(getAllCategoryAction());
      setClearFilter(false);
      setHeadingCategory("Products");
    }
  };

  //Add Product To Cart
  const [quantity, setQuantity] = useState(0.5);
  const AddToCart = (id) => {
    dispatch(addToCartAction(id, quantity));
  };

  // Toggle Filter Section
  const filterSection = useRef();
  const toggleFilterSection = () => {
    filterSection.current.classList.toggle("toggle-filter");
  };

  //Get Search Keyword && Category
  const { keyword } = useParams();
  const categoryId = searchParams.get("categoryId");
  const categoryName = searchParams.get("categoryName");

  useEffect(() => {
    document.title = `Fresh Products`;
    if (keyword) {
      dispatch(getAllProductsAction(price, FilterCategory, keyword));
      dispatch(getAllCategoryAction());
      setHeadingCategory("Product");
    } else if (categoryId) {
      dispatch(getAllProductsAction(price, categoryId, keyword));
      dispatch(getAllCategoryAction());
      setHeadingCategory(categoryName);
    } else {
      dispatch(getAllProductsAction());
      dispatch(getAllCategoryAction());
      setHeadingCategory("Products");
    }
  }, [keyword, categoryId]);

  return (
    <>
      <Header />
      {(loading && categoryLoading) || loading ? (
        <Loader LoadingName={"Fetching Products"} />
      ) : (
        <div className="products-container">
          <h1 className="Heading regHeading">
            Fresh <span>{headingCategory}</span>
          </h1>
          {productError || categoryError ? (
            <>
              <NotFoundCart msg={"Something Went's To Wrong"} />
              <br />
            </>
          ) : (
            <>
              <a href="#filter-section">
                <div
                  id="toggle-btn"
                  className="cart-toggle-btn"
                  onClick={toggleFilterSection}
                >
                  <BiSortUp />
                  <span>Filter</span>
                </div>
              </a>
              <div
                className="products-filter"
                id="filter-section"
                ref={filterSection}
              >
                {""}
                <div className="category-box">
                  <h2>Categories</h2>
                  <ul>
                    {Categories &&
                      Categories.map((category) => {
                        return (
                          <li
                            key={category._id}
                            onClick={(e) => {
                              handelCategoryClick(e, category._id);
                            }}
                          >
                            {" "}
                            Fresh {category.categoryName}
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <div className="price-filter">
                  <h2>Price</h2>
                  <select onChange={(e) => setPrice(e.target.value)}>
                    <option value="">Price Range</option>
                    <option value="0-20">₹ 0 - ₹ 20/Kg</option>
                    <option value="20-40">₹ 20 - ₹ 40/Kg</option>
                    <option value="40-60">₹ 40 - ₹ 60/Kg</option>
                    <option value="60-80">₹ 60 - ₹ 80/Kg</option>
                    <option value="80-100">₹ 80 - ₹ 100/Kg</option>
                    <option value="100-120">₹ 100 - ₹ 120/Kg</option>
                  </select>
                </div>

                <div className="filter-btn">
                  <button onClick={ApplyFilterBtnClick}>Apply Filter</button>
                  {clearFilter ? (
                    <button
                      className="clearFilterBtn"
                      onClick={clearFilterBtnClick}
                    >
                      Clear Filter
                    </button>
                  ) : (
                    ""
                  )}

                  {ApplyError ? (
                    <h6 className="applyFilterError ">
                      Please Select Filter First..!!
                    </h6>
                  ) : (
                    ""
                  )}
                </div>

                {""}
              </div>

              <div className="products-list">
                {products.length !== 0 ? (
                  <div className="products-list-box">
                    {products &&
                      products.map((product) => {
                        return (
                          <div className="product-cart" key={product._id}>
                            {cartItems.map((item) => {
                              return item.name === product.name ? (
                                <span className="product-cart-item-qty">
                                  {item.quantity} kg in cart
                                </span>
                              ) : (
                                ""
                              );
                            })}

                            <img src={product.url} alt="" />
                            <h2>{product.name}</h2>
                            <div className="price">₹ {product.rate}/Kg</div>
                            <div className="product-qty">
                              {product.stocks <= 0 ? (
                                <h5 className="product-out-of-stock">
                                  OUT OF STOCK {""}
                                  <BsCartXFill />
                                </h5>
                              ) : (
                                <>
                                  <select
                                    onChange={(e) => {
                                      setQuantity(e.target.value);
                                    }}
                                  >
                                    {product.kilogramOption.map((weight) => {
                                      return (
                                        <option value={weight.$numberDecimal}>
                                          {weight.$numberDecimal} Kg
                                        </option>
                                      );
                                    })}
                                  </select>
                                  <button
                                    onClick={() => {
                                      AddToCart(product._id);
                                    }}
                                  >
                                    <FaCartPlus />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <NotFoundCart msg={"Sorry Products Not Found"} />
                )}
              </div>
            </>
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Products;
