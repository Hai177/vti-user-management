const AsideCard = ({ projectName }: { projectName: string }) => {
  return (
    <div className='aside-card'>
      <div className='aside-card-img'></div>
      <div className='aside-card-name'>{projectName}</div>
    </div>
  );
};
export default AsideCard;
