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
              "id": "wqxr_1579038687_146376",
              "type": "track"
            }
        },
        "recent-tracks": {
          "data": [
            {
              "id": "wqxr_1578940093_125296",
              "type": "track"
            },
            {
              "id": "wqxr_1578939669_110109",
              "type": "track"
            },
            {
              "id": "wqxr_1578938385_142369",
              "type": "track"
            }
          ]
        }
      }
    },
    "included": [
      {
        "id": "wqxr_1579038687_146376",
        "type": "track",
        "attributes": {
          "album": "Stokowski | Transcriptions",
          "epoch-start-time": 1579038687,
          "composer": "Richard Wagner",
          "conductor": "Jose Serebrier, conductor",
          "length": "485935",
          "title": "Das Rheingold: 'Entry of Gods into Valhalla'",
          "ensemble": "Bournemouth Symphony Orchestra",
          "start-time": "2020-01-13T18:45:13+00:00",
          "david-guid": "{8BA3731B-7C78-4692-9E25-6E80153E115F}",
          "reclabel": "Naxos",
          "catno": "8578305",
          "mm-uid": "146376",
        }
      },
      {
        "id": "wqxr_1578940093_125296",
        "type": "track",
        "attributes": {
          "album": "Dvorak: Serenades",
          "epoch-start-time": 1578940093,
          "composer": "Antonin Dvorak",
          "conductor": "Myung-Whun Chung, conductor",
          "length": "1375239",
          "title": "Serenade in D Minor for Wind Ensemble, Op. 44 (B77)",
          "ensemble": "Members of the Vienna Philharmonic",
          "start-time": "2020-01-13T18:28:13+00:00",
          "david-guid": "{E79379D2-D926-492B-947B-0DE705EBCE1A}",
          "reclabel": "Deutsche Grammophon",
          "catno": "471 613-2",
          "mm-uid": "125296",
        }
      },
      {
        "id": "wqxr_1578939669_110109",
        "type": "track",
        "attributes": {
          "ensemble": "Cleveland Orchestra",
          "start-time": "2020-01-13T18:21:09+00:00",
          "david-guid": "{A6E11D35-5488-43DA-A040-69263B55AB83}",
          "epoch-start-time": 1578939669,
          "reclabel": "Deutsche Grammophon",
          "composer": "Maurice Ravel",
          "conductor": "Pierre Boulez, conductor",
          "catno": "457693",
          "length": "396266",
          "title": "Pavane for a Dead Princess",
          "mm-uid": "110109"
        }
      },
      {
        "id": "wqxr_1578938385_142369",
        "type": "track",
        "attributes": {
          "album": "Haydn Piano Sonatas",
          "epoch-start-time": 1578938385,
          "composer": "Franz Joseph Haydn",
          "conductor": "Scott Yoo, conductor",
          "length": "1179708",
          "title": "Piano Concerto in D Hob. 18",
          "ensemble": "Odense Symphony Orchestra",
          "start-time": "2020-01-13T17:59:45+00:00",
          "david-guid": "{5D2B55F5-851D-4A2E-A18D-1062DEA8D64A}",
          "reclabel": "Bridge",
          "catno": "9438A/B",
          "soloists": ["Anne-Marie McDermott, piano"],
          "mm-uid": "142369"
        }
      }
    ]
  }
}
