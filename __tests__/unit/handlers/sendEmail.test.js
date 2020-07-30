const { sendMigrationReport } = require("../../../index");

// This includes all tests for putItemHandler()
describe("Test send email", function () {
  jest.setTimeout(30000);
  // This test invokes putItemHandler() and compare the result
  it("should send the email", async () => {
    const event = {
      httpMethod: "POST",
      body: "This is a test to send the email",
    };

    // Invoke putItemHandler()
    const result = await sendMigrationReport(event);
    const expectedStatusCode = 200;

    // Compare the result with the expected result
    expect(result.statusCode).toEqual(expectedStatusCode);
  });
});
