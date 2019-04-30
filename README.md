# Jahy for Twitch

"Jahy for twitch" is cute L2D character reacting to streamlabs alert (only twitch event). When you receive an alert, a proper animation is triggered with a customable text.
Coded in html/css/raw javascript (ES6), you can display this cute character in your OBS scenes for your stream.
Nearly every alerts have an animation :
- Follow
- Subscription
- Resubscription (same animation as sub but text is different)
- Subscription gift
- Raid
- Host
- All bits stages :
  * 1 bit
  * 100 bits
  * 1000 bits
  * 5000 bits
  * 10000 bits

Spread the Jahy over twitch !!

[YOUTUBE VIDEO FOR SHOWCASE](https://www.youtube.com/watch?v=oSoMZu6xb1I)

# Getting Started

### Prerequisites

```
- OBS
- Your Streamlabs token (see "Installing section" to get it)
```

### Installing

1) Find your streamlabs socket API token in your streamlabs dashboard.
  * Connect to streamlabs with Twitch account: [Streamlabs website](https://streamlabs.com/dashboard#/)
  * Then go to settings -> API settings -> API tokens -> "Your socket API token"
  * Copy the entire token (button "copy" on the right)

[Screenshot](https://imgur.com/aaD2zrv)


2) Paste it into the "config.js" between the two ' '.

[Screenshot](https://imgur.com/YTx6Axi)


3) In your OBS scene, add a new source (sorry it's in french, should be "browser source").

[Screenshot](https://imgur.com/GeQS8IC)


4) Put thoses settings :
  * Local file : true
  * Local file : select index.html in the Jahy directory ([Screenshot](https://imgur.com/MoKxVGC))
  * Width : 1250
  * Height : 756
  * FPS : 30
  * Custom CSS : leave it blank
  * Shutdown source when not visible : as you wish
  * Refresh browser when scene becomes active : false

[Screenshot](https://imgur.com/yGsKKYW)


5) Resize and place whatever you want the Jahy in your scene.

[Screenshot](https://imgur.com/OIcPdR4)


6) Enjoy !


## Built With

* [streamlabs-socket-client](https://github.com/tehkhop/streamlabs-socket-client) - The websocket client used
* [GSAP TweenMax](https://greensock.com/gsap) - Framework for easy text and bubble speech animation

## Authors

Project created by 0ne3y3.

[My twitter](https://twitter.com/OneEYE_Lucas)

[I stream some of my work](https://www.twitch.tv/0ne3y3)

Big thank to my friend Alzcats, the artist who draw the character :

[His twitter](https://twitter.com/alzcats)

[His Twitch](https://www.twitch.tv/alzcats)

## Acknowledgments

Special thanks to my friends streamers testing the project :
- RecklessKun
- BuzzCity23
- Craiguu
