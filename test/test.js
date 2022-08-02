var chakram = require('chakram'),
  expect = chakram.expect;

describe("Questions Answers API", function() {
  var apiResponse;

  before(function () {
    apiResponse = chakram.get("http://localhost:3001/qa/questions?product_id=40350&count=5&page=1");
    return apiResponse;
  });

  it("should return 200 on success", function () {
    return expect(apiResponse).to.have.status(200);
  });
});
