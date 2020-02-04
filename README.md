# Jahy for Twitch

"Jahy for twitch" is cute L2D character reacting to streamlabs alert (only twitch event and streamlabs donation). When you receive an alert, a proper animation is triggered with a customable text.
Coded in html/css/raw javascript (ES6), you can display this cute character in your OBS scenes for your stream.
Nearly every alerts have an animation :
- Follow
- Subscription
- Resubscription
- Raid
- Host
- Donation
- All bits stages :
  * 1 bit
  * 100 bits
  * 1000 bits
  * 5000 bits
  * 10000 bits

Spread Jahy over twitch !!

Showcase video coming soon...

# Getting Started

### Prerequisites

```
- OBS / streamlabs-OBS
- Your Streamlabs websocket token
```

### Installing

* Open the page "config.html" with your favorite browser (only tested on Chrome tho...).
* Follow the small tutorial in it.

## Built With

* [streamlabs-socket-client](https://github.com/tehkhop/streamlabs-socket-client) - The websocket client used to connect to streamlabs
* [GSAP TweenMax](https://greensock.com/gsap) - Framework for easy text and bubble speech animation

## TO DO

* Handle subgift and sub bomb streamlabs event
* Redoing the configuration page properly
* Handle image, so people can use the script but with just image and not a whole animation
* Create a new websocket connection to twitch chat. Jahy will be able to react to what people say ! Some keyword will trigger an animation + text !
* Create some animations when nothing happen in a long time (no alerts since 15min/20min/etc...)

## Authors

Project created by 0ne3y3.
[My twitter](https://twitter.com/OneEYE_Lucas)

Big thank to my friend Alzcats, the artist who draw the character :
[His twitter](https://twitter.com/alzcats)
