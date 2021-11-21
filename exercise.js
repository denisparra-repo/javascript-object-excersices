/**
 * Task description: Write a method that verifies an argument is a plain object, not an array or null
 * Expected Result: True if object is plain, false otherwise. 
     ({ a: 1 }) => true, 
     ([1, 2, 3]) => false
 * Task complexity: 1 of 5
 * @param element - element to verify
 * @returns {boolean}
 */
function isPlainObject(element) {
  return typeof element === 'object' && !Array.isArray(element)
};

/** 
  * Task description: Write a method that returns a deep array like [[key, value]] 
  * Expected Result: ({ a: 1, b: 2 }) => [['a', 1], ['b', 2]] 
  * Task complexity: 1 of 5 
  * @param {Object} object - Any object to transform into array 
  * @returns {Array} - a deep array 
*/
function makePairs(object) {
  return Object.keys(object).map(key => [key, object[key]])
};

/** 
  * Task description: Write a method that returns new object without provided properties 
  * Expected Result: ({ a: 1, b: 2 }, 'b') => { a: 1 } 
  * Task complexity: 2 of 5 
  * @param {Object} object - Any object 
  * @param {?} args - list of properties to remove from object 
  * @returns {Object} - New object without listed values 
*/
function without(object, ...args) {
  return Object.keys(object).reduce((acc, curr) => {if(args.indexOf(curr) === -1) acc[curr] = object[curr]; return acc}, {});
  //args.forEach(key => delete object[key]);
  //return object
};

/** 
  * Task description: Write a method that makes a shallow check is object empty 
  * Expected Result: ({}) => true, ({ a: undefined }) => true, 
      ({ a: 1 }) => false 
  * Empty values: '', null, NaN, undefined 
  * Task complexity: 2 of 5 
  * @param {Object} object - Object with values of primitive data types 
  * @returns {boolean} 
*/
function isEmpty(object) {
  return Object.keys(object).every(key => object[key] === undefined || object[key] === "" || object[key] === NaN || object[key] === null)
};

/** 
  * Task description: Write a method that makes a shallow compare of two objects 
  * Expected Result: True if objects are identical, false if objects are different ({ a: 1, b: 1 }, { a: 1, b: 1 }) => true 
  * Task complexity: 2 of 5 
  * @param {Object<string | number>} firstObj - Object with values of primitive data types 
  * @param {Object<string | number>} secondObj - Object with values of primitive data types 
  * @returns {boolean} 
*/
function isEqual(firstObject, secondObject) {
  return JSON.stringify(firstObject) === JSON.stringify(secondObject)
  //return Object.keys(firstObject).every(key => firstObject[key] === secondObject[key])
};

/** 
  * Task description: Write a method that invokes an array method on a specific path 
  * Expected Result: ({ a: { b: [1, 2, 3] } }, 'a.b', splice, [1, 2]) => [2, 3] 
  * Task complexity: 3 of 5 
  * @param {Object} object 
  * @param {String} path - path in an object to property 
  * @param {String} func - function to invoke 
  * @param {Array} [args] - list of args 
  * @returns {?} 
*/
function invoke(object, path, func, args) {
  return eval(`object.${path}.${func}(${args})`)
  //return eval(`[${path.split(".").reduce((acc, curr) => acc = acc[curr], object)}].${func}(${args})`)
};
console.log(invoke({ a: { b: [1, 2, 3] } }, 'a.b', 'splice', [1, 2]))
/** 
  * Task description: Write a method that makes a deep check is an object empty 
  * Empty values: '', null, NaN, undefined, [], {} 
  * Expected Result: ({}) => true, 
      ({ a: { b: undefined } }) => true, 
      ({ a: { b: [] } }) => true 
  * Task complexity: 3 of 5 
  * @param {?} element - Object with values of any data types 
  * @returns {boolean} 
*/
function isEmptyDeep(element) {
  return typeof element !== 'object' ? element !== NaN && element !== "" && element !== undefined && element !== null : Array.isArray(element) ? element.every(key => isEmptyDeep(key)) : Object.keys(element).every(key => JSON.stringify(element[key]) === "{}" || JSON.stringify(element[key]) === "[]" && element[key] === "" && isEmptyDeep(element[key]))
};

/** 
  * Task description: Write a method that makes a deep compare of two objects 
  * Expected Result: True if objects are equal, false if objects are different ({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 1 } }) => true 
  * @param {Object} firstObj - Object of any values
  * @param {Object} secondObj - Object of any values
  * @returns {boolean} 
*/
function isEqualDeep(firstObj,secondObj) {
  return JSON.stringify(firstObj) === JSON.stringify(secondObj);
  //return typeof firstObj !== 'object' ? firstObj == secondObj : Array.isArray(firstObj) ? firstObj.every(element => isEqualDeep(firstObj, secondObj)) : Object.keys(firstObj).every(key => isEqualDeep(firstObj[key], secondObj[key]))
};

/** 
  * Task description: Write a method that finds shallow intersections of objects 
  * Expected Result: ({ a: 1, b: 2 }, { c: 1, b: 2 }) => { b: 2 } 
  * @param {Object<string | number>} obj1 - Object with values of primitive data types 
  * @param {Object<string | number>} obj2 - Object with values of primitive data types 
  * @returns {Object} 
*/
function intersection(obj1, obj2) {
  return Object.keys(obj1).reduce((acc, curr) => {if(isEqualDeep(obj1[curr], obj2[curr])) acc[curr] = obj1[curr]; return acc}, {});
}

/** 
  * Task description: Write a method that finds all intersections of objects
  * Expected Result: ({ a: 1, b: { c: 3 } }, { c: 1, b: { c: 3 } }) => { b: { c: 3 } } 
  * @param {Object} obj1 - Object with values of any data types
  * @param {Object} obj2 - Object with values of any data types
  * @returns {Object} 
*/
function intersection(obj1, obj2) {
  return Object.keys(obj1).reduce((acc, curr) => {if(isEqualDeep(obj1[curr], obj2[curr])) acc[curr] = obj1[curr]; return acc}, {});
}