# Test Endpoints

## Base URLs

- Local: http://localhost:8080
- Live: http://18.205.25.250:8080

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

### 3. User Signup

```bash
curl -X POST "http://localhost:8080/api/user/signup" \
	-H "Content-Type: application/json" \
	-d '{
		"fullName": "Ravi Shankar",
		"panNumber": "ABCDE1234F",
		"dateOfBirth": "1990-05-15",
		"email": "ravi@example.com",
		"mobile": "9876543210"
	}'
```

Expected response:

```json
{
  "success": true,
  "userId": "USR-1773416261981",
  "message": "Client registered successfully with BSE StAR MF 2.0"
}
```

### 4. Order Entry

```bash
curl -X POST "http://localhost:8080/api/order/entry" \
	-H "Content-Type: application/json" \
	-d '{
		"fundIsin": "INF179K01AA6",
		"investmentAmount": 5000,
		"folioNumber": "12345678"
	}'
```

Expected response:

```json
{
  "success": true,
  "orderId": "BSE998877",
  "message": "Order accepted"
}
```

### 5. Scheme Details

```bash
curl "http://localhost:8080/api/scheme/details/119551"
```

Expected response:

```json
{
  "success": true,
  "message": "Scheme details fetched successfully",
  "data": {
    "schemeName": "Axis Bluechip Fund Direct Growth",
    "isin": "INF846K01DP8",
    "category": "Equity - Large Cap",
    "amcCode": "AMC001",
    "isSipAllowed": true
  }
}
```

### 6. Get latest NAV (using common scheme codes)

```bash

# SBI Bluechip Fund
curl "http://localhost:8080/api/mf/125497/latest"

# BARODA ELSS Fund
curl "http://localhost:8080/api/mf/100068/latest"


```

### 7. Get historical NAV data

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
