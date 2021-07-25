export interface IScrappedDataPiece {
  label: string;
  value: number | string;
}

export interface IScrappedData {
  [key: string]: IScrappedDataPiece[];
}