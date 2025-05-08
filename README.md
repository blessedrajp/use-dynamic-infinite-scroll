# use-dynamic-infinite-scroll

[![npm version](https://img.shields.io/npm/v/use-dynamic-infinite-scroll)](https://www.npmjs.com/package/use-dynamic-infinite-scroll)
[![npm downloads](https://img.shields.io/npm/dt/use-dynamic-infinite-scroll)](https://www.npmjs.com/package/use-dynamic-infinite-scroll)

## Description

`use-dynamic-infinite-scroll` is a React custom hook that helps you implement infinite scrolling with ease. It automatically loads more data as the user scrolls to the bottom of the page. The hook fetches data using a provided fetch function and seamlessly appends the new data to the existing content.

This package allows you to integrate dynamic and efficient infinite scrolling in your React projects with minimal configuration.

## Features
- **Automatic Data Fetching:** Automatically fetches more data when the user reaches the bottom of the page.
- **Customizable Fetch Logic:** Simply pass your fetch function to the hook to handle data fetching logic.
- **Prevents Multiple API Calls:** Ensures that an API call is only made after the previous one has completed.

## Installation

To install `use-dynamic-infinite-scroll` in your project, run the following npm command:

```bash
npm install use-dynamic-infinite-scroll 
```

Basic Usage

1. Import the hook
```bash 
import useDynamicInfiniteScroll from 'use-dynamic-infinite-scroll';
 ```
2. Create your fetch function

  Your API must return data in this format:

  items: Array of data items
  
  hasMore: Boolean indicating if more data exists

```bash 
const fetchProducts = async (page) => {
  const response = await fetch(`https://api.example.com/products?page=${page}`);
  const { items, hasMore } = await response.json();
  return { data: items, hasMore };
};
```

3. Implement in your component

```bash 
function ProductList() {
  const { data, loading, loaderRef } = useDynamicInfiniteScroll(fetchProducts);

  return (
    <div>
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      
      {loading && <div className="loading-spinner">Loading...</div>}
      <div ref={loaderRef} />
    </div>
  );
}
```


## API
useDynamicInfiniteScroll(fetchFunction: Function, initialPage: number = 1)
Parameters:
fetchFunction: A function that accepts a page number and returns a promise resolving to an object containing:

* data: An array of items.

* hasMore: A boolean indicating whether there are more items to load.

* initialPage (optional): The initial page number to start fetching data from (defaults to 1).

Returns:
  1. data: An array containing the loaded data.
  
  2. loading: A boolean indicating whether the data is currently being loaded.
  
  3. loaderRef: A React ref that should be attached to the last element in the list to trigger the infinite scroll.


## Contribution
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request. Here's how you can contribute:

1. Fork the repository.

2. Clone your fork:



## License
MIT License. See the LICENSE file for more information.


## Support
If you have any issues or questions, feel free to open an issue on the GitHub Issues page.



### Steps to Follow:
1. **Copy this file** and paste it into your `README.md`.
2. **Replace** `your-username` in the GitHub URLs with your actual GitHub username.
3. **Ensure the repository has a `LICENSE` file** (MIT or another license) if you intend to have an open-source license.

Let me know if you'd like any further changes!





