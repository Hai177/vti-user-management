import AddNewAction from './AddNewAction';

const AddColumn = () => {
  const onSubmit = () => {};
  return (
    <li className='column__container'>
      <div className='column__content'>
        <AddNewAction label='Add another list' onSubmit={onSubmit} className='column__actions--add-col' />
      </div>
    </li>
  );
};

export default AddColumn;
