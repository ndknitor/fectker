# Fetcker

`fetcker` is a utility for making HTTP requests that built on top of `fetch` function with built-in error handling. It is configured using the `createFetcker` function.

## Installation

```bash
npm install fetcker
```

## Usage

```javascript
import { createFetcker } from "fetcker";

// Create a fetcker instance
const fetcker = createFetcker({
    baseUrl: "https://api.example.com",
    requestTimeOut: 6000, // milliseconds
    onError: (error, isClient) => {
        if (isClient) {
            let message = "";
            switch (error.name) {
                case "TypeError": message = "Network connection error";
                    break;
                case "AbortError": message = "Request time out";
                    break;
            }
            Message.error(message); // Assuming Message is a component for displaying errors
        }
        else {
            console.log(error);
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
