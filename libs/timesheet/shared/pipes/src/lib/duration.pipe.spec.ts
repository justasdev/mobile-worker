import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  it('should return minutes converted to hh:mm', () => {
    const pipe = new DurationPipe();
    expect(pipe.transform(125)).toBe('02:05');
  });
});
