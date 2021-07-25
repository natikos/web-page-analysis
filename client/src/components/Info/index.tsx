import { IScrappedData, IScrappedDataPiece } from 'common/interfaces';
import { ReactElement } from 'react';
import './styles.css';

interface IInfoProps {
  data: IScrappedData;
}

export default function Info({ data }: IInfoProps): ReactElement {
  const getRowInfo = (item: IScrappedDataPiece[]): JSX.Element[] => {
    return item.map(({ value, label }) => <div key={label} className='row'>
      <span>{label}</span>
      <span>{value}</span>
    </div>);
  };

  return (
    <div id='info'>
      <h2>What I got from the page:</h2>
      <div className='result'>
        {Object.values(data).map(getRowInfo)}
      </div>
    </div>
  );
}