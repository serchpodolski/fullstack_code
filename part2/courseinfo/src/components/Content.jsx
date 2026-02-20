import Part from './Part'

const Content = (props) => {
//   console.log(props.course.parts)
  return (
    <div>
       {
        props.course.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)
       }
    </div>
  )
}

export default Content