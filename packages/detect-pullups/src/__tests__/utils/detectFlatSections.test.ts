import { detectFlatSections } from '../../utils/detectFlatSections';

describe('detectFlatSections', () => {
  test('should detect flat sections', () => {
    const data = [1, 2, 3.1, 3, 2.7, 2.4, 3, 4, 5, 6];
    const result = detectFlatSections(data);
    expect(result[0].start).toEqual(2);
    expect(result[0].end).toEqual(6);
    expect(result[0].data).toEqual([3.1, 3, 2.7, 2.4, 3]);
  });

  test('should two detect flat sections', () => {
    const data = [0, 1, 2, 3, 3, 3, 5, 6, 4, 3, 3, 3, 0];
    const result = detectFlatSections(data);
    expect(result[0].data).toEqual([2, 3, 3, 3]);
    expect(result[1].data).toEqual([4, 3, 3, 3]);
  });
});
