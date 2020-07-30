const fs = require("fs");

// This includes all tests for putItemHandler()
describe("Test send email", function () {
  jest.setTimeout(30000);
  // This test invokes putItemHandler() and compare the result
  it("should send the email", async () => {
    const body = fs.readFileSync("__tests__/unit/handlers/hourly_report.html");

    const event = {
      httpMethod: "POST",
      body,
    };

    // Invoke putItemHandler()
    const { sendMigrationReport } = require("../../../index");
    const result = await sendMigrationReport(event);
    const expectedStatusCode = 200;

    // Compare the result with the expected result
    expect(result.statusCode).toEqual(expectedStatusCode);
  });
});
