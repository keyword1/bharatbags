import React, { useEffect, useState } from "react";
import { X, Star } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App";

const ReviewModal = ({
  isOpen,
  onClose,
  userId,
  userName,
  productId,
  orderId,
  onReviewSubmitted,
}) => {
  const [rating, setRating] = useState(4.75); // default mid-point
  const [review, setReview] = useState("");
  const [history, setHistory] = useState("");

  //   useEffect(async () => {
  //     try {
  //       //   const data = await axios.get();
  //     } catch (error) {}
  //   }, []);
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return alert("Please select a rating ⭐️");
    // setRating(3);
    // setReview("");
    // onClose();
    // console.log("review data: ", rating, review, userId, productId);
    const result = await axios.post(`${backendUrl}/api/order/add-review`, {
      rating,
      review,
      userId,
      userName,
      productId,
      orderId,
    });
    if (onReviewSubmitted) {
      await onReviewSubmitted(); // 👈 refresh ReviewBanner
    }
    onClose();
  };

  const FilledStar = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.897 
             1.48 8.278L12 18.896l-7.416 4.585 
             1.48-8.278L0 9.306l8.332-1.151z"
      />
    </svg>
  );
  // helper function to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const fillPercentage = Math.min(Math.max(rating - (i - 1), 0), 1);
      // e.g. rating=3.25 → star4 gets 0.25 fill

      stars.push(
        <div key={i} className="relative inline-block w-5 h-5">
          {/* background gray */}
          <FilledStar className="text-gray-300" />
          {/* overlay yellow fill */}
          <div
            className="absolute top-0 left-0h-5 overflow-hidden text-yellow-500"
            style={{ width: `${fillPercentage * 100}%` }}
          >
            <FilledStar className="text-yellow-500 w-5 h-5" />
          </div>
        </div>
      );
    }
    return stars;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 flex items-center justify-center z-49 w-full mt-4">
        <div className="relative w-full max-w-xl mx-auto mt-6 bg-white border border-gray-200 rounded-xl shadow-md p-4">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <X size={18} />
          </button>

          {/* Title */}

          <p className="text-sm text-gray-600 mb-3">
            Your feedback helps us improve and helps other shoppers too!
          </p>

          {/* Slider Rating */}
          <div className="mb-3">
            <div className="flex gap-3 items-center mb-2">
              <div className="flex mb-1 gap-2">{renderStars()}</div>
              <label className="block text-sm font-medium">
                <span className="font-semibold">{rating} / 5</span>
              </label>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.25"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full accent-yellow-500 cursor-pointer"
            />
          </div>

          {/* Review box */}
          <textarea
            className="w-full border rounded-md p-2 text-sm mb-3 focus:ring focus:ring-indigo-200"
            rows="3"
            placeholder="Share your thoughts...(optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />

          {/* Submit */}
          <button
            type="submit"
            // onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewModal;
