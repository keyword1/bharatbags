import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating = 0, size = 25 }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => {
        const fillPercentage = Math.min(Math.max(rating - i, 0), 1); // 0–1 range
        return (
          <div
            key={i}
            className="relative"
            style={{ width: size, height: size }}
          >
            {/* background star (gray) */}
            <Star className="absolute inset-0 text-gray-300" size={size} />

            {/* foreground star (yellow, clipped by rating %) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }}
            >
              <Star className="text-yellow-400 fill-yellow-400" size={size} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
