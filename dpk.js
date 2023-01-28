const crypto = require("crypto");

const createHash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");
const getEventData = (event) => JSON.stringify(event);

const getEventPartitionKey = (event) => event && event.partitionKey;
const getEventDataHash = (event) => createHash(getEventData(event));

const getEventPartitionKeyOrDataHash = (event) => getEventPartitionKey(event) || getEventDataHash(event);

const MAX_PARTITION_KEY_LENGTH = 256;
const TRIVIAL_PARTITION_KEY = "0";


const deterministicPartitionKey = (event) => {
  let partitionKeyCandidate = getEventPartitionKeyOrDataHash(event) || TRIVIAL_PARTITION_KEY;

  if (partitionKeyCandidate.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKeyCandidate = createHash(partitionKeyCandidate);
  }
  return partitionKeyCandidate;
};

module.exports = {
    getDataHash,
    deterministicPartitionKey
}
