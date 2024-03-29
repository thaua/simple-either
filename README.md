<p align="center">
<a href="https://codeclimate.com/github/thaua/simple-either/maintainability"><img src="https://api.codeclimate.com/v1/badges/f64aa8e8d14ad657d8d1/maintainability" /></a>
<a href="https://codeclimate.com/github/thaua/simple-either/test_coverage"><img src="https://api.codeclimate.com/v1/badges/f64aa8e8d14ad657d8d1/test_coverage" /></a>
</p>

# Simple Either

The `Either` type is a common functional programming pattern that allows you to represent a value that could be one of two possible types: `Left` or `Right`. It's particularly useful for handling error scenarios in a more expressive way.

## Usage

### Installation

Install the `simple-either` package using NPM:

```bash
npm install simple-either
```

### Example of usage 

```typescript
import { Either, left, right } from 'simple-either';

interface Person {
  name: string;
}

interface PersonError {
  cause: string;
}

const createUser = (person: Person): Either<PersonError, Person> => {
  if (!person.name) {
    return left({ cause: 'Attribute name is required.' } as PersonError);
  }

  return right(person);
};

const personWithoutName = createUser({} as Person);
const personWithName = createUser({ name: 'thaua' } as Person);

console.log(personWithoutName.value);     // The value attribute can be PersonError or Person
console.log(personWithName.value);        // The value attribute can be PersonError or Person

console.log(personWithoutName.isLeft());  // Returns true
console.log(personWithName.isLeft());     // Returns false

console.log(personWithoutName.isRight()); // Returns false
console.log(personWithName.isRight());    // Returns true
```

For even more explicit code and branching, you can use `match` and `map` methods as bellow:

##### Mapping into unique return format

```typescript
// Previous code here...

interface HttpResponse {
  statusCode: number;
  response: Person | null;
}

const createUserUseCase: Either<PersonError, Person> = createUser({ name: 'validName?' } as Person);

const httpResponse = createUserUseCase.map<HttpResponse>(
  (error: PersonError) => {
    // Do whatever you want with PersonError and return defined type...
    return { 
      statusCode: 400,
      response: null,
    };
  },
  (person: Person) => {
    // Do whatever you want with Person and return defined type...
    return {
      statusCode: 201,
      response: person,
    };
  }
);

// Do whatever you want with your new HttpResponse based on method results :)

```

##### Matching correct branch

```typescript
// Previous code here...

createUserUseCase.match(
  (error: PersonError) => {
    // Will enter here only on Left response
    console.log(error);
  },
  (user: Person) => {
    // Will enter here only on Right response
    console.log(user);
  }
);

```

In this example, the `createUser` function returns an `Either` type, with `Left` representing an error case (`PersonError` interface) and `Right` representing a successful creation (`Person` interface). This allows for cleaner error handling and more explicit code.

### TypeScript Type Narrowing

When using the `isLeft` and `isRight` check methods with the `Either` type, TypeScript intelligently narrows down the value type within the scope of those conditions..

Consider the following examples:

```typescript
// Previous code here...

function handleError(error: PersonError) {
  console.error(error);
}

function printPerson(person: Person) {
  console.log(person);
}

// These examples will not work, since the ´.value´ attributes can be either Error or Person while the methods expect specific one:
handleError(personWithName.value);     // TypeScript error
handleError(personWithoutName.value);  // TypeScript error
printPerson(personWithName.value);     // TypeScript error
printPerson(personWithoutName.value);  // TypeScript error

// Inside a specific checked scope (with ´.isLeft´ or ´.isRight´), TypeScript will narrow the value type for usage within the scope:
if (personWithName.isRight())     printPerson(personWithName.value);      // Works!
if (personWithName.isLeft())      handleError(personWithName.value);      // Works! (but will not be pass the condition in this example)
if (personWithoutName.isRight())  printPerson(personWithoutName.value);   // Works! (but will not be pass the condition in this example)
if (personWithoutName.isLeft())   handleError(personWithoutName.value);   // Works!

// Simpler and beautier example:

if (personWithName.isRight()) {
  console.log(`User ${personWithName.value.name} created.`);                  // typescript knows the value is a Person
} else {
  console.log(`User not created due to: ${personWithName.value.cause}.`);     // typescript knows the value is a PersonError
}
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Stay in touch

For questions or inquiries, please contact **Thauã Silveira** at [thaua@outlook.com](mailto:thaua@outlook.com).
