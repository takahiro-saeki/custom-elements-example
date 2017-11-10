import simpleFunc from 'simpleFunc';

describe('test case: simpleFunc', () => {
  test('simpleFunc will be 3', () => {
    expect(simpleFunc()).toBe(2)
  })
  
  test('simpleFunc will be 8', () => {
    expect(simpleFunc(3, 5)).toBe(15)
  })
})