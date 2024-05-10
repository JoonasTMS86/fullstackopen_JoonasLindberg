const Total = (props) => {

    const course_parts = props.course
    const course_parts_array = course_parts.map(course_part => course_part.exercises)
    const total_number_of_exercises = course_parts_array.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    )
  
    return (
      <div>
        <b>total of {total_number_of_exercises} exercises</b>
      </div>
    )
  }
  
  const Part = (props) => {
  
    return (
      <div>
        {props.course} {props.exercises} <br/><br/>
      </div>
    )
  }
  
  const CourseAndParts = (props) => {
  
    const course_parts = []
  
    props.course.forEach(value => {
      course_parts.push(value)
    })
  
    return (
      <div>
        <Header course_name={props.course_name} />
        {course_parts.map(course => <Part key={course.id} course={course.name} exercises={course.exercises}/>)}
        <Total course={course_parts} />
      </div>
    )
  }
  
  const Content = (props) => {
  
    const courses = props.courses
  
    return (
      <div>
        {courses.map(course => <CourseAndParts key={course.id} course_name={course.name} course={course.parts}/>)}
      </div>
    )
  }
  
  const Header = (props) => {
  
    return (
        <h2>
          {props.course_name}
        </h2>
    )
  }
  
  const Course = (props) => {
  
    return (
      <div>
        <Content key={props.id} courses={props.courses} />
      </div>
    )
  }

export default Course