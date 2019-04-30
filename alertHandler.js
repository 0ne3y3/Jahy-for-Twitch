'use strict';
class Videos{
  constructor(){
    this.base = document.getElementById('baseStand');
    this.follow = document.getElementById('followStand');
    this.subscription = document.getElementById('subscriptionStand');
    this.resubscription = document.getElementById('subscriptionStand');
    this.donation = document.getElementById('donationStand');
    this.raid = document.getElementById('raidStand');
    this.bits1 = document.getElementById('bitsStand');
    this.bits100 = document.getElementById('bits100Stand');
    this.bits1000 = document.getElementById('bits1000Stand');
    this.bits5000 = document.getElementById('bits5000Stand');
    this.bits10000 = document.getElementById('bits10000Stand');
    this.subgift = document.getElementById('subgiftStand');
    this.host = document.getElementById('hostStand');
  }
}

class Bubbles{
  constructor(){
    this.text = document.getElementById('textBubble');
    this.normalBubble = document.getElementById('normalBubble');
    this.yellBubble = document.getElementById('yellBubble');
  }
}

class Follow{
  constructor(alert){
    this.type = 'follow';
    this.name = alert.name;
    this.alreadyDisplayed = false;
  }
}

class Subscription{
  constructor(alert){
    this.type = 'subscription';
    this.name = alert.name;
    this.amount = alert.months;
    this.alreadyDisplayed = false;
  }
}

class Subgift{
  constructor(alert){
    this.type = 'subgift';
    this.name = alert.name;
    this.alreadyDisplayed = false;
  }
}

class Donation{
  constructor(alert){
    this.type = 'donation';
    this.name = alert.from;
    this.currency = alert.currency;
    this.amount = Number(alert.amount);
    this.alreadyDisplayed = false;
  }
}

class Host{
  constructor(alert){
    this.type = 'host';
    this.name = alert.name;
    this.amount = Number(alert.viewers);
    this.alreadyDisplayed = false;
  }
}

class Bits{
  constructor(alert){
    this.type = 'bits';
    this.name = alert.name;
    this.amount = Number(alert.amount);
    this.alreadyDisplayed = false;
  }
}

class Raid{
  constructor(alert){
    this.type = 'raid';
    this.name = alert.name;
    this.amount = alert.raiders;
    this.alreadyDisplayed = false;
  }
}

class AlertHandler{
  constructor(){
    this.alerts = new Array();
  }

// #########################
// ##### FUNCTIONS #########
// #########################
  testIfAlert(){
    return this.alerts.find(alert => alert.alreadyDisplayed === false);
  }

  getVideosAndBubbles(){
    this.videos = new Videos();
    this.bubbles = new Bubbles();
  }

  splitText(div){
    let words = div.innerHTML.split(' ');
    div.innerHTML = '';
    for(let i=0; i < words.length; i++){
      let span = document.createElement('span');
      span.textContent = `${words[i]}`;
      div.appendChild(span);
    }
    return div.children;
  }

  changeAnimation(videoToPause, videoToPlay){
    videoToPause.pause();
    videoToPlay.removeAttribute('hidden');
    videoToPause.setAttribute('hidden', '');
    videoToPlay.play();
  }

  animatingText(bubble, bubbleTime, wordsTime, timeActive, words){
    new TimelineMax({
      onStart: ()=>{
        bubble.removeAttribute('hidden');
        this.bubbles.text.removeAttribute('hidden');
      },
      onComplete: ()=>{
          this.bubbles.text.setAttribute('hidden', '');
          this.bubbles.text.textContent = '';
          bubble.setAttribute('hidden', '');
          bubble.removeAttribute('style');
      }
    }).fromTo(bubble, bubbleTime, {opacity:0}, {opacity:1})
    .staggerFrom(words, wordsTime, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, wordsTime/words.length, "+=0")
    .to([bubble, words], 0.75, {opacity: 0}, timeActive);
  }

  afterAnimation(video){
    video.pause();
    video.currentTime = 0;
    if(this.testIfAlert()){
      video.setAttribute('hidden', '');
      this.alertTest();
    } else{
      this.videos.base.removeAttribute('hidden');
      video.setAttribute('hidden', '');
      this.videos.base.play().then(()=>{
        setTimeout(()=>{
          this.alertTest();
        }, config.intervalTime);
      });
    }
  }

