import { useEffect, useRef, useState, type ReactNode } from "react";

interface CarouselProps {
  children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showMoreLeftIndicator, setShowMoreLeftIndicator] = useState(false);
  const [showMoreRightIndicator, setShowMoreRightIndicator] = useState(false);

  const updateIndicators = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const maxScrollLeft =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

      setShowMoreLeftIndicator(scrollLeft > 0);
      setShowMoreRightIndicator(scrollLeft < maxScrollLeft);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", updateIndicators);
      window.addEventListener("resize", updateIndicators);

      // Initial check
      updateIndicators();

      return () => {
        carousel.removeEventListener("scroll", updateIndicators);
        window.removeEventListener("resize", updateIndicators);
      };
    }
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        ref={carouselRef}
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
      {showMoreLeftIndicator && <div className="left-indicator" />}
      {showMoreRightIndicator && <div className="right-indicator" />}
      <style>
        {`
          .carousel::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }

          .left-indicator, .right-indicator {
            position: absolute;
            top: 0;
            bottom: 0;
            pointer-events: none;
          }

          .left-indicator {
            left: 0;
            width: 20px; /* Wider for light mode */
            background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
          }

          .right-indicator {
            right: 0;
            width: 20px; /* Wider for light mode */
            background: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
          }

          html.dark .left-indicator {
            width: 10px; /* Narrower for dark mode */
            background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
          }

          html.dark .right-indicator {
            width: 10px; /* Narrower for dark mode */
            background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
          }
        `}
      </style>
    </div>
  );
};

export default Carousel;
