import { useEffect, useRef, type ReactNode } from "react";

interface CarouselProps {
  children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        className="carousel"
        style={{
          display: "flex",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          gap: "1rem",
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
        }}
      >
        {children}
      </div>
      <style>
        {`
          .carousel::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }
        `}
      </style>
    </div>
  );
};

export default Carousel;
