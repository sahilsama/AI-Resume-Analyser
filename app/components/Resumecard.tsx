
import { Link } from 'react-router'

const Resumecard = () => {
  return (
    <Link to={'/resume/${resume.id}'}>
        ResumeCard
    </Link>
  )
}

export default Resumecard