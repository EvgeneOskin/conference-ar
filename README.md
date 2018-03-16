# AR Conference

This project is an augmented reality single application page (AR SPA) for
bringing the Video Chat into reality.

# Features

The use case is a user calls to another user using an ID provided by your a callee.

At the moment the project works with one type of markers –
[Hiro](https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg).

# Technologies

We use React with [React Web AR](https://github.com/nitin42/React-Web-AR), and
[Aframe](http://aframe.io/) with [AR.js]().

For communication via WebRTC we use [PeerJS](http://peerjs.com/).

Only Chrome works well with this technology stack.
Firefox does not start a stream in PeerJS.

# Development

``` bash
$ yarn install # install dependencies
$ yarn start # run it un your machine
```

You don't need a webcam for development, you can use video or static image instead.
Search for `sourceUrl` key in `AFrameRenderer`'s `arToolKit` property.
