# Fetcker

`fetcker` is a utility for making HTTP requests that built on top of `fetch` function with built-in error handling. It is configured using the `createFetcker` function.

## Installation

```bash
npm install fetcker
```

## Usage

```javascript
import { createFetcker } from "fetcker";

const API_BASE_URL = "https://api.example.com";
const REQUEST_TIMEOUT = 6000; // milliseconds

// Create a fetcker instance
const fetcker = createFetcker({
    baseUrl: API_BASE_URL,
    requestTimeOut: parseInt(REQUEST_TIMEOUT.toString()),
    onError: (error, isClient) => {
        let message = "";
        if (isClient) {
            switch (error.name) {
                case "TypeError": message = "Network connection error";
                    break;
                case "AbortError": message = "Request time out";
                    break;
            }
            Message.error(message); // Assuming Message is a component for displaying errors
        }
    }
});

export default fetcker;
```

## Configuration

- **baseUrl:** The base URL for your API.
- **requestTimeOut:** The timeout for HTTP requests in milliseconds.
- **onError:** A callback function to handle errors. In the provided example, it displays error messages for specific error types.

## Example

```javascript
// Make a GET request
useAsyncEffect(async () => {
    const response = await fetcker.get<{ date: string }>("/api/main/date");
    console.log(response.data);
}, []);
```
