<template>
    <div class="flex flex-row overflow-x-scroll space-x-10 w-4/5 mx-auto">
        <div v-for="sotd in LegacySOTDs" class="space-y-5">
            <SOTD :sotd :key="sotd.id" />
        </div>
    </div>
</template>

<script setup>
const LegacySOTDs = [
    {
        "id": 20,
        "created_at": "2024-05-22T13:27:56.244184+00:00",
        "name": "Fight!",
        "description": "A happy go lucky song about the joys of youth :)",
        "album": "Fight! EP",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e029b314877ae305c99c41e361c",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/158b8a769af2bd43a602c54632f0a6579acd9fa1?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["Death By Unga Bunga"]
    },
    {
        "id": 19,
        "created_at": "2023-11-01T16:44:48.467112+00:00",
        "name": "yo confidence",
        "description": "I really like the monologue, motivational nd whatnot",
        "album": "COLORWAY",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e02c5626e40ff7ec9f2a9405bf3",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/f14dbd284b81698cc82784857e280bf9ef146515?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["DESTIN CONRAD"]
    },
    {
        "id": 18,
        "created_at": "2023-09-24T06:41:31.426693+00:00",
        "name": "SCIENTISTS & ENGINEERS [Feat. Future, Eryn Allen Kane]",
        "description": "I adore a good choir section.",
        "album": "SCIENTISTS & ENGINEERS [Feat. Future, Eryn Allen Kane]",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e02013f3ec69272a4706ed18f33",
            "width": 300,
            "height": 300
        },
        "preview_url": null,
        "artists": ["Killer Mike", "André 3000", "Eryn Allen Kane", "Future"]
    },
    {
        "id": 17,
        "created_at": "2023-09-16T03:27:13.230913+00:00",
        "name": "Michelin Star",
        "description": "The little choir run throughout the second half is juicy",
        "album": "The Patience",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e024f777199430e3016868b8503",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/ce0a8f4883fd108caf33038389224794c6dffc52?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["Mick Jenkins"]
    },
    {
        "id": 15,
        "created_at": "2023-08-15T20:03:38.036413+00:00",
        "name": "REBOUND!",
        "description": "LATELY I PRAY FOR MYSELF!!",
        "album": "LP!",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e026e57be9031cc8bc46fb17fee",
            "width": 300,
            "height": 300
        },
        "preview_url": null,
        "artists": ["JPEGMAFIA"]
    },
    {
        "id": 14,
        "created_at": "2023-07-23T20:06:52.428296+00:00",
        "name": "Lo Rain [Feat. Mwanjé]",
        "description": "tear inducing, also the harmony, also their voice?? cmon now",
        "album": "As Above, So Below",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e02d930107fe86016c9e9a7b19d",
            "width": 300,
            "height": 300
        },
        "preview_url": null,
        "artists": ["Sampa the Great", "Mwanje"]
    },
    {
        "id": 13,
        "created_at": "2023-07-05T20:33:16.751315+00:00",
        "name": "serious - Parlor Performance Live Version",
        "description": "Stripped down and gorgeous. Then he picked it up right when I needed it, bless",
        "album": "Flozigg's Parlor Performance by Sundae Sauuce",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e02376f940bb49a997ef1e97c99",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/d4788239318b4c40e1d2dda10f3a802c05d63782?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["Flozigg"]
    },
    {
        "id": 12,
        "created_at": "2023-06-27T04:23:42.756773+00:00",
        "name": "Liz",
        "description": "idk liz but Remi had me screamin her name",
        "album": "Liz",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e02f6386052742c587f52b3f005",
            "width": 300,
            "height": 300
        },
        "preview_url": null,
        "artists": ["Remi Wolf"]
    },
    {
        "id": 11,
        "created_at": "2023-06-14T01:50:34.746113+00:00",
        "name": "My Song",
        "description": "New chapter type beat",
        "album": "Crying, Laughing, Loving, Lying",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e0228637947b8270a3a078cd718",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/1874ae54e53583662f62e6a2285e299a2d853fee?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["Labi Siffre"]
    },
    {
        "id": 10,
        "created_at": "2023-06-09T01:57:31.952866+00:00",
        "name": "Who Told You (feat. Drake)",
        "description": "I love that Drake loves afrobeat",
        "album": "Who Told You (feat. Drake)",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e02f6aca6a7d4132d9b2d15e0f0",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/cafc6df66cc354e3ba29d488c23d12e2ee9fc6bc?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["J Hus", "Drake"]
    },
    {
        "id": 9,
        "created_at": "2023-06-08T16:04:21.413541+00:00",
        "name": "Livin in Hell",
        "description": ".",
        "album": "Livin in Hell",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e02f52a8329ee344c5ddd076de1",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/5c70ca369dff209b29d707c9eb3a660c4eeff683?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["Your Grandparents"]
    },
    {
        "id": 8,
        "created_at": "2023-06-07T03:29:39.918057+00:00",
        "name": "Happy September",
        "description": "Somber shit, played with the beat, following the ups and downs was cool",
        "album": "Free Samples, Vol 1.",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e026cd513f57cf4f3010f6c6350",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/a3497b94dc0484cbf28287b2d26cc8557e7e478d?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["femdot."]
    },
    {
        "id": 7,
        "created_at": "2023-06-03T21:35:04.379963+00:00",
        "name": "Blessings (feat. Wizkid & Gimba)",
        "description": "Maaaaaaad bounce, I like the build up too. Adding refreshing bits of instrumentation and each feature cuts through nicely. I'm mad this is something I'd usually skip",
        "album": "Blessings (feat. Wizkid & Gimba)",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e02f40b5cbcf8a155fb9b118dab",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/4a6f298fd8fd5f40dccf8cbd04e15d251ae08319?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["DJ Tunez", "Wizkid", "Gimba"]
    },
    {
        "id": 6,
        "created_at": "2023-05-31T01:20:38.591632+00:00",
        "name": "Master P",
        "description": "Choir background vocals + drums I feel in my soul + really good performance from Big Sean and consistent juice from Kaytramine = fye",
        "album": "KAYTRAMINÉ",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e02e03eaf32f32c1e1e80e6c6e2",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/e538aeb9787859f55a949b88dca2ab2dfe3c24b1?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["KAYTRAMINÉ", "Aminé", "KAYTRANADA", "Big Sean"]
    },
    {
        "id": 5,
        "created_at": "2023-05-25T15:30:44.462297+00:00",
        "name": "Enough",
        "description": "Can't be hittin em notes like that. I feel like Jay Elec might notta been the best feature but I love it regardless. He cuts through",
        "album": "Enough",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e025713e04bc17b0f9691f84fd7",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/a14acb74d06622e96f5c2e06a9551c4175b30648?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["Rory", "reggie", "Jay Electronica"]
    },
    {
        "id": 4,
        "created_at": "2023-05-25T00:34:49.188635+00:00",
        "name": "Technically",
        "description": "When he said \n\"Eeuuuuu- eeuuuuuuuu\"\nI felt that.",
        "album": "Technically",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e02a4bce211322a5c162ab05ce4",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/6a193b64392c90753df02e2b80f0c06f24c296ac?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["Teezo Touchdown"]
    },
    {
        "id": 3,
        "created_at": "2023-05-21T16:13:02.265322+00:00",
        "name": "Estate",
        "description": "angelic. let go, the waves beckon. golden locks of light slip through yhe palm trees.  if only for a second, i can be",
        "album": "Amoroso",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e020ca6c4876c97a9d4fea4c482",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/4824640e56cba9b40e0027c7a51277b4350e8af7?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["João Gilberto"]
    },
    {
        "id": 2,
        "created_at": "2023-05-18T04:59:28.731795+00:00",
        "name": "Kool Aid",
        "description": "\"I'm sweeter and you know it\"",
        "album": "Sis.",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e027387dc1f6a5db68647337433",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/e3041d37b54cb4c093d0f0b85c4993993e0a4360?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["KIRBY"]
    },
    {
        "id": 1,
        "created_at": "2023-05-15T06:37:39.243206+00:00",
        "name": "QUIET ON THE SET",
        "description": "Juicy",
        "album": "Ready When You Are",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e029aa7b8f01b605b504a4c0d0e",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/7e1268945e2a69d5d1717a5b55dc28cccad2aa51?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["Planet Giza"]
    },
    {
        "id": 0,
        "created_at": "2023-05-03T08:25:31+00:00",
        "name": "God Loves You",
        "description": "Truly a cinematic and audiotory masterpiece",
        "album": "SCARING THE HOES",
        "album_art": {
            "url": "https://i.scdn.co/image/ab67616d00001e028cf4c85912fdeb106707fb4c",
            "width": 300,
            "height": 300
        },
        "preview_url": "https://p.scdn.co/mp3-preview/2e6dd24bf46dee316072a8d21b4cae92609470dc?cid=f35376f78aab4190bf9fa940e5fe7d2b",
        "artists": ["JPEGMAFIA", "Danny Brown"]
    }
]

</script>