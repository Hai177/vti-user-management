interface InfoRowProps {
  title: string;
  defaultValue: string;
  editable: boolean;
  isTextArea?: boolean;
}

export const InfoRow = ({ title, defaultValue, editable, isTextArea = false }: InfoRowProps) => {
  const editableStatus = editable ? '' : 'border-0 bg-transparent';
  return (
    <div>
      <div className='row'>
        <span className='col-4 fw-medium'>{title}:</span>
        {isTextArea ? (
          <textarea className={`col-8 ${editableStatus}`} defaultValue={defaultValue} rows={4} disabled />
        ) : (
          <input className={`col-8 ${editableStatus}`} type='text' defaultValue={defaultValue} disabled={!editable} />
        )}
      </div>
    </div>
  );
};
