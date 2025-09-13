import React, { useState } from "react";
import { Star } from "lucide-react";

const RatingSlider = ({ onChange }) => {
  const [rating, setRating] = useState(3.75); // default fractional rating

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setRating(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-sm bg-white shadow-lg rounded-2xl">
      <h2 className="text-lg font-semibold">Rate this product</h2>

      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          const fillPercentage = Math.min(
            Math.max(rating - i, 0), // difference
            1
          ); // clamp between 0–1

          return (
            <div key={i} className="relative w-7 h-7">
              {/* background star (gray) */}
              <Star className="absolute inset-0 text-gray-300" size={28} />

              {/* foreground star (yellow, clipped by width %) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercentage * 100}%` }}
              >
                <Star className="text-yellow-400 fill-yellow-400" size={28} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="5"
        step="0.25"
        value={rating}
        onChange={handleChange}
        className="w-full accent-yellow-400 cursor-pointer"
      />

      {/* Value */}
      <p className="text-sm text-gray-600">Selected: {rating.toFixed(2)} / 5</p>
    </div>
  );
};

export default RatingSlider;
