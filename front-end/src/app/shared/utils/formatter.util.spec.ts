import {
  formatterToDate,
  formatterLocationPointDescription,
  formatterNumberToPtBr,
} from './formatter.util';

describe('Formatter Utils', () => {
  describe('formatterToDate', () => {
    it('should format date correctly', () => {
      const result = formatterToDate('2024-05-13T20:30:00Z');
      expect(result).toBe('Atualizado em 13/05/2024 às 20:30');
    });
  });

  describe('formatterLocationPointDescription', () => {
    it('should format location description correctly', () => {
      const result = formatterLocationPointDescription(
        'Rio Grande do Sul',
        'Porto Alegre',
        'Ponto 1'
      );
      expect(result).toBe('Ponto 1, Porto Alegre - Ri');
    });
  });

  describe('formatterNumberToPtBr', () => {
    it('should format number to pt-BR', () => {
      expect(formatterNumberToPtBr(5.5)).toBe('5,50');
      expect(formatterNumberToPtBr(10)).toBe('10,00');
      expect(formatterNumberToPtBr(123.456)).toBe('123,46');
    });
  });
});
