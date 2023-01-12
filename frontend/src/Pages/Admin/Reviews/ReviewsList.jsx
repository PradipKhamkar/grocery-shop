import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../../../Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import {
  deleteReviewsAction,
  getAllAdminReviewsAction,
} from "../../../Redux/Actions/reviewsAction";

const ReviewsList = () => {
  const dispatch = useDispatch();
  const {
    loading,
    reviews,
    error: reviewsError,
  } = useSelector((state) => state.adminGetReviews);

  const {
    loading: deleteReviewLoading,
    error: deleteReviewError,
    success: deleteReviewSuccess,
  } = useSelector((state) => state.deleteReview);

  //Delete Review
  const deleteReview = (id) => {
    dispatch(deleteReviewsAction(id));
  };

  useEffect(() => {
    dispatch(getAllAdminReviewsAction());
  }, [deleteReviewSuccess]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        {loading || deleteReviewLoading ? (
          <Loader
            LoadingName={
              deleteReviewLoading ? "Deleting Reviews" : "Fetching Reviews"
            }
          />
        ) : (
          <>
            <div className="dashboard-sub-heading">
              <h1>All Reviews</h1>
            </div>
            {/* {deleteSuccess ? <span>{"Product Deleted..!!"}</span> : ""}
            {deleteProductError ? <span>{deleteProductError}</span> : ""} */}
            <div className="products-table">
              <table>
                <thead>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Ratings</th>
                  <th>Reviews</th>
                  <th>Actions</th>
                </thead>
                {reviews &&
                  reviews.map((review) => {
                    return (
                      <tbody key={review._id}>
                        <td>{review._id}</td>
                        <td>
                          {review.user.firstName + " " + review.user.lastName}
                        </td>
                        <td>{review.ratings}</td>
                        <td>{review.comment}</td>
                        <td
                          onClick={() => {
                            deleteReview(review._id);
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

export default ReviewsList;
