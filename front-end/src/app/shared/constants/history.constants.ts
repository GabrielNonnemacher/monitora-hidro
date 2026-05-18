import { FilterChart } from '../types/filter-chart.type';

export const FILTER_CHART_TYPES: FilterChart[] = Object.entries(FilterChart)
  ?.map((i) => i[1])
  ?.reverse();

export const LABEL_BUTTONS_CHART: Record<FilterChart, string> = {
  [FilterChart.days]: 'Dias',
  [FilterChart.years]: 'Anos',
  [FilterChart.months]: 'Meses',
  [FilterChart.today]: 'Hoje',
};

export const LABELS_CHART_MONTHS: Record<string, string> = {
  ['1']: 'Janeiro',
  ['2']: 'Fevereiro',
  ['3']: 'Março',
  ['4']: 'Abril',
  ['5']: 'Maio',
  ['6']: 'Junho',
  ['7']: 'Julho',
  ['8']: 'Agosto',
  ['9']: 'Setembro',
  ['10']: 'Outubro',
  ['11']: 'Novembro',
  ['12']: 'Dezembro',
};
