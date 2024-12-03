import { useState } from 'react';

export default function StarRate({
  maxRating = 5,
  colorStars = 'blue',
  sizeStar = 48,
  messages = [],
  defaultRating = 0,
  setA,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRate, setTempRate] = useState(0);

  function handleRating(a) {
    setRating(a);
    setA(a);
  }

  function handleTempRating(a) {
    setTempRate(a);
  }

  return (
    <>
      <span>
        {Array.from({ length: maxRating }, (_, i) => (
          <StarIcon
            onRate={() => handleRating(i + 1)}
            full={tempRate >= i + 1 || rating >= i + 1}
            onMouseIn={() => handleTempRating(i + 1)}
            onMouseOut={() => handleTempRating(0)}
            colorStars={colorStars}
            sizeStar={sizeStar}
          />
        ))}
      </span>
      <p>{rating}</p>
      <p>{messages.length === maxRating ? messages[rating - 1] : tempRate}</p>
    </>
  );
}

function StarIcon({
  full,
  onRate,
  onMouseIn,
  onMouseOut,
  colorStars,
  sizeStar,
}) {
  const styles = {
    fontSize: sizeStar,
    cursor: 'pointer',
    color: colorStars,
  };

  return full ? (
    <span
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
      onClick={onRate}
      style={styles}
    >
      ★
    </span>
  ) : (
    <span
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
      onClick={onRate}
      mnbvc
      style={styles}
    >
      ☆
    </span>
  );
}
