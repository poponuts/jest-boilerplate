# Jest Boilerplate framework: Unit tests using Jest for each functions or unit of code

## App overview
A calculator that determines the cost of bookings. A booking is the time worked between a provider and consumer.

The application should read a collection of bookings from a provided JSON file, calculate the cost of each booking and write the result to a new file.

### Setup and running in local machine
`npm init -y` to install package dependencies
`npm start` to run app (`calculator.js`)
`npm test` to run unit tests (`calculator.test.js`)
`npx jest --coverage` to see code coverage (report is generated in `coverage` folder)

## Input
The file input.json contains a collection of bookings. Each booking has an id, a from datetime and to datetime:
```json
[
  {
    "id": 1,
    "from": "2017-10-23T08:00:00+11:00",
    "to": "2017-10-23T11:00:00+11:00"
  },
  {
    "id": 2,
    "from": "2017-10-20T09:00:00+11:00",
    "to": "2017-10-20T11:45:00+11:00"
  }
]
```

## Business rules

### Hourly rates
The rules to calculate the hourly rate of a booking are summarised below:

| Rate Type | From | To | Rate ($) |
| -------- | ------- | -------- | ----------- |
| Day  | 0600 | 2000 | 38
| Night | 2000 | 0600 | 42.93
| Sat | All day | All day | 45.91
| Sun | All day | All day | 60.85

### Rules
- The minimum booking time is 1 hour
- The maximum booking time is 24 hours
- A booking cannot end before it has started
- A booking can be booked in 15 min increments e.g. 1600 to 1715
- If any part of a booking is charged at the night rate, the whole booking is charged at the night rate:
  * Fri 1800 - 2100 will be charged at the night rate (3 x 42.93)
  * Wed 0500 - 1000 will be charged at the night rate (5 x 42.93)
- Saturday and Sunday rates apply across the whole day, there's no distinction between day and night:
  * Sat 1800 - 2200 will be charged at the sat rate (4 x 45.91)
  * Sun 0100 - 0700 will be charged at the sun rate (6 x 60.85)

## Output
The application should create a file called output.json containing the array of booking objects with total and isValid properties added. If the booking breaks one of the business rules, the total should be set to 0 and the isValid flag marked false.

```json
[
  {
    "id": 1,
    "from": "2017-10-23T08:00:00+11:00",
    "to": "2017-10-23T11:00:00+11:00",
    "isValid": true,
    "total": 114
  },
  {
    "id": 2,
    "from": "2017-10-20T09:00:00+11:00",
    "to": "2017-10-20T11:45:00+11:00" ,
    "isValid": true,
    "total": 104.50
  },
]
```
The expected output can be found in [expectedOutput.json](./expectedOutput.json)
