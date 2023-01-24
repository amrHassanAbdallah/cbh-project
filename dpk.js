const crypto = require("crypto");

const getDataHash = (data, algorithm = "sha3-512" , encoding = "hex") => {
  return crypto.createHash("sha3-512").update(data).digest("hex")
}
const eventKey = (event) =>{
  return  event.partitionKey
}
const eventData = (event) =>{
  const data = JSON.stringify(event)
  return getDataHash(data)
}
const EventCandidateGenerator = function (){
  this.execute = (event) =>{
    let handler;
    if (event.partitionKey){
      handler = eventKey
    }else{
      handler = eventData
    }
    return handler(event)
  }
}

const deterministicPartitionKey = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = "0";

  if (event) {
    const eventCandidateGenerator = new EventCandidateGenerator()
    candidate = eventCandidateGenerator.execute(event)
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
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