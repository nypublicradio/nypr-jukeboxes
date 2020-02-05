export default function() {
  return {
    data: {
      type: "show",
      id: "317",
      attributes: {
        slug: "morning",
        title: "Mornings with Jeff Spurgeon",
        url: "https://wqxr.demo2.wnyc.net/shows/morning",
        linkroll: [{ href: null, "nav-slug": "about", title: "About" }],
        about: {
          body:
            '<p>Jeff Spurgeon is the long-time morning man at WQXR. He starts the day with a witty sense of humor, introduces your Morning Bach at 7:30 am, and gets you going with the Out-the-Door Dedication. Jeff is our resident expert at getting up early and also early music. Send your greetings to jeff@wqxr.org or tweet him at @JeffWQXR.</p>\n<blockquote>\n<p>"This music touches people in so many powerful ways. I love sharing great recordings, because I know they really do thrill and inspire and comfort people."</p>\n</blockquote>',
          people: [
            {
              name: "Jeff Spurgeon",
              social: [
                { "contact-string": "@JeffWQXR", service: "twitter" },
                { "contact-string": "", service: "facebook" },
                { "contact-string": "", service: "instagram" }
              ],
              url: "/people/jeff-spurgeon/",
              "job-title": "WQXR Host",
              image: {
                "alt-text": "Host Jeff Spurgeon.",
                name: "photologue/photos/Jeff-Spurgeon.jpg",
                source: null,
                url:
                  "https://media.demo.nypr.digital/i/800/533/c/80/photologue/photos/Jeff-Spurgeon.jpg",
                h: 533,
                "is-display": true,
                crop: "c",
                caption: "Host Jeff Spurgeon.",
                "credits-url": "",
                template:
                  "https://media.demo.nypr.digital/i/%s/%s/%s/%s/photologue/photos/Jeff-Spurgeon.jpg",
                w: 800,
                id: 57524,
                "credits-name": "Marco Antonio"
              },
              slug: "jeff-spurgeon"
            }
          ],
          social: [
            { "contact-string": "@JeffWQXR", service: "twitter" },
            { "contact-string": "", service: "facebook" },
            { "contact-string": "", service: "instagram" }
          ]
        },
        description:
          '<p>Jeff Spurgeon is the long-time morning man at WQXR. He starts the day with a witty sense of humor, introduces your Morning Bach at 7:30 am, and gets you going with the Out-the-Door Dedication. Jeff is our resident expert at getting up early and also early music. Send your greetings to jeff@wqxr.org or tweet him&nbsp;at @JeffWQXR.</p>\r\n<blockquote>\r\n<p>"This music touches people in so many powerful ways. I love sharing great recordings, because I know they really do thrill and inspire and comfort people."</p>\r\n</blockquote>',
        "social-links": null,
        "bg-color": "rgba(0,0,0,1)",
        featured: null,
        "sidebar-chunks": [null, null],
        "donate-chunk": { content: "", slug: "" },
        "listing-object-type": "show",
        "rss-feed": "http://wqxr.demo2.wnyc.net/feeds/shows/morning",
        "edit-link": ["cms/show/317"],
        "podcast-links": null,
        "itunes-podcast-id": null,
        "studios-marquee-mobile-offset": null,
        "cms-pk": 317,
        tease: "<p>Jeff Spurgeon&nbsp;is the morning host on WQXR.</p>",
        "schedule-summary":
          "Airs weekdays at 5:30 am on WQXR. Find Jeff on Twitter @JeffWQXR.",
        "contact-email": "test@wqxr.org"
      },
      relationships: {
        image: { data: { type: "image", id: "163631" } },
        "marquee-image": { data: { type: "image", id: "163673" } },
        "studios-marquee-image": { data: null },
        "fb-image": { data: null },
        "producing-organizations": {
          meta: { count: 1 },
          data: [{ type: "producing-organization", id: "74" }]
        }
      }
    },
    included: [
      {
        type: "image",
        id: "163631",
        attributes: {
          caption: "",
          "credits-url": "",
          "credits-name": "wqxr",
          crop: "l",
          h: 1400,
          "is-display": true,
          name: "1/JeffSpurgeon_WQXR_ShowPageSquares.png",
          source: "",
          template:
            "https://media.demo.nypr.digital/i/%s/%s/%s/%s/1/JeffSpurgeon_WQXR_ShowPageSquares.png",
          url:
            "https://media.demo.nypr.digital/i/1400/1400/l/80/1/JeffSpurgeon_WQXR_ShowPageSquares.png",
          w: 1400
        }
      },
      {
        type: "image",
        id: "163673",
        attributes: {
          caption: "",
          "credits-url": "",
          "credits-name": "wqxr",
          crop: "l",
          h: 200,
          "is-display": true,
          name: "1/JeffSpurgeon_HostMarquee.png",
          source: "",
          template:
            "https://media.demo.nypr.digital/i/%s/%s/%s/%s/1/JeffSpurgeon_HostMarquee.png",
          url:
            "https://media.demo.nypr.digital/i/1200/200/l/80/1/JeffSpurgeon_HostMarquee.png",
          w: 1200
        }
      },
      {
        type: "producing-organization",
        id: "74",
        attributes: { name: "WQXR", url: "http://www.wqxr.org" },
        relationships: { logo: { data: null } }
      }
    ]
  };
}
