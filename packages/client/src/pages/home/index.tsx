import { useGetProjectsQuery } from '~/redux/admin/project';
import ASideHome from './components/aside/HomeAside';
import HomeCalendar from './components/main/CalendarList';
import HomeProjectList from './components/main/ProjectList';
const Home = () => {
  const resData = useGetProjectsQuery();
  const projectList = resData.data?.data;
  return (
    <div className='home'>
      <div className='main'>
        <HomeCalendar />
        <HomeProjectList projectList={projectList} />
      </div>
      <div className='aside'>
        <ASideHome projectList={projectList} />
      </div>
    </div>
  );
};

export default Home;
