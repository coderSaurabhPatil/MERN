// Closures, Destructuring, Arrow Functions
export function createFilter(users) {
    return query => {
      return users.filter(({ name }) => name.toLowerCase().includes(query));
    };
  }
  