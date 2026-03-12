# Test Endpoints

## Start the server first

```bash
npm run dev
```

## Test using curl commands:

### 1. Health Check

```bash
curl "http://localhost:8080/"
```

### 2. Search for mutual funds

```bash
# Search for HDFC funds
curl "http://localhost:8080/api/mf/search?q=hdfc"

# Search for SBI funds
curl "http://localhost:8080/api/mf/search?q=sbi"

# Search for equity funds
curl "http://localhost:8080/api/mf/search?q=equity"
```

### 3. Get latest NAV (using common scheme codes)

```bash

# SBI Bluechip Fund
curl "http://localhost:8080/api/mf/125497/latest"

# BARODA ELSS Fund
curl "http://localhost:8080/api/mf/100068/latest"


```

### 4. Get historical NAV data

```bash
# Get last 30 days data
curl "http://localhost:8080/api/mf/125497/historical"

# Get data for specific date range
curl "http://localhost:8080/api/mf/125497/historical?startDate=2024-01-01&endDate=2024-03-13"
```

## Test with Invalid Data (Error Handling)

### Missing query parameter

```bash
curl "http://localhost:8080/api/mf/search"
```

### Invalid scheme code

```bash
curl "http://localhost:8080/api/mf/invalid123/latest"
```

### Invalid date format

```bash
curl "http://localhost:8080/api/mf/100001/historical?startDate=invalid-date"
```
