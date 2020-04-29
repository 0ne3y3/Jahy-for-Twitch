# Jahy for Twitch (but not only Jahy)

"Jahy for twitch" is cute Live2D character reacting to streamlabs alert and but also twitch chat. When you receive an alert, a proper animation is triggered with a customable text. When someone type something in chat, it will trigger an animation too !
Coded in html/css/raw javascript (ES6), you can display this cute character in your OBS scenes for your stream.
Nearly every alerts are handled :
- Follow
- Subscription
- Resubscription
- Raid
- Host
- Donation
- Subgift
- All bits stages :
  * 1 bit
  * 100 bits
  * 1000 bits
  * 5000 bits
  * 10000 bits

Spread Jahy over twitch !!

### Image and other waifu

With the configuration page, you can replace Jahy with any character you want. Also It doesn't have to be an animation/video, it work with images, gifs and apng too !
The wiki page will explain to you all the customable options to setup your own character.

### Blank filler

If there is no alert since a long time (every X minutes), it play a random animation. To add some variations to the looping video.

### Twitch chat

Your character can react to what people say ! Some keyword you define will trigger an animation.
It also come with small function (greeting new people in chat) and mini games (dice & 8ball). All of this is configurable in the configuration page.

## Exemples

Video/Animation exemple :  
![Jahy Demo](demo/jahy-demo.gif)

Image exemple :  
![Saki Demo](demo/saki-demo.gif)

# Getting Started

### Prerequisites

```
- OBS / streamlabs-OBS / (maybe work with XSplit, not tested)
- Your Streamlabs websocket token
- (optional) Your twitch bot account and it's Oauth token
```

### Installing

* Open the page "config.html" with your favorite browser
* Click on "Tutorial & Wiki" button, and follow the tutorial in it for streamlabs and Twitch chat

## Built With

* [streamlabs-socket-client](https://github.com/tehkhop/streamlabs-socket-client) - The websocket client used to connect to streamlabs
* [GSAP TweenMax](https://greensock.com/gsap) - Framework for easy text and bubble speech animation
* [TMI.js](https://github.com/tmijs/tmi.js) - The websocket client used to connect to twitch chat


## Authors

Project created by 0ne3y3.
[My twitter](https://twitter.com/OneEYE_Lucas)

Big thank to my friend Alzcats, the artist who draw the character :
[His twitter](https://twitter.com/alzcats)
