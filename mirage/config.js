import annieBergenResponse from './responses/shows-annie-bergen';
import playlistDailyResponse from './responses/playlist-daily';
import asRest from './responses/woms/as-rest';
import womsSocketResponse from './responses/woms/socket/david';
import whatsOnResponse from './responses/whats-on';
import wqxrStreamResponse from './responses/wqxr-stream';



export default function() {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.logging = true;       // print log of intercepted requests in console

  /*------------------------------------------------------------
    legacy (v1) endpoints
  --------------------------------------------------------------*/
  this.get("/api/v1/list/streams", {
    count: 13,
    expires: "2019-12-23T13:04:25",
    results: [
      {
        premium: false,
        source_tags: "",
        aac_streams: "",
        image_logo:
          "https://media.demo.nypr.digital/i/1400/1400/l/80/1/Indivisible_3.png",
        site_id: 14,
        mobile_stream: "",
        whats_on: false,
        twitter_handle: "",
        stream_type: [3, "web video"],
        id: 45,
        always_broadcasting: false,
        site_priority: 4,
        blackberry_stream: "https://indivisible.wnyc.org/wnycsp",
        name: "Indivisible",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/WNYC_FM_2_Dy0Ob0m.svg",
        audio_bumper: null,
        slug: "indivisible",
        schedule_url:
          "http://account.demo2.wnyc.net/schedule/?scheduleStation=indivisible",
        has_playlists: false,
        urls: {
          ipod: "",
          rtsp: "https://indivisible.wnyc.org/wnycsp",
          aac_pls: ["/stream/indivisible/aac.pls"],
          windows_asx: ["/stream/indivisible/windows.asx"],
          rtmp: [
            "(rtmp://wnyc-wowza.streamguys.com/takeaway,mp4:takeaway.stream)"
          ],
          mobile_aac: "",
          web_aac: "",
          aac: [],
          windows: ["https://indivisible.wnyc.org/wnycsp"],
          mobile: "",
          mp3: ["https://indivisible.wnyc.org/wnycsp"],
          mp3_pls: ["/stream/indivisible/mp3.pls"]
        },
        short_description: "",
        windows_streams: "https://indivisible.wnyc.org/wnycsp",
        mp3_streams: "https://indivisible.wnyc.org/wnycsp"
      },
      {
        premium: true,
        source_tags: "wqxr_app",
        image_logo:
          "https://media.demo.nypr.digital/i/300/300/c/80/1/wqxr_2.png",
        site_id: 3,
        whats_on: false,
        twitter_handle: "",
        stream_type: [3, "web video"],
        id: 10,
        always_broadcasting: false,
        site_priority: 4,
        name: "Fundraiser Free WQXR",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/WQXR_4_Ke7lP4W.svg",
        audio_bumper: null,
        slug: "wqxr-special2-same-as-holiday",
        playlist_url:
          "http://culture.demo2.wnyc.net/playlist-daily/?scheduleStation=wqxr-special2-same-as-holiday",
        schedule_url:
          "http://culture.demo2.wnyc.net/schedule/?scheduleStation=wqxr-special2-same-as-holiday",
        has_playlists: true,
        short_description: ""
      },
      {
        premium: false,
        source_tags: "wnyc_site",
        aac_streams: "",
        image_logo:
          "https://media.demo.nypr.digital/i/500/500/l/80/1/wnyc_2_1_ucwLL8o.png",
        site_id: 1,
        mobile_stream: "",
        whats_on: false,
        twitter_handle: "",
        stream_type: [2, "web audio"],
        id: 6,
        always_broadcasting: true,
        site_priority: 1,
        blackberry_stream: "https://specialstream.wnyc.org/wnycsp",
        name: "Special Programming 2",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/SpecialStreams.svg",
        audio_bumper: null,
        slug: "takeaway",
        schedule_url:
          "http://wnyc.demo2.wnyc.net/schedule/?scheduleStation=takeaway",
        has_playlists: false,
        urls: {
          ipod: "https://takeaway.wnyc.org/wnycsp",
          rtsp: "https://specialstream.wnyc.org/wnycsp",
          aac_pls: ["/stream/takeaway/aac.pls"],
          windows_asx: ["/stream/takeaway/windows.asx"],
          rtmp: [
            "(rtmp://wnyc-wowza.streamguys.com/takeaway,mp4:takeaway.stream)"
          ],
          mobile_aac: "",
          web_aac: "",
          aac: [],
          windows: [],
          mobile: "",
          mp3: ["https://takeaway.wnyc.org/wnycsp"],
          mp3_pls: ["/stream/takeaway/mp3.pls"]
        },
        short_description: "",
        windows_streams: "",
        mp3_streams: "https://takeaway.wnyc.org/wnycsp"
      },
      {
        premium: false,
        source_tags: "wnyc_site",
        aac_streams: "http://fm939.wnyc.org/wnycfm.aac",
        image_logo:
          "https://media.demo.nypr.digital/i/500/500/c/80/1/wnyc_2_1.png",
        site_id: 1,
        mobile_stream: "https://fm939.wnyc.org/wnycfm-mobile",
        whats_on: 882225,
        twitter_handle: "",
        stream_type: [2, "web audio"],
        id: 1,
        always_broadcasting: true,
        site_priority: 1,
        blackberry_stream: "https://fm939.wnyc.org/wnycfm-web",
        name: "WNYC 93.9 FM",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/WNYC_FM_2.svg",
        audio_bumper:
          "https://audio.wnyc.org/streambumper/streambumper000001_wnycfm.mp3",
        slug: "wnyc-fm939",
        schedule_url:
          "http://wnyc.demo2.wnyc.net/schedule/?scheduleStation=wnyc-fm939",
        has_playlists: false,
        urls: {
          ipod: "https://hls-live.wnyc.org/wnycfm/playlist.m3u8",
          rtsp: "https://fm939.wnyc.org/wnycfm-web",
          aac_pls: ["/stream/wnyc-fm939/aac.pls"],
          windows_asx: ["/stream/wnyc-fm939/windows.asx"],
          rtmp: ["(rtmp://wnyc-wowza.streamguys.com:80/wnycfm,mp4:wnycfm.sdp)"],
          mobile_aac: "https://fm939.wnyc.org/wnycfm-mobile.aac",
          web_aac: "",
          aac: ["http://fm939.wnyc.org/wnycfm.aac"],
          windows: ["http://fm939.wnyc.org/wnycfm"],
          mobile: "https://fm939.wnyc.org/wnycfm-mobile",
          mp3: ["http://fm939.wnyc.org/wnycfm"],
          mp3_pls: ["/stream/wnyc-fm939/mp3.pls"]
        },
        short_description: "News, Culture & Talk",
        windows_streams: "http://fm939.wnyc.org/wnycfm",
        mp3_streams: "http://fm939.wnyc.org/wnycfm"
      },
      {
        premium: false,
        source_tags: "wnyc_site",
        aac_streams: "http://am820.wnyc.org/wnycam.aac",
        image_logo:
          "https://media.demo.nypr.digital/i/500/500/c/80/1/wnyc_2_1.png",
        site_id: 1,
        mobile_stream: "https://am820.wnyc.org/wnycam-mobile",
        whats_on: 882225,
        twitter_handle: "",
        stream_type: [2, "web audio"],
        id: 2,
        always_broadcasting: true,
        site_priority: 2,
        blackberry_stream: "https://am820.wnyc.org/wnycam-web",
        name: "WNYC AM 820",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/WNYC_AM_2.svg",
        audio_bumper:
          "https://audio.wnyc.org/streambumper/streambumper000002_wnycam.mp3",
        slug: "wnyc-am820",
        schedule_url:
          "http://wnyc.demo2.wnyc.net/schedule/?scheduleStation=wnyc-am820",
        has_playlists: false,
        urls: {
          ipod: "https://hls-live.wnyc.org/wnycam/playlist.m3u8",
          rtsp: "https://am820.wnyc.org/wnycam-web",
          aac_pls: ["/stream/wnyc-am820/aac.pls"],
          windows_asx: ["/stream/wnyc-am820/windows.asx"],
          rtmp: ["(rtmp://wnyc-wowza.streamguys.com:80/wnycam,mp4:wnycam.sdp)"],
          mobile_aac: "https://am820.wnyc.org/wnycam-mobile.aac",
          web_aac: "",
          aac: ["http://am820.wnyc.org/wnycam.aac"],
          windows: ["http://am820.wnyc.org/wnycam"],
          mobile: "https://am820.wnyc.org/wnycam-mobile",
          mp3: ["http://am820.wnyc.org/wnycam"],
          mp3_pls: ["/stream/wnyc-am820/mp3.pls"]
        },
        short_description: "News, Culture & Talk",
        windows_streams: "http://am820.wnyc.org/wnycam",
        mp3_streams: "http://am820.wnyc.org/wnycam"
      },
      {
        premium: false,
        source_tags: "wnyc_site,wqxr_app,wnyc_app",
        aac_streams: "http://specialstream.wnyc.org/wnyc-special.aac",
        image_logo:
          "https://media.demo.nypr.digital/i/1400/1400/l/80/1/holiday_standards.png",
        site_id: 1,
        mobile_stream: "https://specialstream.wnyc.org/wnyc-special-mobile",
        whats_on: 818984,
        twitter_handle: "",
        stream_type: [3, "web video"],
        id: 5,
        always_broadcasting: true,
        site_priority: 5,
        blackberry_stream: "https://specialstream.wnyc.org/wnyc-special-web",
        name: "Special Programming 1",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/holiday_standards_R4mFhQw.svg",
        audio_bumper: null,
        slug: "special-events-stream",
        schedule_url:
          "http://wnyc.demo2.wnyc.net/schedule/?scheduleStation=special-events-stream",
        has_playlists: false,
        urls: {
          ipod: "https://hls-live.wnyc.org/wnycsp/playlist.m3u8",
          rtsp: "https://specialstream.wnyc.org/wnyc-special-web",
          aac_pls: ["/stream/special-events-stream/aac.pls"],
          windows_asx: ["/stream/special-events-stream/windows.asx"],
          rtmp: [
            "(rtmp://wnyc-wowza.streamguys.com/wnyc-special,wnyc-special.stream)"
          ],
          mobile_aac: "https://specialstream.wnyc.org/wnyc-special-mobile.aac",
          web_aac: "",
          aac: ["http://specialstream.wnyc.org/wnyc-special.aac"],
          windows: ["http://specialstream.wnyc.org/wnyc-special"],
          mobile: "https://specialstream.wnyc.org/wnyc-special-mobile",
          mp3: ["http://specialstream.wnyc.org/wnyc-special"],
          mp3_pls: ["/stream/special-events-stream/mp3.pls"]
        },
        short_description: "Swinging holiday soundtrack",
        windows_streams: "http://specialstream.wnyc.org/wnyc-special",
        mp3_streams: "http://specialstream.wnyc.org/wnyc-special"
      },
      {
        premium: false,
        source_tags: "wnyc_app",
        aac_streams: "https://stream.wqxr.org/qxr-special.aac",
        image_logo:
          "https://media.demo.nypr.digital/i/1400/1400/l/80/1/WQXR_HolidayChannel.png",
        site_id: 1,
        mobile_stream: "https://stream.wqxr.org/qxr-special-mobile",
        whats_on: false,
        twitter_handle: "",
        stream_type: [3, "web video"],
        id: 46,
        always_broadcasting: true,
        site_priority: 5,
        blackberry_stream: "https://stream.wqxr.org/qxr-special-web",
        name: "WQXR Holiday Channel",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/holiday_channel_wqxr.svg",
        audio_bumper: null,
        slug: "wqxr-holiday-channel-on-wnyc",
        schedule_url:
          "http://wnyc.demo2.wnyc.net/schedule/?scheduleStation=wqxr-holiday-channel-on-wnyc",
        has_playlists: false,
        urls: {
          ipod: "",
          rtsp: "https://stream.wqxr.org/qxr-special-web",
          aac_pls: ["/stream/wqxr-holiday-channel-on-wnyc/aac.pls"],
          windows_asx: ["/stream/wqxr-holiday-channel-on-wnyc/windows.asx"],
          rtmp: [
            "(rtmp://wnyc-wowza.streamguys.com:80/qxr-special,mp4:qxr-special)"
          ],
          mobile_aac: "https://stream.wqxr.org/qxr-special-mobile.aac",
          web_aac: "",
          aac: ["https://stream.wqxr.org/qxr-special.aac"],
          windows: ["https://stream.wqxr.org/qxr-special"],
          mobile: "https://stream.wqxr.org/qxr-special-mobile",
          mp3: ["https://stream.wqxr.org/qxr-special"],
          mp3_pls: ["/stream/wqxr-holiday-channel-on-wnyc/mp3.pls"]
        },
        short_description: "Classical holiday music stream",
        windows_streams: "https://stream.wqxr.org/qxr-special",
        mp3_streams: "https://stream.wqxr.org/qxr-special"
      },
      {
        premium: false,
        source_tags: "wnyc_site",
        aac_streams: "",
        image_logo:
          "https://media.demo.nypr.digital/i/500/500/c/80/1/njpr_3.png",
        site_id: 1,
        mobile_stream: "https://njpr.wnyc.org/njprweb-mobile",
        whats_on: 882225,
        twitter_handle: "",
        stream_type: [2, "web audio"],
        id: 8,
        always_broadcasting: true,
        site_priority: 6,
        blackberry_stream: "https://njpr.wnyc.org/njprweb-web",
        name: "NJPR",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/NJPR_1.svg",
        audio_bumper:
          "https://audio.wnyc.org/streambumper/streambumper000007_njpr.mp3",
        slug: "njpr",
        schedule_url:
          "http://wnyc.demo2.wnyc.net/schedule/?scheduleStation=njpr",
        has_playlists: false,
        urls: {
          ipod: "https://hls-live.wnyc.org/njpr-hls/playlist.m3u8",
          rtsp: "https://njpr.wnyc.org/njprweb-web",
          aac_pls: ["/stream/njpr/aac.pls"],
          windows_asx: ["/stream/njpr/windows.asx"],
          rtmp: ["(rtmp://wnyc-wowza.streamguys.com/wnjy,mp4:wnjy.stream)"],
          mobile_aac: "",
          web_aac: "",
          aac: [],
          windows: ["http://njpr.wnyc.org/njprweb"],
          mobile: "https://njpr.wnyc.org/njprweb-mobile",
          mp3: ["http://njpr.wnyc.org/njprweb"],
          mp3_pls: ["/stream/njpr/mp3.pls"]
        },
        short_description: "New Jersey News, Culture, Talk",
        windows_streams: "http://njpr.wnyc.org/njprweb",
        mp3_streams: "http://njpr.wnyc.org/njprweb"
      },
      {
        premium: false,
        source_tags: "wqxr_app, wqxr_site, wnyc_site",
        aac_streams: "http://tjc.wnyc.org/js-stream.aac",
        image_logo:
          "https://media.demo.nypr.digital/i/1400/1400/l/80/2018/11/american_standards_red_square.png",
        site_id: 1,
        mobile_stream: "https://tjc.wnyc.org/js-stream-mobile",
        whats_on: 436,
        twitter_handle: "jonathanwnyc",
        stream_type: [3, "web video"],
        id: 11,
        always_broadcasting: true,
        site_priority: 10,
        blackberry_stream: "https://tjc.wnyc.org/js-stream-web",
        name: "American Standards",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/american_standards_red.svg",
        audio_bumper:
          "https://audio.wnyc.org/streambumper/streambumper000004_tjc.mp3",
        slug: "jonathan-channel",
        playlist_url:
          "http://wnyc.demo2.wnyc.net/playlist-daily/?scheduleStation=jonathan-channel",
        schedule_url:
          "http://wnyc.demo2.wnyc.net/schedule/?scheduleStation=jonathan-channel",
        has_playlists: true,
        urls: {
          ipod: "https://hls-live.wnyc.org/tjc/playlist.m3u8",
          rtsp: "https://tjc.wnyc.org/js-stream-web",
          aac_pls: ["/stream/jonathan-channel/aac.pls"],
          windows_asx: ["/stream/jonathan-channel/windows.asx"],
          rtmp: [
            "(rtmp://wnyc-wowza.streamguys.com:80/js-stream,js-stream.stream)"
          ],
          mobile_aac: "https://tjc.wnyc.org/js-stream-mobile.aac",
          web_aac: "",
          aac: ["http://tjc.wnyc.org/js-stream.aac"],
          windows: ["http://tjc.wnyc.org/js-stream"],
          mobile: "https://tjc.wnyc.org/js-stream-mobile",
          mp3: ["http://tjc.wnyc.org/js-stream"],
          mp3_pls: ["/stream/jonathan-channel/mp3.pls"]
        },
        short_description: "Great American Songs from WNYC",
        windows_streams: "http://tjc.wnyc.org/js-stream",
        mp3_streams: "http://tjc.wnyc.org/js-stream"
      },
      {
        premium: false,
        source_tags: "wqxr_app, wqxr_site",
        aac_streams: "http://stream.wqxr.org/wqxr.aac",
        image_logo:
          "https://media.demo.nypr.digital/i/500/500/c/80/1/wqxr_1_1.png",
        site_id: 2,
        mobile_stream: "https://stream.wqxr.org/wqxr-mobile",
        whats_on: 103285,
        twitter_handle: "wqxr",
        stream_type: [2, "web audio"],
        id: 3,
        always_broadcasting: true,
        site_priority: 1,
        blackberry_stream: "https://stream.wqxr.org/wqxr-web",
        name: "WQXR 105.9 FM",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/WQXR_4.svg",
        audio_bumper:
          "https://audio.wnyc.org/streambumper/streambumper000003_wqxr.mp3",
        slug: "wqxr",
        playlist_url:
          "http://wqxr.demo2.wnyc.net/playlist-daily/?scheduleStation=wqxr",
        schedule_url:
          "http://wqxr.demo2.wnyc.net/schedule/?scheduleStation=wqxr",
        has_playlists: true,
        urls: {
          ipod: "https://hls-live.wnyc.org/wqxr/playlist.m3u8",
          rtsp: "https://stream.wqxr.org/wqxr-web",
          aac_pls: ["/stream/wqxr/aac.pls"],
          windows_asx: ["/stream/wqxr/windows.asx"],
          rtmp: ["(rtmp://wnyc-wowza.streamguys.com:80/wqxr,classical)"],
          mobile_aac: "https://stream.wqxr.org/wqxr-mobile.aac",
          web_aac: "",
          aac: ["http://stream.wqxr.org/wqxr.aac"],
          windows: ["http://stream.wqxr.org/wqxr"],
          mobile: "https://stream.wqxr.org/wqxr-mobile",
          mp3: ["http://stream.wqxr.org/wqxr"],
          mp3_pls: ["/stream/wqxr/mp3.pls"]
        },
        short_description: "The Best in Classical Music",
        windows_streams: "http://stream.wqxr.org/wqxr",
        mp3_streams: "http://stream.wqxr.org/wqxr"
      },
      {
        premium: false,
        source_tags: "wqxr_app, wqxr_site",
        aac_streams: "https://q2stream.wqxr.org/q2.aac",
        image_logo:
          "https://media.demo.nypr.digital/i/600/600/l/80/1/ns_showcard-newsounds-radio-1.jpg",
        site_id: 2,
        mobile_stream: "https://q2stream.wqxr.org/q2-mobile",
        whats_on: 842041,
        twitter_handle: "q2music",
        stream_type: [3, "web video"],
        id: 4,
        always_broadcasting: true,
        site_priority: 2,
        blackberry_stream: "https://q2stream.wqxr.org/q2-web",
        name: "New Sounds",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/Q2Music.svg",
        audio_bumper:
          "https://audio.wnyc.org/streambumper/streambumper000006_ns.mp3",
        slug: "q2",
        playlist_url:
          "http://wqxr.demo2.wnyc.net/playlist-daily/?scheduleStation=q2",
        schedule_url: "http://wqxr.demo2.wnyc.net/schedule/?scheduleStation=q2",
        has_playlists: true,
        urls: {
          ipod: "https://hls-live.wnyc.org/q2/playlist.m3u8",
          rtsp: "https://q2stream.wqxr.org/q2-web",
          aac_pls: ["/stream/q2/aac.pls"],
          windows_asx: ["/stream/q2/windows.asx"],
          rtmp: ["(rtmp://wnyc-wowza.streamguys.com:80/q2,q2.sdp)"],
          mobile_aac: "https://q2stream.wqxr.org/q2-mobile.aac",
          web_aac: "",
          aac: ["https://q2stream.wqxr.org/q2.aac"],
          windows: ["https://q2stream.wqxr.org/q2"],
          mobile: "https://q2stream.wqxr.org/q2-mobile",
          mp3: ["https://q2stream.wqxr.org/q2"],
          mp3_pls: ["/stream/q2/mp3.pls"]
        },
        short_description: "Hand-picked music, genre free.",
        windows_streams: "https://q2stream.wqxr.org/q2",
        mp3_streams: "https://q2stream.wqxr.org/q2"
      },
      {
        premium: false,
        source_tags: "wqxr_app,wqxr_site,wnyc_site",
        aac_streams: "https://stream.wqxr.org/qxr-special.aac",
        image_logo:
          "https://media.demo.nypr.digital/i/1400/1400/l/80/1/WQXR_HolidayChannel.png",
        site_id: 2,
        mobile_stream: "https://stream.wqxr.org/qxr-special-mobile",
        whats_on: 899627,
        twitter_handle: "",
        stream_type: [3, "web video"],
        id: 12,
        always_broadcasting: true,
        site_priority: 4,
        blackberry_stream: "https://stream.wqxr.org/qxr-special-web",
        name: "Holiday Channel",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/holiday_channel_wqxr_blue_lhD2oYZ.svg",
        audio_bumper: null,
        slug: "wqxr-special2",
        playlist_url:
          "http://wqxr.demo2.wnyc.net/playlist-daily/?scheduleStation=wqxr-special2",
        schedule_url:
          "http://wqxr.demo2.wnyc.net/schedule/?scheduleStation=wqxr-special2",
        has_playlists: true,
        urls: {
          ipod: "",
          rtsp: "https://stream.wqxr.org/qxr-special-web",
          aac_pls: ["/stream/wqxr-special2/aac.pls"],
          windows_asx: ["/stream/wqxr-special2/windows.asx"],
          rtmp: [
            "(rtmp://wnyc-wowza.streamguys.com:80/qxr-special,mp4:qxr-special)"
          ],
          mobile_aac: "https://stream.wqxr.org/qxr-special-mobile.aac",
          web_aac: "",
          aac: ["https://stream.wqxr.org/qxr-special.aac"],
          windows: ["https://stream.wqxr.org/qxr-special"],
          mobile: "https://stream.wqxr.org/qxr-special-mobile",
          mp3: ["https://stream.wqxr.org/qxr-special"],
          mp3_pls: ["/stream/wqxr-special2/mp3.pls"]
        },
        short_description: "Classical holiday music stream",
        windows_streams: "https://stream.wqxr.org/qxr-special",
        mp3_streams: "https://stream.wqxr.org/qxr-special"
      },
      {
        premium: false,
        source_tags: "wqxr_app, wqxr_site",
        aac_streams: "http://opera-stream.wqxr.org/operavore.aac",
        image_logo:
          "https://media.demo.nypr.digital/i/500/500/c/80/1/operavore_2.png",
        site_id: 2,
        mobile_stream: "https://opera-stream.wqxr.org/operavore-mobile",
        whats_on: 177251,
        twitter_handle: "operavore",
        stream_type: [3, "web video"],
        id: 7,
        always_broadcasting: false,
        site_priority: 6,
        blackberry_stream: "https://opera-stream.wqxr.org/operavore-web",
        name: "Operavore",
        svg_logo:
          "https://media.demo.nypr.digital/media/shared/cms_stationstream/svg_image/Operavore_4.svg",
        audio_bumper:
          "https://audio.wnyc.org/streambumper/streambumper000005_opera.mp3",
        slug: "wqxr-special",
        playlist_url:
          "http://wqxr.demo2.wnyc.net/playlist-daily/?scheduleStation=wqxr-special",
        schedule_url:
          "http://wqxr.demo2.wnyc.net/schedule/?scheduleStation=wqxr-special",
        has_playlists: true,
        urls: {
          ipod: "https://hls-live.wnyc.org/operavore/playlist.m3u8",
          rtsp: "https://opera-stream.wqxr.org/operavore-web",
          aac_pls: ["/stream/wqxr-special/aac.pls"],
          windows_asx: ["/stream/wqxr-special/windows.asx"],
          rtmp: [
            "(rtmp://wnyc-wowza.streamguys.com:80/operavore,operavore.stream)"
          ],
          mobile_aac: "https://opera-stream.wqxr.org/operavore-mobile.aac",
          web_aac: "",
          aac: ["http://opera-stream.wqxr.org/operavore.aac"],
          windows: ["http://opera-stream.wqxr.org/operavore"],
          mobile: "https://opera-stream.wqxr.org/operavore-mobile",
          mp3: ["http://opera-stream.wqxr.org/operavore"],
          mp3_pls: ["/stream/wqxr-special/mp3.pls"]
        },
        short_description: "All Opera - All The Time",
        windows_streams: "http://opera-stream.wqxr.org/operavore",
        mp3_streams: "http://opera-stream.wqxr.org/operavore"
      }
    ]
  });
  this.get("/api/v1/list/streams/:slug", wqxrStreamResponse());
  this.get("/api/v1/whats_on", {
    "wnyc-fm939": {
      name: "WNYC 93.9 FM",
      current_playlist_item: null,
      expires: "2019-12-23T13:04:33",
      current_show: {
        iso_start: "2019-12-23T17:00:00+00:00",
        description:
          "<p><span>ALL OF IT with Alison Stewart is a live daily conversation about culture and the culture in and around New York City.</span></p>",
        fullImage: {
          url:
            "https://media.demo.nypr.digital/i/300/300/l/80/2018/09/All_Of_It_NoWNYC_NoName.png",
          width: 300,
          caption: "",
          type: "image/png",
          height: 300
        },
        site_id: 1,
        start_ts: 1577120400.0,
        iso_end: "2019-12-23T19:00:00+00:00",
        listImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/2018/09/All_Of_It_NoWNYC_NoName.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        pk: 882225,
        show_url: "https://wnyc.demo2.wnyc.net/shows/all-of-it",
        end: "2019-12-23T14:00:00-0500",
        title: "All of It",
        url: "https://wnyc.demo2.wnyc.net/shows/all-of-it",
        end_ts: 1577127600.0,
        schedule_ref: "ShowSchedule:1398",
        group_slug: "all-of-it",
        detailImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/2018/09/All_Of_It_NoWNYC_NoName.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        start: "2019-12-23T12:00:00-0500"
      },
      future: [],
      has_playlists: false,
      expires_ts: 1577124273.0,
      slug: "wnyc-fm939"
    },
    q2: {
      name: "New Sounds",
      current_playlist_item: {
        start_time_ts: 1577123991.0,
        stream: "q2",
        playlist_entry_id: 2374221,
        start_time: "2019-12-23T12:59:51",
        playlist_page_url:
          "http://newsounds.demo2.wnyc.net/playlists/show/new-sounds-radio/2019/dec/23/",
        comments_url: "/api/list/comments/177/80910/",
        iso_start_time: "2019-12-23T17:59:51+00:00",
        catalog_entry: {
          reclabel: { url: "", name: "" },
          conductor: null,
          catno: "",
          composer: {
            url: "/music/musicians/laura-gibson/",
            pk: 11842,
            slug: "laura-gibson",
            name: "Laura Gibson"
          },
          attribution: "",
          soloists: [
            {
              instruments: [],
              musician: {
                url: "/music/musicians/laura-gibson/",
                pk: 11842,
                slug: "laura-gibson",
                name: "Laura Gibson"
              },
              role: "vocals"
            },
            {
              instruments: [],
              musician: {
                url: "/music/musicians/ethan-rose/",
                pk: 11843,
                slug: "ethan-rose",
                name: "Ethan Rose"
              },
              role: ""
            }
          ],
          title: "Tall Grass Darkstar",
          url: "http://wqxr.demo2.wnyc.net/music/recordings/23281/",
          additional_composers: [
            {
              url: "/music/musicians/ethan-rose/",
              pk: 11843,
              slug: "ethan-rose",
              name: "Ethan Rose"
            }
          ],
          audio_may_download: true,
          length: 343,
          pk: 23281,
          arkiv_link:
            "http://www.arkivmusic.com/classical/Playlist?source=WQXR&cat=&id=127235&label=",
          audio:
            "https://www.podtrac.com/pts/redirect.mp3/demo-audio.wnyc.org/_cms-qa-test/",
          ensemble: null,
          additional_ensembles: []
        }
      },
      expires: "2019-12-23T13:05:44",
      current_show: {
        iso_start: "2019-12-23T15:00:00+00:00",
        description:
          "<p><span>Home for the musically curious. Serving hand-picked, genre-free music 24/7.</span></p>",
        fullImage: {
          url:
            "https://media.demo.nypr.digital/i/300/300/l/80/1/ns_social-avatar.jpg",
          width: 300,
          caption: "New Sounds",
          type: "image/jpeg",
          height: 300
        },
        site_id: 15,
        start_ts: 1577113200.0,
        iso_end: "2019-12-23T21:00:00+00:00",
        listImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/1/ns_social-avatar.jpg",
          width: 60,
          caption: "New Sounds",
          type: "image/jpeg",
          height: 60
        },
        pk: 842041,
        show_url: "https://newsounds.demo2.wnyc.net/shows/new-sounds-radio",
        end: "2019-12-23T16:00:00-0500",
        title: "New Sounds Radio",
        url: "https://newsounds.demo2.wnyc.net/shows/new-sounds-radio",
        end_ts: 1577134800.0,
        schedule_ref: "ShowSchedule:1394",
        group_slug: "new-sounds-radio",
        detailImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/1/ns_social-avatar.jpg",
          width: 60,
          caption: "New Sounds",
          type: "image/jpeg",
          height: 60
        },
        start: "2019-12-23T10:00:00-0500"
      },
      future: [
        {
          start_time_ts: 1577124008.0,
          stream: "q2",
          playlist_entry_id: 2374225,
          start_time: "2019-12-23T13:00:08",
          playlist_page_url:
            "http://newsounds.demo2.wnyc.net/playlists/show/new-sounds-radio/2019/dec/23/",
          comments_url: "/api/list/comments/177/80910/",
          iso_start_time: "2019-12-23T18:00:08+00:00",
          catalog_entry: {
            reclabel: { url: "", name: "Ghostly International" },
            conductor: null,
            catno: "323",
            composer: {
              url: "/music/musicians/matthew-dear/",
              pk: 24756,
              slug: "matthew-dear",
              name: "Matthew Dear"
            },
            attribution: "",
            soloists: [],
            title: "Bunny\u0092s Dream",
            url: "http://wqxr.demo2.wnyc.net/music/recordings/64820/",
            additional_composers: [],
            audio_may_download: true,
            length: 430,
            pk: 64820,
            arkiv_link:
              "http://www.arkivmusic.com/classical/Playlist?source=WQXR&cat=323&id=153509&label=Ghostly+International",
            audio:
              "https://www.podtrac.com/pts/redirect.mp3/demo-audio.wnyc.org/_cms-qa-test/",
            ensemble: null,
            additional_ensembles: []
          }
        }
      ],
      has_playlists: true,
      expires_ts: 1577124344.0,
      slug: "q2"
    },
    "jonathan-channel": {
      name: "American Standards",
      current_playlist_item: null,
      expires: "2019-12-23T13:04:33",
      current_show: {
        iso_start: "2019-12-23T17:00:00+00:00",
        description:
          "<p>American Standards is an unparalleled showcase for this timeless music spanning the entire history of the songbook, from early Tin Pan Alley recordings to interpretations by contemporary artists. This is your home for enduring music by legendary composers and songwriters, bought to life by Ella Fitzgerald, Dianne Reeves, Frank Sinatra, C\u00e9cile McLorin Salvant, and many more. It\u2019s the sound of a diverse and dynamic America, with the songs and voices that have filled theaters and scored films for nearly a century.</p>",
        fullImage: {
          url:
            "https://media.demo.nypr.digital/i/300/300/l/80/2018/11/american_standards_red_square.png",
          width: 300,
          caption: "American Standards",
          type: "image/png",
          height: 300
        },
        site_id: 1,
        start_ts: 1577120400.0,
        iso_end: "2019-12-23T21:00:00+00:00",
        listImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/2018/11/american_standards_red_square.png",
          width: 60,
          caption: "American Standards",
          type: "image/png",
          height: 60
        },
        pk: 436,
        show_url: "https://wnyc.demo2.wnyc.net/shows/new-standards",
        end: "2019-12-23T16:00:00-0500",
        title: "New Standards",
        url: "https://wnyc.demo2.wnyc.net/shows/new-standards",
        end_ts: 1577134800.0,
        schedule_ref: "ShowSchedule:904",
        group_slug: "new-standards",
        detailImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/2018/11/american_standards_red_square.png",
          width: 60,
          caption: "American Standards",
          type: "image/png",
          height: 60
        },
        start: "2019-12-23T12:00:00-0500"
      },
      future: [
        {
          start_time_ts: 1577134929.0,
          stream: "jonathan-channel",
          playlist_entry_id: 2374179,
          start_time: "2019-12-23T16:02:09",
          playlist_page_url:
            "http://wnyc.demo2.wnyc.net/playlists/show/new-standards/2019/dec/23/",
          comments_url: "/api/list/comments/177/80913/",
          iso_start_time: "2019-12-23T21:02:09+00:00",
          catalog_entry: {
            reclabel: { url: "", name: "Reprise" },
            conductor: null,
            catno: "10142",
            composer: {
              url: "/music/musicians/richard-rodgers/",
              pk: 3789,
              slug: "richard-rodgers",
              name: "Richard Rodgers"
            },
            attribution: "",
            soloists: [
              {
                instruments: [],
                musician: {
                  url: "/music/musicians/frank-sinatra/",
                  pk: 10385,
                  slug: "frank-sinatra",
                  name: "Frank Sinatra"
                },
                role: ""
              }
            ],
            title: "Hello Young Lovers",
            url: "http://wqxr.demo2.wnyc.net/music/recordings/35219/",
            additional_composers: [
              {
                url: "/music/musicians/oscar-hammerstein/",
                pk: 17015,
                slug: "oscar-hammerstein",
                name: "Oscar Hammerstein"
              },
              {
                url: "/music/musicians/oscar-hammerstein-ii/",
                pk: 4568,
                slug: "oscar-hammerstein-ii",
                name: "Oscar Hammerstein II"
              },
              { url: "/music/musicians/sr/", pk: 23585, slug: "sr", name: "SR" }
            ],
            audio_may_download: true,
            length: 223,
            pk: 35219,
            arkiv_link:
              "http://www.arkivmusic.com/classical/Playlist?source=WQXR&cat=10142&id=968754&label=Reprise",
            audio:
              "https://www.podtrac.com/pts/redirect.mp3/demo-audio.wnyc.org/_cms-qa-test/",
            ensemble: {
              url: "/music/ensembles/gordon-jenkins/",
              pk: 5109,
              slug: "gordon-jenkins",
              name: "Gordon Jenkins"
            },
            additional_ensembles: []
          }
        }
      ],
      has_playlists: true,
      expires_ts: 1577124273.0,
      slug: "jonathan-channel"
    },
    njpr: {
      name: "NJPR",
      current_playlist_item: null,
      expires: "2019-12-23T13:04:33",
      current_show: {
        iso_start: "2019-12-23T17:00:00+00:00",
        description:
          "<p><span>ALL OF IT with Alison Stewart is a live daily conversation about culture and the culture in and around New York City.</span></p>",
        fullImage: {
          url:
            "https://media.demo.nypr.digital/i/300/300/l/80/2018/09/All_Of_It_NoWNYC_NoName.png",
          width: 300,
          caption: "",
          type: "image/png",
          height: 300
        },
        site_id: 1,
        start_ts: 1577120400.0,
        iso_end: "2019-12-23T19:00:00+00:00",
        listImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/2018/09/All_Of_It_NoWNYC_NoName.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        pk: 882225,
        show_url: "https://wnyc.demo2.wnyc.net/shows/all-of-it",
        end: "2019-12-23T14:00:00-0500",
        title: "All of It",
        url: "https://wnyc.demo2.wnyc.net/shows/all-of-it",
        end_ts: 1577127600.0,
        schedule_ref: "ShowSchedule:1398",
        group_slug: "all-of-it",
        detailImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/2018/09/All_Of_It_NoWNYC_NoName.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        start: "2019-12-23T12:00:00-0500"
      },
      future: [],
      has_playlists: false,
      expires_ts: 1577124273.0,
      slug: "njpr"
    },
    "wnyc-am820": {
      name: "WNYC AM 820",
      current_playlist_item: null,
      expires: "2019-12-23T13:04:33",
      current_show: {
        iso_start: "2019-12-23T17:00:00+00:00",
        description:
          "<p><span>ALL OF IT with Alison Stewart is a live daily conversation about culture and the culture in and around New York City.</span></p>",
        fullImage: {
          url:
            "https://media.demo.nypr.digital/i/300/300/l/80/2018/09/All_Of_It_NoWNYC_NoName.png",
          width: 300,
          caption: "",
          type: "image/png",
          height: 300
        },
        site_id: 1,
        start_ts: 1577120400.0,
        iso_end: "2019-12-23T19:00:00+00:00",
        listImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/2018/09/All_Of_It_NoWNYC_NoName.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        pk: 882225,
        show_url: "https://wnyc.demo2.wnyc.net/shows/all-of-it",
        end: "2019-12-23T14:00:00-0500",
        title: "All of It",
        url: "https://wnyc.demo2.wnyc.net/shows/all-of-it",
        end_ts: 1577127600.0,
        schedule_ref: "ShowSchedule:1398",
        group_slug: "all-of-it",
        detailImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/2018/09/All_Of_It_NoWNYC_NoName.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        start: "2019-12-23T12:00:00-0500"
      },
      future: [],
      has_playlists: false,
      expires_ts: 1577124273.0,
      slug: "wnyc-am820"
    },
    "special-events-stream": {
      name: "Special Programming 1",
      current_playlist_item: null,
      expires: "2019-12-23T13:04:33",
      current_show: {
        iso_start: "2019-12-23T17:00:00+00:00",
        description:
          "<p>Enjoy holiday favorites from the Songbook and beyond all season long.</p>",
        fullImage: {
          url:
            "https://media.demo.nypr.digital/i/300/300/l/80/1/holiday_standards.png",
          width: 300,
          caption: "",
          type: "image/png",
          height: 300
        },
        site_id: 1,
        start_ts: 1577120400.0,
        iso_end: "2019-12-23T23:00:00+00:00",
        listImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/1/holiday_standards.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        pk: 818984,
        show_url: "https://wnyc.demo2.wnyc.net/shows/holiday-standards",
        end: "2019-12-23T18:00:00-0500",
        title: "Holiday Standards",
        url: "https://wnyc.demo2.wnyc.net/shows/holiday-standards",
        end_ts: 1577142000.0,
        schedule_ref: "ShowSchedule:1254",
        group_slug: "holiday-standards",
        detailImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/1/holiday_standards.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        start: "2019-12-23T12:00:00-0500"
      },
      future: [],
      has_playlists: false,
      expires_ts: 1577124273.0,
      slug: "special-events-stream"
    },
    wqxr: {
      name: "WQXR 105.9 FM",
      current_playlist_item: {
        start_time_ts: 1577124116.0,
        stream: "wqxr",
        playlist_entry_id: 2374227,
        start_time: "2019-12-23T13:01:56",
        playlist_page_url:
          "http://wqxr.demo2.wnyc.net/playlists/show/annie-bergen/2019/dec/23/",
        comments_url: "/api/list/comments/177/80911/",
        iso_start_time: "2019-12-23T18:01:56.866000+00:00",
        catalog_entry: {
          reclabel: { url: "", name: "RCA" },
          conductor: null,
          catno: "787510",
          composer: {
            url: "/music/musicians/ludwig-van-beethoven/",
            pk: 201,
            slug: "ludwig-van-beethoven",
            name: "Ludwig van Beethoven"
          },
          attribution: "",
          soloists: [
            {
              instruments: ["piano"],
              musician: {
                url: "/music/musicians/rudolf-buchbinder/",
                pk: 3041,
                slug: "rudolf-buchbinder",
                name: "Rudolf Buchbinder"
              },
              role: ""
            }
          ],
          title:
            'Piano Sonata No. 13 in E-Flat Major, Op. 27, No. 1 "Sonata quasi una fantasia"',
          url: "http://wqxr.demo2.wnyc.net/music/recordings/24654/",
          additional_composers: [],
          audio_may_download: true,
          length: 858,
          pk: 24654,
          arkiv_link:
            "http://www.arkivmusic.com/classical/Playlist?source=WQXR&cat=787510&id=129239&label=RCA",
          audio:
            "https://www.podtrac.com/pts/redirect.mp3/demo-audio.wnyc.org/_cms-qa-test/",
          ensemble: null,
          additional_ensembles: []
        }
      },
      expires: "2019-12-23T13:11:23",
      current_show: {
        iso_start: "2019-12-23T15:00:00+00:00",
        description: "<p>Annie Bergen is the midday host on WQXR.</p>",
        fullImage: {
          url:
            "https://media.demo.nypr.digital/i/300/300/l/80/1/AnnieBergen_WQXR_ShowPageSquares.png",
          width: 300,
          caption: "",
          type: "image/png",
          height: 300
        },
        site_id: 2,
        start_ts: 1577113200.0,
        iso_end: "2019-12-23T20:00:00+00:00",
        listImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/1/AnnieBergen_WQXR_ShowPageSquares.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        pk: 103285,
        show_url: "https://wqxr.demo2.wnyc.net/shows/annie-bergen",
        end: "2019-12-23T15:00:00-0500",
        title: "Middays with Annie Bergen",
        url: "https://wqxr.demo2.wnyc.net/shows/annie-bergen",
        end_ts: 1577131200.0,
        schedule_ref: "ShowSchedule:1132",
        group_slug: "annie-bergen",
        detailImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/1/AnnieBergen_WQXR_ShowPageSquares.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        start: "2019-12-23T10:00:00-0500"
      },
      future: [],
      has_playlists: true,
      expires_ts: 1577124683.0,
      slug: "wqxr"
    },
    "wqxr-special2": {
      name: "Holiday Channel",
      current_playlist_item: {
        start_time_ts: 1577124215.0,
        stream: "wqxr-special2",
        playlist_entry_id: 2374226,
        start_time: "2019-12-23T13:03:35",
        playlist_page_url:
          "http://wqxr.demo2.wnyc.net/playlists/show/wqxr-holiday-channel/2019/dec/23/",
        comments_url: "/api/list/comments/177/80915/",
        iso_start_time: "2019-12-23T18:03:35+00:00",
        catalog_entry: {
          reclabel: { url: "", name: "RCA" },
          conductor: null,
          catno: "5625",
          composer: {
            url: "/music/musicians/jerry-herman/",
            pk: 6634,
            slug: "jerry-herman",
            name: "Jerry Herman"
          },
          attribution: "",
          soloists: [],
          title: "We Need A Little Christmas",
          url: "http://wqxr.demo2.wnyc.net/music/recordings/11760/",
          additional_composers: [
            {
              url: "/music/musicians/mitch-farber/",
              pk: 6632,
              slug: "mitch-farber",
              name: "Mitch Farber"
            }
          ],
          audio_may_download: true,
          length: 276,
          pk: 11760,
          arkiv_link:
            "http://www.arkivmusic.com/classical/Playlist?source=WQXR&cat=5625&id=112159&label=RCA",
          audio:
            "https://www.podtrac.com/pts/redirect.mp3/demo-audio.wnyc.org/_cms-qa-test/",
          ensemble: {
            url: "/music/ensembles/the-hampton-string-quartet/",
            pk: 1279,
            slug: "the-hampton-string-quartet",
            name: "The Hampton String Quartet"
          },
          additional_ensembles: []
        }
      },
      expires: "2019-12-23T13:08:21",
      current_show: {
        iso_start: "2019-12-23T17:00:00+00:00",
        description:
          "<p>WQXR welcomes the 2019 holiday season with a 24-hour stream dedicated to classical\u00a0Christmas and wintertime favorites.\u00a0</p>",
        fullImage: {
          url:
            "https://media.demo.nypr.digital/i/300/300/l/80/1/WQXR_HolidayChannel.png",
          width: 300,
          caption: "",
          type: "image/png",
          height: 300
        },
        site_id: 2,
        start_ts: 1577120400.0,
        iso_end: "2019-12-23T23:00:00+00:00",
        listImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/1/WQXR_HolidayChannel.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        pk: 899627,
        show_url: "https://wqxr.demo2.wnyc.net/shows/wqxr-holiday-channel",
        end: "2019-12-23T18:00:00-0500",
        title: "WQXR Holiday Channel",
        url: "https://wqxr.demo2.wnyc.net/shows/wqxr-holiday-channel",
        end_ts: 1577142000.0,
        schedule_ref: "ShowSchedule:1410",
        group_slug: "wqxr-holiday-channel",
        detailImage: {
          url:
            "https://media.demo.nypr.digital/i/60/60/l/80/1/WQXR_HolidayChannel.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        start: "2019-12-23T12:00:00-0500"
      },
      future: [
        {
          start_time_ts: 1577124501.0,
          stream: "wqxr-special2",
          playlist_entry_id: 2374229,
          start_time: "2019-12-23T13:08:21",
          playlist_page_url:
            "http://wqxr.demo2.wnyc.net/playlists/show/wqxr-holiday-channel/2019/dec/23/",
          comments_url: "/api/list/comments/177/80915/",
          iso_start_time: "2019-12-23T18:08:21+00:00",
          catalog_entry: {
            reclabel: { url: "", name: "Decca" },
            conductor: {
              url: "/music/musicians/stephen-cleobury/",
              pk: 713,
              slug: "stephen-cleobury",
              name: "Stephen Cleobury"
            },
            catno: "4779095",
            composer: {
              url: "/music/musicians/felix-mendelssohn/",
              pk: 1699,
              slug: "felix-mendelssohn",
              name: "Felix Mendelssohn"
            },
            attribution: "",
            soloists: [
              {
                instruments: ["organ"],
                musician: {
                  url: "/music/musicians/david-briggs/",
                  pk: 22083,
                  slug: "david-briggs",
                  name: "David Briggs"
                },
                role: ""
              }
            ],
            title: "Hark the Herald Angels Sing",
            url: "http://wqxr.demo2.wnyc.net/music/recordings/55561/",
            additional_composers: [
              {
                url: "/music/musicians/p-ledger/",
                pk: 22171,
                slug: "p-ledger",
                name: "P. Ledger"
              }
            ],
            audio_may_download: true,
            length: 182,
            pk: 55561,
            arkiv_link:
              "http://www.arkivmusic.com/classical/Playlist?source=WQXR&cat=4779095&id=146876&label=Decca",
            audio:
              "https://www.podtrac.com/pts/redirect.mp3/demo-audio.wnyc.org/_cms-qa-test/",
            ensemble: {
              url: "/music/ensembles/choir-kings-college-cambridge/",
              pk: 1800,
              slug: "choir-kings-college-cambridge",
              name: "Choir of King's College, Cambridge"
            },
            additional_ensembles: []
          }
        }
      ],
      has_playlists: true,
      expires_ts: 1577124501.0,
      slug: "wqxr-special2"
    },
    "wqxr-special": {
      name: "Operavore",
      current_playlist_item: {
        start_time_ts: 1577124135.0,
        stream: "wqxr-special",
        playlist_entry_id: 2374223,
        start_time: "2019-12-23T13:02:15",
        playlist_page_url:
          "http://wqxr.demo2.wnyc.net/playlists/show/operavorestream/2019/dec/23/",
        comments_url: "/api/list/comments/177/80914/",
        iso_start_time: "2019-12-23T18:02:15+00:00",
        catalog_entry: {
          reclabel: { url: "", name: "EMI" },
          conductor: {
            url: "/music/musicians/tullio-serafin/",
            pk: 3826,
            slug: "tullio-serafin",
            name: "Tullio Serafin"
          },
          catno: "56287",
          composer: {
            url: "/music/musicians/ruggiero-leoncavallo/",
            pk: 6176,
            slug: "ruggiero-leoncavallo",
            name: "Ruggiero Leoncavallo"
          },
          attribution: "",
          soloists: [
            {
              instruments: ["baritone"],
              musician: {
                url: "/music/musicians/tito-gobbi/",
                pk: 9425,
                slug: "tito-gobbi",
                name: "Tito Gobbi"
              },
              role: ""
            }
          ],
          title: "Pagliacci: Prologue",
          url: "http://wqxr.demo2.wnyc.net/music/recordings/22169/",
          additional_composers: [],
          audio_may_download: true,
          length: 464,
          pk: 22169,
          arkiv_link:
            "http://www.arkivmusic.com/classical/Playlist?source=WQXR&cat=56287&id=126185&label=EMI",
          audio:
            "https://www.podtrac.com/pts/redirect.mp3/demo-audio.wnyc.org/_cms-qa-test/",
          ensemble: {
            url: "/music/ensembles/orchestra-del-teatro-alla-scala-di-milano/",
            pk: 2397,
            slug: "orchestra-del-teatro-alla-scala-di-milano",
            name: "Orchestra del Teatro alla Scala di Milano"
          },
          additional_ensembles: []
        }
      },
      expires: "2019-12-23T13:10:09",
      current_show: {
        iso_start: "2019-12-23T17:00:00+00:00",
        description:
          "<p>WQXR's 24-hour stream dedicated to opera. Enjoy this continuous, carefully programmed mix of opera arias, duets, scenes choruses and instrumental numbers. The Operavore stream is updated with a different program each day.</p>",
        fullImage: {
          url:
            "https://media.demo.nypr.digital/i/300/300/c/80/1/operavore_2.png",
          width: 300,
          caption: "",
          type: "image/png",
          height: 300
        },
        site_id: 2,
        start_ts: 1577120400.0,
        iso_end: "2019-12-23T23:00:00+00:00",
        listImage: {
          url: "https://media.demo.nypr.digital/i/60/60/c/80/1/operavore_2.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        pk: 177251,
        show_url: "https://wqxr.demo2.wnyc.net/shows/operavorestream",
        end: "2019-12-23T18:00:00-0500",
        title: "Operavore",
        url: "https://wqxr.demo2.wnyc.net/shows/operavorestream",
        end_ts: 1577142000.0,
        schedule_ref: "ShowSchedule:980",
        group_slug: "operavorestream",
        detailImage: {
          url: "https://media.demo.nypr.digital/i/60/60/c/80/1/operavore_2.png",
          width: 60,
          caption: "",
          type: "image/png",
          height: 60
        },
        start: "2019-12-23T12:00:00-0500"
      },
      future: [
        {
          start_time_ts: 1577124645.0,
          stream: "wqxr-special",
          playlist_entry_id: 2374228,
          start_time: "2019-12-23T13:10:45",
          playlist_page_url:
            "http://wqxr.demo2.wnyc.net/playlists/show/operavorestream/2019/dec/23/",
          comments_url: "/api/list/comments/177/80914/",
          iso_start_time: "2019-12-23T18:10:45+00:00",
          catalog_entry: {
            reclabel: { url: "", name: "Teldec" },
            conductor: {
              url: "/music/musicians/joseph-jennings/",
              pk: 4215,
              slug: "joseph-jennings",
              name: "Joseph Jennings"
            },
            catno: "85555",
            composer: {
              url: "/music/musicians/traditional/",
              pk: 21,
              slug: "traditional",
              name: "Traditional"
            },
            attribution: "",
            soloists: [
              {
                instruments: ["soprano"],
                musician: {
                  url: "/music/musicians/dawn-upshaw/",
                  pk: 46,
                  slug: "dawn-upshaw",
                  name: "Dawn Upshaw"
                },
                role: ""
              }
            ],
            title: "The Truth From Above (Herefordshire Carol)",
            url: "http://wqxr.demo2.wnyc.net/music/recordings/11669/",
            additional_composers: [
              {
                url: "/music/musicians/ralph-vaughn-williams/",
                pk: 6670,
                slug: "ralph-vaughn-williams",
                name: "Ralph Vaughn Williams"
              }
            ],
            audio_may_download: true,
            length: 274,
            pk: 11669,
            arkiv_link:
              "http://www.arkivmusic.com/classical/Playlist?source=WQXR&cat=85555&id=112037&label=Teldec",
            audio:
              "https://www.podtrac.com/pts/redirect.mp3/demo-audio.wnyc.org/_cms-qa-test/",
            ensemble: {
              url: "/music/ensembles/chanticleer/",
              pk: 366,
              slug: "chanticleer",
              name: "Chanticleer"
            },
            additional_ensembles: []
          }
        }
      ],
      has_playlists: true,
      expires_ts: 1577124609.0,
      slug: "wqxr-special"
    }
  });
  this.get("/api/v1/whats_on/:slug", whatsOnResponse());
  this.get("/api/v1/whats_on/:slug/:count/", {
    has_playlists: true,
    future: [],
    current_show: {
      iso_start: "2019-12-23T15:00:00+00:00",
      description: "<p>Annie Bergen is the midday host on WQXR.</p>",
      fullImage: {
        url:
          "https://media.demo.nypr.digital/i/300/300/l/80/1/AnnieBergen_WQXR_ShowPageSquares.png",
        width: 300,
        caption: "",
        type: "image/png",
        height: 300
      },
      site_id: 2,
      start_ts: 1577113200.0,
      iso_end: "2019-12-23T20:00:00+00:00",
      listImage: {
        url:
          "https://media.demo.nypr.digital/i/60/60/l/80/1/AnnieBergen_WQXR_ShowPageSquares.png",
        width: 60,
        caption: "",
        type: "image/png",
        height: 60
      },
      pk: 103285,
      show_url: "https://wqxr.demo2.wnyc.net/shows/annie-bergen",
      end: "2019-12-23T15:00:00-0500",
      title: "Middays with Annie Bergen",
      url: "https://wqxr.demo2.wnyc.net/shows/annie-bergen",
      end_ts: 1577131200.0,
      schedule_ref: "ShowSchedule:1132",
      group_slug: "annie-bergen",
      detailImage: {
        url:
          "https://media.demo.nypr.digital/i/60/60/l/80/1/AnnieBergen_WQXR_ShowPageSquares.png",
        width: 60,
        caption: "",
        type: "image/png",
        height: 60
      },
      start: "2019-12-23T10:00:00-0500"
    },
    expires: "2019-12-23T13:16:25",
    current_playlist_item: {
      start_time_ts: 1577124116.0,
      stream: "wqxr",
      playlist_entry_id: 2374227,
      start_time: "2019-12-23T13:01:56",
      playlist_page_url:
        "http://wqxr.demo2.wnyc.net/playlists/show/annie-bergen/2019/dec/23/",
      comments_url: "/api/list/comments/177/80911/",
      iso_start_time: "2019-12-23T18:01:56.866000+00:00",
      catalog_entry: {
        reclabel: { url: "", name: "RCA" },
        conductor: null,
        catno: "787510",
        composer: {
          url: "/music/musicians/ludwig-van-beethoven/",
          pk: 201,
          slug: "ludwig-van-beethoven",
          name: "Ludwig van Beethoven"
        },
        attribution: "",
        soloists: [
          {
            instruments: ["piano"],
            musician: {
              url: "/music/musicians/rudolf-buchbinder/",
              pk: 3041,
              slug: "rudolf-buchbinder",
              name: "Rudolf Buchbinder"
            },
            role: ""
          }
        ],
        title:
          'Piano Sonata No. 13 in E-Flat Major, Op. 27, No. 1 "Sonata quasi una fantasia"',
        url: "http://wqxr.demo2.wnyc.net/music/recordings/24654/",
        additional_composers: [],
        audio_may_download: true,
        length: 858,
        pk: 24654,
        arkiv_link:
          "http://www.arkivmusic.com/classical/Playlist?source=WQXR&cat=787510&id=129239&label=RCA",
        audio:
          "https://www.podtrac.com/pts/redirect.mp3/demo-audio.wnyc.org/_cms-qa-test/",
        ensemble: null,
        additional_ensembles: []
      }
    }
  });
  this.get("/api/v1/playlist-daily/:slug/:year/:month/:day", playlistDailyResponse())
  this.get("/api/v3/shows/:slug", annieBergenResponse());
  this.get(`/whats-on/v1/whats-on`, asRest(womsSocketResponse()));

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.4.x/shorthands/
  */
}
