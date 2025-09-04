import React from "react";

interface Props {
  children: React.ReactNode;
  title?: React.ReactNode;
}
const MainSection = ({ children, title }: Props) => {
  return (
    <div className={`max-w-7xl mx-auto bg-white ${title ? "pb-16" : "py-16"}`}>
      {title && (
        <h1 className="py-16 text-3xl md:text-4xl font-bold text-gray-700">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};

export default MainSection;
