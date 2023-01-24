const { deterministicPartitionKey, getDataHash} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the literal '0' when given empty event",()=>{
    expect(deterministicPartitionKey(null)).toBe("0");
  })
  it("Returns the partitionKey when given a string partitionKey ",()=>{
    const event = { partitionKey: "123" };
    expect(deterministicPartitionKey(event)).toBe(event.partitionKey);
  })
  it("Returns the hash of the event when given event with no partitionKey",()=>{
    const event = { data:"here we go again"}
    expect(deterministicPartitionKey(event)).toBe(getDataHash(JSON.stringify(event)));
  })
  it("Returns the same event partition key when given event with partitionKey that is a number",()=>{
    const event = { partitionKey: 12345}
    expect(deterministicPartitionKey(event)).toBe("12345");
  })
  it("Returns the the hash of the event when given event with partition key is 300 chars long", ()=>{
    const event = { partitionKey: "1".repeat(300)}
    expect(deterministicPartitionKey(event)).not.toBe(event.partitionKey);
  })
  it("Returns the the event partition key when given event with partition key is 256 chars long",()=>{
    const event = { partitionKey: "2".repeat(256) }
    expect(deterministicPartitionKey(event)).toBe(event.partitionKey);
  })
});
