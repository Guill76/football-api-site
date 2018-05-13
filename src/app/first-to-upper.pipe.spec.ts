import { FirstToUpperPipe } from './first-to-upper.pipe';

describe('FirstToUpperPipe', () => {
  let pipe: FirstToUpperPipe;
  beforeEach(() => {
    pipe = new FirstToUpperPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('Nominal test: check with a whole lower word ', () => {
    pipe = new FirstToUpperPipe();
    expect(pipe.transform('tatatitatata')).toBe('Tatatitatata');
  });
  it('Nominal test: check with a whole upper word ', () => {
    pipe = new FirstToUpperPipe();
    expect(pipe.transform('TATATITATATA')).toBe('Tatatitatata');
  });

  it('Nominal test: check with a whole upper word ', () => {
    pipe = new FirstToUpperPipe();
    expect(pipe.transform('tATATITATATA')).toBe('Tatatitatata');
  });
  it('Limit test: check whit spaces and other special chars', () => {
    pipe = new FirstToUpperPipe();
    expect(pipe.transform(' p&_lkjkkd0)')).toBe(' p&_lkjkkd0)');
  });
  it('Limit test: no value should return null', () => {
    pipe = new FirstToUpperPipe();
    expect(pipe.transform(null)).toBeNull();
  });

});
