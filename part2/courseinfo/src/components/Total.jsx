const Total = (props) => {
//   console.log(props)
  return (
    <p>
      Number of exercises {
        props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
      }
    </p>
  )
}

export default Total