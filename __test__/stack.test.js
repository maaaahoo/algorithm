import Stack from '../src/stack';

it('Stack Cases', () => {
  const myStack = new Stack();
  expect(myStack.size).toEqual(0);
  
  myStack.push("1");
  expect(myStack.size).toEqual(1);

  myStack.push("2");
  myStack.push("3");
  expect(myStack.size).toEqual(3);

  myStack.pop();
  expect(myStack.size).toEqual(2);

  myStack.clear();
  expect(myStack.size).toEqual(0);
});