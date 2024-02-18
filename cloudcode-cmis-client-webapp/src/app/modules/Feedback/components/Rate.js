import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {StarFill} from 'react-bootstrap-icons';

const Rate = ({ count, rating, color, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);



  const starRating = useMemo(() => {


    const getColor = (index) => {
        if (hoverRating >= index) {
          return color.filled;
        } else if (!hoverRating && rating >= index) {
          return color.filled;
        }
    
        return color.unfilled;
      };

    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        
        <StarFill
          key={idx}
          size={24}
          className="cursor-pointer mr-2"
          onClick={() => onRating(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
  }, [count,color.filled,color.unfilled,hoverRating,rating,onRating]);

  return <div>{starRating}</div>;
};

Rate.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onRating: PropTypes.func,
  color: PropTypes.shape({
    filled: PropTypes.string,
    unfilled: PropTypes.string
  }),
};

Rate.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#f5eb3b",
    unfilled: "#DCDCDC"
  },
};

export default Rate;