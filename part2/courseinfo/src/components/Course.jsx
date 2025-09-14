import Parts from "./Parts";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <h2>{course.name}</h2>
            <Parts course={course} />
            <Total course={course} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
