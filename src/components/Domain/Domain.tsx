import './Domain.scss';
import Speciality from './Speciality/Speciality';
import WorkBench from './WorkBench/WorkBench';

const Domain = () => {
  return (
    <div className='domainWrapper'>
      <div className="specialityWrapper">
        <Speciality/>
      </div>
      <div className="workBenchWrapper">
        <WorkBench/>
      </div>
    </div>
  )
}

export default Domain
