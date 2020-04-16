export default function(/* response */) {
  return {
    "data": {
      "type": "whats-on",
      "id": "whats-on", // this is a singleton resource
      "attributes": {
        "air-break": false
      },
      "relationships": {
        "current-track": {
           "data": {
              "id": "wqxr_1579047225_151067",
              "type": "track"
            }
        },
        "recent-tracks": {
          "data": [
            {
              "id": "wqxr_1579046402_106488",
              "type": "track"
            },
            {
              "id": "wqxr_1578959659_125565",
              "type": "track"
            },
            {
              "id": "wqxr_1578959010_119529",
              "type": "track"
            }
          ]
        }
      }
    },
    "included": [
      {
        "id": "wqxr_1579047225_151067",
        "type": "track",
        "attributes": {
          "start-time": "2020-01-15T00:13:45+00:00",
          "epoch-start-time": 1579047225,
          "length": "00:19:56",
          "soloists": null,
          "mm-uid": "151067",
          "title": "Suite in D Major, Op. 49",
          "start-date": "01/14/2020",
        }
      },
      {
        "id": "wqxr_1579046402_106488",
        "type": "track",
        "attributes": {
          "start-time": "2020-01-15T00:00:02+00:00",
          "epoch-start-time": 1579046402,
          "length": "00:11:45",
          "soloist": "Mischa Maisky, cello",
          "mm-uid": "106488",
          "title": "Variations on a Theme of Handel, WoO 45",
          "start-date": "01/14/2020"
        }
      },
      {
        "id": "wqxr_1578959659_125565",
        "type": "track",
        "attributes": {
          "album": "The Orchestral Music of Ives",
          "epoch-start-time": 1578959659,
          "composer": "Charles Ives",
          "conductor": "James Sinclair, conductor",
          "length": "298737",
          "title": "Postlude in F Major",
          "ensemble": "Orchestra New England",
          "start-time": "2020-01-13T23:54:19+00:00",
          "david-guid": "{7CE21E28-DDD7-438A-9102-84465F52B3D8}",
          "reclabel": "KOCH",
          "catno": "3-7025-2",
          "mm-uid": "125565"
        }
      },
      {
        "id": "wqxr_1578959010_119529",
        "type": "track",
        "attributes": {
          "album": "Italian Concertos",
          "epoch-start-time": 1578959010,
          "composer": "Alessandro Marcello",
          "conductor": "Jonathan Morton, conductor",
          "length": "631512",
          "title": "Oboe Concerto in B-flat, Op. 7",
          "ensemble": "Scottish Ensemble",
          "start-time": "2020-01-13T23:43:30+00:00",
          "david-guid": "{79477CC5-0C7F-4892-BF90-E8E5A9EAA2B6}",
          "reclabel": "Angel/EMI",
          "catno": "56094",
          "soloists": ["Alison Balsom, trumpet"],
          "mm-uid": "119529"
        }
      }
    ]
  }
}
