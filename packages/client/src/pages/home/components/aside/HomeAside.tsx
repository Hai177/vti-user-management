import { IProject, useGetProjectsQuery } from '~/redux/admin/project';
import AsideCard from './AsideCard';

interface ASideHomeProps {
  projectList?: IProject[]; // Prop projectList có thể không được truyền vào, vì vậy chúng ta đánh dấu nó là optional
}
const ASideHome = ({ projectList }: ASideHomeProps) => {
  return (
    <div className='home-aside'>
      <header className='home-aside-header'>
        <i className='fa-light fa-clock'></i>
        <div>Recently viewed</div>
      </header>
      <div className='content'>
        {projectList?.map((project) => <AsideCard key={project.id} projectName={project.name} />)}
      </div>
    </div>
  );
};
export default ASideHome;
