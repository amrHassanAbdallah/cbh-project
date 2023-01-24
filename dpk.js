const crypto = require("crypto");

const getDataHash = (data, algorithm = "sha3-512" , encoding = "hex") => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

const deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = getDataHash(data);
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getDataHash(candidate);
  }
  return candidate;
};

module.exports = {
    getDataHash,
    deterministicPartitionKey
}