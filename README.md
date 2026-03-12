# Mutual Fund API Service

A Node.js Express API service that interfaces with the MF API (https://api.mfapi.in) to provide mutual fund data with clean serialized responses.

## Features

✅ **Search Mutual Funds** - Search for mutual funds by name  
✅ **Latest NAV Data** - Get current Net Asset Value for any scheme  
✅ **Historical NAV Data** - Get historical data with optional date filtering  
✅ **Input validation** with Zod schemas  
✅ **Centralized error handling**  
✅ **Clean serialized responses**  
✅ **TypeScript interfaces** for type safety  
✅ **Async/Await** with proper error handling

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The server will start on http://localhost:8080

## API Endpoints

### 1. Search Mutual Funds

**GET** `/api/mf/search?q={query}`

Search for mutual funds by name or keyword.

**Parameters:**

- `q` (required): Search query string

**Example:**

```bash
curl "http://localhost:8080/api/mf/search?q=hdfc"
```

**Response:**

```json
{
  "success": true,
  "message": "Search completed successfully",
  "data": [
    {
      "schemeCode": "125497",
      "schemeName": "HDFC Balanced Advantage Fund"
    },
    { ... }
  ],
  "count": 15
}
```

### 2. Latest NAV

**GET** `/api/mf/{schemeCode}/latest`

Get the latest Net Asset Value for a specific mutual fund scheme.

**Parameters:**

- `schemeCode` (required): Scheme code of the mutual fund

**Example:**

```bash
curl "http://localhost:8080/api/mf/125497/latest"
```

**Response:**

```json
{
  "success": true,
  "message": "Latest NAV fetched successfully",
  "data": {
    "schemeName": "SBI Small Cap Fund - Direct Plan - Growth",
    "schemeCode": 125497,
    "latestNav": 178.3891,
    "date": "11-03-2026"
  }
}
```

### 3. Historical NAV (Bonus Feature)

**GET** `/api/mf/{schemeCode}/historical?startDate={date}&endDate={date}`

Get historical NAV data for a scheme with optional date filtering.

**Parameters:**

- `schemeCode` (required): Scheme code of the mutual fund
- `startDate` (optional): Start date (YYYY-MM-DD format)
- `endDate` (optional): End date (YYYY-MM-DD format)

**Example:**

```bash
curl "http://localhost:8080/api/mf/125497/historical?startDate=2024-01-01&endDate=2024-03-13"
```


## Error Handling

The API includes comprehensive error handling:

- **Validation Errors (400)**: Input validation failures
- **API Errors (4xx/5xx)**: External API communication issues
- **Application Errors**: Custom business logic errors
- **Unknown Errors (500)**: Unexpected server errors

**Error Response Format:**

```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Invalid input data",
  "details": [
    {
      "field": "q",
      "message": "Query parameter is required"
    }
  ]
}
```

## Input Validation

All endpoints use Zod schemas for input validation:

- Search query validation
- Scheme code validation
- Date range validation
- Parameter type checking

## Development

The codebase follows Node.js best practices:

- Async/Await for asynchronous operations
- Try/Catch blocks for error handling
- Modular architecture with separation of concerns
- Clean serialized API responses
- Input validation and sanitization

## Dependencies

- **express**: Web framework
- **axios**: HTTP client for API calls
- **cors**: Cross-origin resource sharing
- **zod**: Input validation and type safety

## Environment Variables

- `PORT`: Server port (default: 8080)

## License

ISC License
