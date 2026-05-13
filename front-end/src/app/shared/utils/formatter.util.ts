export const formatterToDate = (dateIso: string): string => {
  const date = new Date(dateIso);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  const hour = String(date.getUTCHours()).padStart(2, '0');
  const minute = String(date.getUTCMinutes()).padStart(2, '0');

  return `Atualizado em ${day}/${month}/${year} às ${hour}:${minute}`;
};

export const formatterLocationPointDescription = (
  stateName: string,
  cityName: string,
  locationPointName: string,
): string => {
  return `${locationPointName}, ${cityName} - ${stateName.slice(0, 2)}`;
};

export const formatterNumberToPtBr = (number: number): string => {
  return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
