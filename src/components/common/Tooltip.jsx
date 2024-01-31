import React, { useEffect, useState, useRef } from "react";

const Tooltip = ({ title, position }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const tooltipRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const techKeywords = ["HTML 5", "CSS 3", "JavaScript", "React JS", "Tailwind CSS", "Node JS", "Three JS"];
    const solidWorksKeyword = "SOLIDWORKS";

    if (techKeywords.includes(title)) {
      setShowMessage(true);
      setMessage("Used on this website! " + String.fromCharCode(0x2764));
    } else if (title === solidWorksKeyword) {
      setShowMessage(true);
      setMessage(
        <>
          Global Certificate CSWA
          <br />
          <span style={{ fontSize: "12px", fontFamily: "Arial, sans-serif" }}>Click to visualize</span>
        </>
      );
    } else {
      setShowMessage(false);
      setMessage("");
    }
  }, [title]);

  const handleTooltipClick = () => {
    console.log("Click detected on tooltip!");

    // Check if the tooltip title is SOLIDWORKS
    if (title === "SOLIDWORKS") {
      // Open a new tab with the specified URL for SOLIDWORKS
      window.open("https://drive.google.com/file/d/1AwYJPniLzVpRcLdVBbUZyC64cNoEtveL/view?usp=sharing", "_blank");
    }

    // You can add additional click-related logic here if needed
  };

  const handleDocumentClick = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      // Click occurred outside the tooltip
      if (title === "SOLIDWORKS") {
        // Open a new tab with the specified URL for SOLIDWORKS
        window.open("https://drive.google.com/file/d/1AwYJPniLzVpRcLdVBbUZyC64cNoEtveL/view?usp=sharing", "_blank");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const tooltipStyle = {
    backgroundColor: showMessage ? (title === "SOLIDWORKS" ? "red" : "green") : "rgba(27, 27, 27, 0.8)",
    padding: "4px",
    borderRadius: "5px",
    color: showMessage ? "#ffffff" : "#ffffff",
    fontSize: "16px",
    position: "absolute",
    top: isMobile ? (position.y - 100 + "px") : position.y,
    left: isMobile ? position.x : position.x,
    cursor: 'pointer', // Change cursor to indicate it's clickable
    transition: "background-color 1s, color 3s", // Add transition for background-color and color
  };

  return (
    <div style={tooltipStyle} onClick={handleTooltipClick} ref={tooltipRef}>
      <p>{title}</p>
      {showMessage && <p>{message}</p>}
    </div>
  );
};

export default Tooltip;
