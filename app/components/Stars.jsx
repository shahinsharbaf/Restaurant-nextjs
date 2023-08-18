import React from "react";

import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import Image from "next/image";

function Stars({ stars }) {
  return (
    <div className="flex items-center">
      <Image
        src={stars > 0 ? (stars < 1 ? halfStar : fullStar) : emptyStar}
        width={15}
        height={15}
      />
      <Image
        src={stars > 1 ? (stars < 2 ? halfStar : fullStar) : emptyStar}
        width={15}
        height={15}
      />
      <Image
        src={stars > 2 ? (stars < 3 ? halfStar : fullStar) : emptyStar}
        width={15}
        height={15}
      />
      <Image
        src={stars > 3 ? (stars < 4 ? halfStar : fullStar) : emptyStar}
        width={15}
        height={15}
      />
      <Image
        src={stars > 4 ? (stars < 5 ? halfStar : fullStar) : emptyStar}
        width={15}
        height={15}
      />
    </div>
  );
}

export default Stars;
