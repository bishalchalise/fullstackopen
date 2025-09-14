import React from "react";

const Parts = ({ course }) => {
  return course.parts.map((part) => {
    return (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    );
  });
};

export default Parts;
