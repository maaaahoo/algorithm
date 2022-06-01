import Queue from '../src/queue';

it('Queue Cases', () => {
  const myQueue = new Queue();
  expect(myQueue.size).toEqual(0);
  
  myQueue.enqueue("1");
  expect(myQueue.size).toEqual(1);

  myQueue.enqueue("2");
  myQueue.enqueue("3");
  expect(myQueue.size).toEqual(3);

  myQueue.dequeue();
  expect(myQueue.size).toEqual(2);

  myQueue.clear();
  expect(myQueue.size).toEqual(0);
});