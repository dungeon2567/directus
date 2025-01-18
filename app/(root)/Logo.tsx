import React from "react";

type LogoProps = {
  width?: number; // Optional width of the logo in pixels
  height?: number; // Optional height of the logo in pixels
  color?: string; // Optional color for the logo
  text?: string; // Optional text to display on the logo
  textColor?: string; // Optional color for the text
  fontSize?: number; // Optional font size for the text
};

const Logo: React.FC<LogoProps> = ({ 
  width = 100, 
  height = 100, 
  color = "#0070f3", 
  text = "Logo", 
  textColor = "#000", 
  fontSize = 14 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo"
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="5" fill="none" />

      {/* Inner triangle */}
      <polygon
        points="50,20 30,70 70,70"
        fill={color}
      />

      {/* Text */}
      <text
        x="50"
        y="85"
        fill={textColor}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="middle"
      >
        {text}
      </text>
    </svg>
  );
};

export default Logo;
