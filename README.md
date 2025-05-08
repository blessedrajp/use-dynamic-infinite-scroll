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
