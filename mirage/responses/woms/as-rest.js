// This is just a simple function to convert the normal woms socket response
// to the response it gives on the rest endpoint

export default function(response) {
  return {
    "meta": {
      "message": ""
    },
    "data": {
      "type": "metadata",
      "id": "1",
      "attributes": response
    }
  }
}
