const Total = (props) => {
  let total_number_of_exercises = 0;
  props.course.parts.forEach(number_of_exercises => {
    total_number_of_exercises += number_of_exercises.exercises
  })

  return (
    <div>
      <b>total of {total_number_of_exercises} exercises</b>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.course.name} {props.course.exercises} <br/><br/>
    </div>
  )
}

const Content = (props) => {

const courses = props.course.parts

  return (
    <div>
      {courses.map(course => <Part key={course.id} course={course}/>)}
    </div>
  )
}

const Header = (props) => {
  return (
      <h1>
        {props.name}
      </h1>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App