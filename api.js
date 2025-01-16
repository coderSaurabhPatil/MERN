// Fetch API, Async/Await, Promises
export async function fetchUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
  