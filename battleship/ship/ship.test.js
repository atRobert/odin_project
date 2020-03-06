const Ship = require('./ship');

const testShip = Ship(3)
testShip.hit(0)
testShip.hit(1)
testShip.hit(2)

test('Correct Ship Length', () => {
  expect(testShip.getLength()).toBe(3);
});

test('Ship is sunk', () => {
  expect(testShip.getSunk()).toBe(true);
});