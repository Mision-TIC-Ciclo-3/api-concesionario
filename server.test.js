import { queryAllUsers } from './controllers/usuarios/controller.js';
import { conectarBD } from './db/db.js';
// function sum(a, b) {
//   return a + b;
// }

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

// test('two plus two', () => {
//   const value = 2 + 2;
//   expect(value).toBeGreaterThan(3);
//   expect(value).toBeGreaterThanOrEqual(3.5);
//   expect(value).toBeLessThan(5);
//   expect(value).toBeLessThanOrEqual(4.5);

//   // toBe and toEqual are equivalent for numbers
//   expect(value).toBe(4);
//   expect(value).toEqual(4);
// });

// test('adding floating point numbers', () => {
//   const value = 0.1 + 0.2;
//   //expect(value).toBe(0.3);           This won't work because of rounding error
//   expect(value).toBeCloseTo(0.3); // This works.
// });

// test('there is no I in team', () => {
//   expect('team').not.toMatch(/I/);
// });

// test('but there is a "stop" in Christoph', () => {
//   expect('Christoph').toMatch(/stop/);
// });

// const shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'milk'];

// test('the shopping list has milk on it', () => {
//   expect(shoppingList).toContain('milk');
//   expect(new Set(shoppingList)).toContain('milk');
// });

// test('the data is peanut butter', () => {
//   return fetchData().then((data) => {
//     expect(data).toBe('peanut butter');
//   });
// });

test('the data is users', (done) => {
  const callback = (err, result) => {
    try {
      console.log('data', result);
      expect(result.length).toBeGreaterThan(1);
      done();
    } catch (error) {
      done(error);
    }
  };
  const f = () => queryAllUsers(callback);
  conectarBD(f);
});