  alertTest(){
    this.videos.base.pause();
    if((this.videos.base.currentTime > 0 && this.videos.base.currentTime < 1) || (this.videos.base.currentTime > 59 && this.videos.base.currentTime < 60)){
      this.videos.base.currentTime = 0;
    }
    const alert = this.testIfAlert();
    if(alert){
      alert.alreadyDisplayed = true;
      switch(alert.type){
        case 'follow':
          this.changeAnimation(this.videos.base, this.videos.follow);
          setTimeout(()=>{
            this.afterAnimation(this.videos.follow);
          }, this.videos.follow.duration*1000);
          if(config.displayBubble !== 'no'){
            this.bubbles.text.setAttribute('style', `font-size: ${config.messages.followFontSize}px;`);
            this.bubbles.text.textContent = config.messages.follow(alert.name);
            this.animatingText(this.bubbles.normalBubble, config.animations.followBubbleTime, config.animations.followTextTime, config.animations.followTimeActive, alertHandler.splitText(this.bubbles.text));
          }
          break;
        case 'subscription':
          if(alert.amount === 1){
            this.changeAnimation(this.videos.base, this.videos.subscription);
            setTimeout(()=>{
              this.afterAnimation(this.videos.subscription);
            }, this.videos.subscription.duration*1000);
            if(config.displayBubble !== 'no'){
              this.bubbles.text.setAttribute('style', `font-size: ${config.messages.subscriptionFontSize}px;`);
              this.bubbles.text.textContent = config.messages.subscription(alert.name);
              this.animatingText(this.bubbles.normalBubble, config.animations.subscriptionBubbleTime, config.animations.subscriptionTextTime, config.animations.subscriptionTimeActive, alertHandler.splitText(this.bubbles.text));
            }
            break;
          } else{
            this.changeAnimation(this.videos.base, this.videos.resubscription);
            setTimeout(()=>{
              this.afterAnimation(this.videos.resubscription);
            }, this.videos.resubscription.duration*1000);
            if(config.displayBubble !== 'no'){
              this.bubbles.text.setAttribute('style', `font-size: ${config.messages.resubscriptionFontSize}px;`);
              this.bubbles.text.textContent = config.messages.resubscription(alert.name, alert.amount);
              this.animatingText(this.bubbles.normalBubble, config.animations.resubscriptionBubbleTime, config.animations.resubscriptionTextTime, config.animations.resubscriptionTimeActive, alertHandler.splitText(this.bubbles.text));
            }
            break;
          }
        case 'host':
          this.changeAnimation(this.videos.base, this.videos.host);
          setTimeout(()=>{
            this.afterAnimation(this.videos.host);
          }, this.videos.host.duration*1000);
          if(config.displayBubble !== 'no'){
            this.bubbles.text.setAttribute('style', `font-size: ${config.messages.hostFontSize}px;`);
            this.bubbles.text.textContent = config.messages.host(alert.name, alert.amount);
            this.animatingText(this.bubbles.yellBubble, config.animations.hostBubbleTime, config.animations.hostTextTime, config.animations.hostTimeActive, alertHandler.splitText(this.bubbles.text));
          }
          break;
        case 'donation':
          this.changeAnimation(this.videos.base, this.videos.donation);
          setTimeout(()=>{
            this.afterAnimation(this.videos.donation);
          }, this.videos.donation.duration*1000);
          if(config.displayBubble !== 'no'){
            this.bubbles.text.setAttribute('style', `font-size: ${config.messages.donationFontSize}px;`);
            this.bubbles.text.textContent = config.messages.donation(alert.name, alert.amount, alert.currency);
            this.animatingText(this.bubbles.normalBubble, config.animations.donationBubbleTime, config.animations.donationTextTime, config.animations.donationTimeActive, alertHandler.splitText(this.bubbles.text));
          }
          break;
        case 'bits':
          let bitsBubbleTime, bitsTextTime, bitsTimeActive, videoBits;
          if(alert.amount < 100){
            videoBits = this.videos.bits1;
            this.bubbles.text.setAttribute('style', `font-size: ${config.messages.bits1FontSize}px;`);
            bitsBubbleTime = config.animations.bits1BubbleTime;
            bitsTextTime = config.animations.bits1TextTime;
            bitsTimeActive = config.animations.bits1TimeActive;
          } else if(alert.amount >= 100 && alert.amount < 1000){
            videoBits = this.videos.bits100;
            this.bubbles.text.setAttribute('style', `font-size: ${config.messages.bits100FontSize}px;`);
            bitsBubbleTime = config.animations.bits100BubbleTime;
            bitsTextTime = config.animations.bits100TextTime;
            bitsTimeActive = config.animations.bits100TimeActive;
          } else if(alert.amount >= 1000 && alert.amount < 5000){
            videoBits = this.videos.bits1000;
            this.bubbles.text.setAttribute('style', `font-size: ${config.messages.bits1000FontSize}px;`);
            bitsBubbleTime = config.animations.bits1000BubbleTime;
            bitsTextTime = config.animations.bits1000TextTime;
            bitsTimeActive = config.animations.bits1000TimeActive;
          } else if(alert.amount >= 5000 && alert.amount < 10000){
            videoBits = this.videos.bits5000;
            this.bubbles.text.setAttribute('style', `font-size: ${config.messages.bits5000FontSize}px;`);
            bitsBubbleTime = config.animations.bits5000BubbleTime;
            bitsTextTime = config.animations.bits5000TextTime;
            bitsTimeActive = config.animations.bits5000TimeActive;
          } else if(alert.amount >= 10000){
            videoBits = this.videos.bits10000;
            this.bubbles.text.setAttribute('style', `font-size: ${config.messages.bits10000FontSize}px;`);
            bitsBubbleTime = config.animations.bits10000BubbleTime;
            bitsTextTime = config.animations.bits10000TextTime;
            bitsTimeActive = config.animations.bits10000TimeActive;
          }
          this.changeAnimation(this.videos.base, videoBits);
          setTimeout(()=>{
            this.afterAnimation(videoBits);
          }, videoBits.duration*1000);
          if(config.displayBubble !== 'no'){
            this.bubbles.text.textContent = config.messages.bits(alert.name, alert.amount);
            this.animatingText(this.bubbles.normalBubble, bitsBubbleTime, bitsTextTime, bitsTimeActive, alertHandler.splitText(this.bubbles.text));
          }
          break;
        case 'raid':
          this.changeAnimation(this.videos.base, this.videos.raid);
          setTimeout(()=>{
            this.afterAnimation(this.videos.raid);
          }, this.videos.raid.duration*1000);
          if(config.displayBubble !== 'no'){
            this.bubbles.text.setAttribute('style', `font-size: ${config.messages.raidFontSize}px;`);
            this.bubbles.text.textContent = config.messages.raid(alert.name, alert.amount);
            this.animatingText(this.bubbles.yellBubble, config.animations.raidBubbleTime, config.animations.raidTextTime, config.animations.raidTimeActive, alertHandler.splitText(this.bubbles.text));
          }
          break;
        case 'subgift':
          this.changeAnimation(this.videos.base, this.videos.subgift);
          setTimeout(()=>{
            this.afterAnimation(this.videos.subgift);
          }, this.videos.subgift.duration*1000);
          if(config.displayBubble !== 'no'){
            this.bubbles.text.setAttribute('style', `font-size: ${config.messages.subgiftFontSize}px;`);
            this.bubbles.text.textContent = config.messages.subgift(alert.name);
            this.animatingText(this.bubbles.normalBubble, config.animations.subgiftBubbleTime, config.animations.subgiftTextTime, config.animations.subgiftTimeActive, alertHandler.splitText(this.bubbles.text));
          }
          break;
      }
    } else{
      this.videos.base.play().then(()=>{
        setTimeout(()=>{
          this.alertTest();
        }, config.intervalTime);
      });
    }
  }

// #########################
// ##### SET FUNCTIONS #####
// #########################
  setFollow(alerts){
    for(let i=0; i < alerts.length; i++){
      this.alerts.push(new Follow(alerts[i]));
    }
  }

  setSubscription(alerts){
    for(let i=0; i < alerts.length; i++){
      if(alerts[i].variation !== 1){
        this.alerts.push(new Subscription(alerts[i]));
      } else{
        this.alerts.push(new Subgift(alerts[i]));
      }
    }
  }

  setDonation(alerts){
    for(let i=0; i < alerts.length; i++){
      this.alerts.push(new Donation(alerts[i]));
    }
  }

  setHost(alerts){
    for(let i=0; i < alerts.length; i++){
      this.alerts.push(new Host(alerts[i]));
    }
  }

  setBits(alerts){
    for(let i=0; i < alerts.length; i++){
      this.alerts.push(new Bits(alerts[i]));
    }
  }

  setRaid(alerts){
    for(let i=0; i < alerts.length; i++){
      this.alerts.push(new Raid(alerts[i]));
    }
  }
}
