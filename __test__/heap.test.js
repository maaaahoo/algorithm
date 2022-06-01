import Heap from '../src/heap';

it('Heap Cases', () => {
  const heap = new Heap();
  heap.offer(23);
  heap.offer(654);
  heap.offer(35);
  heap.offer(3);
  heap.offer(112);
  heap.offer(20);
  heap.offer(4);
  heap.offer(87);
  heap.offer(46);
  heap.offer(0);

  expect(heap.peek()).toEqual(654);

  heap.poll();
  expect(heap.peek()).toEqual(112);

  heap.poll();
  expect(heap.peek()).toEqual(87);
});

