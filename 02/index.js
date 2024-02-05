// Load the array sequentially

let urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
];

let result = [];

const fetchData = (url)=> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('Some error');
        }
        return res.json();
      })
      .then(data => {
        result.push(data);
        resolve();
      })
      .catch(error => reject(error));
  });
}

const fetchChain = (urls) => {
  return urls.reduce((chain, url) => {
    return chain.then(() => {
      return fetchData(url);
    });
  }, Promise.resolve());
}

fetchChain(urls)
  .then(() => {
    console.log('Result array:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
