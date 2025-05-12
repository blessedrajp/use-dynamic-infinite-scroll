# use-dynamic-infinite-scroll

[![npm version](https://img.shields.io/npm/v/use-dynamic-infinite-scroll)](https://www.npmjs.com/package/use-dynamic-infinite-scroll)
[![npm downloads](https://img.shields.io/npm/dt/use-dynamic-infinite-scroll)](https://www.npmjs.com/package/use-dynamic-infinite-scroll)

## 📖 Description

`use-dynamic-infinite-scroll` is a React custom hook that helps you implement infinite scrolling effortlessly. It automatically loads more data as the user scrolls to the bottom of the page. The hook fetches data using a provided fetch function and seamlessly appends new data to the existing content.

This package allows you to integrate dynamic, efficient infinite scrolling in your React projects with minimal configuration.

---

## ✨ Features

- **Automatic Data Fetching:** Automatically fetches more data when the user reaches the bottom of the page.
- **Customizable Fetch Logic:** Simply pass your fetch function to the hook to handle your own API logic.
- **Prevents Multiple API Calls:** Ensures that a new API call is only made after the previous one completes.

---

## 📦 Installation

Install `use-dynamic-infinite-scroll` via npm:

```bash
npm install use-dynamic-infinite-scroll 
```

## 🛠️ Basic Usage

1. Import the hook
```bash 
import useDynamicInfiniteScroll from 'use-dynamic-infinite-scroll';
 ```
2. Create Your Custom Fetch Function
    Your API should return data in this structure:

    data: Array of your items.

    hasMore: Boolean indicating if more data exists.
  ```ts 

  const fetchReports = async (page: number, params: any) => {
    try{
    const response: any = await apigetData(
    page.toString(),
    pageSize,
    params.year
  );
  const reports: Report[] = response.data;
  const hasMore = response.hasNext;

  return { data: reports, hasMore };
    } catch(error){console.log("error fetching the data")}
 
} 
```

3. place your dynamuc get method in your services file

```ts
  export const apigetData = (page: number, search: string, year: string): Promise<AxiosResponse<MyResponseType>> => {
    return axios.get(`/url?page=${page}&search=${search}&year=${year}`);
}

```

3. Implement in your component

```ts 
function ProductList() {
  const fetchData = useCallback(
    (page: number) => fetchCustomData(page, param1, param2, param3),
    [param1, param2, param3]
  );

const { data, scrollLoading,initialLoading, hasMore, loaderRef, updateParams } = useDynamicInfiniteScroll(
    fetchReports,
    0
  );

  const handleFilter = (params1: string, params2: string) => {
    setParams({ params1: params1, params2: params2 });
  };

   return (
    <div>
      {/* Initial Loading */}
      {initialLoading ? (
        <div>Loading data...</div>
      ) : (
        <>
          {/* Actual data mapping */}
          {data.map((item, index) => (
            <div key={index}>
              {item.title}

              {/* loaderRef at last element */}
              {index === data.length - 1 && <div ref={loaderRef}></div>}
            </div>
          ))}

          {/* Scroll loading */}
          {scrollLoading && <div>Loading more data...</div>}

          {/* No More Data */}
          {!hasMore && !initialLoading && (
            <div>No more data available.</div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;

```


## 📑 API
```ts
useDynamicInfiniteScroll(fetchFunction: Function, initialPage: number = 1)
```

Parameters:
fetchFunction: A function that accepts a page number and returns a promise resolving to an object containing:

data: An array of items.

hasMore: A boolean indicating whether more items can be loaded.

initialPage (optional): The initial page number to start fetching data from (default is 1).

Returns:
1. data: Array of loaded data.

2. loading: Boolean indicating whether data is currently being loaded.

3. loaderRef: A React ref to be attached to the last element in your list to trigger infinite scroll.

4. setParams (optional): A function to dynamically update query parameters for your API calls.


## 🤝 Contribution
Contributions are welcome!
If you'd like to contribute:

1. Fork the repository.

2. Clone your fork:

```bash 
git clone https://github.com/blessedrajp/use-dynamic-infinite-scroll.git
```
3. Create a new branch and commit your changes.

4. Open a pull request to the main repository.



## 📄 License
MIT License. See the LICENSE file for more information.


## 📬 Support
If you have any issues or questions, feel free to open an issue on the GitHub Issues page.

## 📌 Notes
✅ Replace your-username in the GitHub URLs with your actual GitHub username.
✅ Ensure your repository includes a LICENSE file if you intend to open-source it.

## 🔗 Quick Links

- 📦 [NPM Package](https://www.npmjs.com/package/use-dynamic-infinite-scroll)
- 🐞 [Open Issues](https://github.com/blessedrajp/use-dynamic-infinite-scroll/issues)


### Steps to Follow:
1. **Copy this file** and paste it into your `README.md`.
2. **Replace** `your-username` in the GitHub URLs with your actual GitHub username.
3. **Ensure the repository has a `LICENSE` file** (MIT or another license) if you intend to have an open-source license.

Let me know if you'd like any further changes!

# Happy Coding! 🚀









