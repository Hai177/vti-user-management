import { IProject } from '~/redux/admin/project';
import HomeProjectCard from './ProjectCard';

interface HomeProjectListProps {
  projectList?: IProject[];
}
const HomeProjectList = ({ projectList }: HomeProjectListProps) => {
  return (
    <div className='home-project'>
      <div className='d-flex justify-content-between'>
        <div className='fs-4 fw-bold '>
          <div>YOUR PROJECTS</div>
        </div>
      </div>
      <div className='list-project d-flex gap-2 mt-3 flex-wrap'>
        {projectList?.map((project) => <HomeProjectCard key={project.id} projectName={project.name} />)}
      </div>
    </div>
  );
};
export default HomeProjectList;
