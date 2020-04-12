'use strict';
(function(alertHandler) {
  class Follow{
    constructor(alert){
      this.type = 'follow';
      this.name = alert.name;
      this.alreadyDisplayed = false;
    }
  };
  class Subscribe{
    constructor(alert){
      this.type = 'subscribe';
      this.name = alert.name;
      this.amount = alert.months;
      this.alreadyDisplayed = false;
    }
  };
  class Resubscribe{
    constructor(alert){
      this.type = 'resubscribe';
      this.name = alert.name;
      this.amount = alert.months;
      this.alreadyDisplayed = false;
    }
  };
  class Donation{
    constructor(alert){
      this.type = 'donation';
      this.name = alert.from;
      this.currency = alert.currency;
      alert.amount = alert.amount.toFixed(2);
      this.amount = Number(alert.amount);
      this.alreadyDisplayed = false;
    }
  };
  class Host{
    constructor(alert){
      this.type = 'host';
      this.name = alert.name;
      this.amount = Number(alert.viewers);
      this.alreadyDisplayed = false;
    }
  };
  class Bits{
    constructor(alert, amount){
      this.type = `bits${amount}`;
      this.name = alert.name;
      this.amount = Number(alert.amount);
      this.alreadyDisplayed = false;
    }
  };
  class Raid{
    constructor(alert){
      this.type = 'raid';
      this.name = alert.name;
      this.amount = alert.raiders;
      this.alreadyDisplayed = false;
    }
  };
  class Subgift{
    constructor(alert){
      this.type = 'subgift';
      this.name = alert.name;
      this.gifter = alert.gifter;
      this.alreadyDisplayed = false;
    }
  };
  class Subbomb{
    constructor(alert){
      this.type = 'bomb';
      this.name = alert.name;
      this.gifter = alert.gifter;
      this.amount = alert.amount;
      this.alreadyDisplayed = false;
    }
  };
  class BlankFill{
    constructor(id){
      this.type = `blank-filler-${id}`;
      this.alreadyDisplayed = false;
    }
  };

  const alerts = new Array();
  const configGiftAndBomb = new Array();
  configGiftAndBomb['gift'] = config.alerts.find(alert => alert.type === 'subgift');
  configGiftAndBomb['bomb'] = config.alerts.find(alert => alert.type === 'bomb');
  let timeGapAdd = 0;
  let baseVideo;

  const findAlert = function(){
    return alerts.find(alert => alert.alreadyDisplayed === false);
  };

  const findAlertConfig = function(type){
    return config.alerts.find(alert => alert.type === type);
  };

  const splitText = function(div){
    let words = div.innerHTML.split(' ');
    div.innerHTML = '';
    for(let i=0; i < words.length; i++){
      let span = document.createElement('span');
      span.textContent = `${words[i]}`;
      div.appendChild(span);
    }
    return div.children;
  };

  alertHandler.triggerAlertVideo = function(e){
    if(config.general.videoimage === 'video'){
      baseVideo.pause();
      e.target.removeAttribute('hidden');
      e.target.play().then(()=>{
        setTimeout(()=>{
          baseVideo.setAttribute('hidden', '');
        }, 50);
      });
    } else{
      if(config.general.activateImgAnimation){
        new TimelineMax({
          onStart: ()=>{
            e.target.removeAttribute('hidden');
            baseVideo.setAttribute('hidden', '');
          }
        }).to(e.target, 0.3, {ease: Power1.easeOut, marginTop:'0px'}).to(e.target, 0.3, {ease: Power1.easeIn, marginTop: config.general.marginImgAnimation}).to(e.target, 0.15, {ease: Power1.easeOut, marginTop:`${Number(config.general.marginImgAnimation.slice(0,-2))/2}px`}).to(e.target, 0.15, {ease: Power1.easeIn, marginTop: config.general.marginImgAnimation});
      } else{
        e.target.removeAttribute('hidden');
        baseVideo.setAttribute('hidden', '');
      }
      if(!e.detail.config.activateSpeech){
        setTimeout(function(){
          e.target.dispatchEvent(new Event('end'));
        }, 7000);
      }
    }
  };

  alertHandler.triggerAlertBubble = function(e, imgId){
    textBubble.style.fontSize = e.detail.config.fontSize;
    textBubble.style.fontFamily = `${e.detail.config.typographyId}, verdana`;
    textBubble.innerHTML = e.detail.config.text(e.detail.alert.name, e.detail.alert.amount, e.detail.alert.currency, e.detail.alert.gifter);
    let words = splitText(textBubble);
    new TimelineMax({
      onStart: ()=>{
        e.target.removeAttribute('hidden');
        textBubble.removeAttribute('hidden');
      },
      onComplete: ()=>{
        textBubble.setAttribute('hidden', '');
        textBubble.innerHTML = '';
        e.target.setAttribute('hidden', '');
        e.target.removeAttribute('style');
        if(config.general.videoimage === 'image') document.getElementById(`${e.detail.config.videoId}-video`).dispatchEvent(new Event('end'));
      }
    }).fromTo(e.target, e.detail.config.bubbleTime, {opacity:0}, {opacity:1}).staggerFrom(words, e.detail.config.textTime, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, (e.detail.config.textTime/words.length).toFixed(2), "+=0").to([e.target, words], 0.75, {opacity: 0}, `+=${e.detail.config.timeActive}`);
  };

  alertHandler.endAlert = function(e){
    e.target.pause();
    if(findAlert()){
      e.target.setAttribute('hidden', '');
      e.target.currentTime = 0;
      alertHandler.alertTesting();
    } else{
      baseVideo.removeAttribute('hidden');
      baseVideo.play().then(()=>{
        setTimeout(()=>{
          if(config.general.blankNumber > 0) alertHandler.timerBlank = alertHandler.timeOutBlank();
          e.target.setAttribute('hidden', '');
          e.target.currentTime = 0;
          alertHandler.timerVideo = alertHandler.timeOutTest();
        }, 50);
      });
    }
  };

  alertHandler.endAlertImage = function(e){
    if(findAlert()){
      e.target.setAttribute('hidden', '');
      alertHandler.alertTesting();
    } else{
      baseVideo.removeAttribute('hidden');
      e.target.setAttribute('hidden', '');
      alertHandler.timerImage = alertHandler.timeOutTestImage();
      if(config.general.blankNumber > 0) alertHandler.timerBlank = alertHandler.timeOutBlank();
    }
  };

  alertHandler.timeOutTest = function(){
    return setTimeout(()=>{
      baseVideo.pause();
      timeGapAdd = Math.floor(baseVideo.currentTime)%config.general.intervalTime;
      if(timeGapAdd !== 0){
        timeGapAdd = 0-(Math.ceil(baseVideo.currentTime)-baseVideo.currentTime);
      } else{
        timeGapAdd = baseVideo.currentTime-Math.floor(baseVideo.currentTime);
      }
      alertHandler.alertTesting();
    }, config.general.intervalTime*1000-timeGapAdd*1000);
  };

  alertHandler.timeOutTestImage = function(){
    return setTimeout(()=>{
      alertHandler.alertTesting();
    }, config.general.intervalTime*1000);
  };

  alertHandler.timeOutBlank = function(){
    return setTimeout(()=>{
      alertHandler.setBlankFiller();
    }, config.general.blankTime*60*1000);
  };

  alertHandler.alertTesting = function(){
    const alert = findAlert();
    if(alert){
      (config.general.videoimage === 'video') ? clearTimeout(alertHandler.timerVideo) : clearTimeout(alertHandler.timerImage);
      alert.alreadyDisplayed = true;
      const alertConfig = findAlertConfig(alert.type);
      const eventVideo = new CustomEvent('triggerAlert', {detail : {config: alertConfig}});
      const eventBubble = new CustomEvent('triggerAlert', {detail : {config: alertConfig, alert: alert, imgId: `${alertConfig.videoId}-video`}});
      document.getElementById(`${alertConfig.videoId}-video`).dispatchEvent(eventVideo);
      if(config.general.activateSpeech && alertConfig.activateSpeech) document.getElementById(`${alertConfig.bubbleId}-bubble`).dispatchEvent(eventBubble);
    } else{
      if(config.general.videoimage === 'video'){
        baseVideo.play().then(()=>{
          (config.general.videoimage === 'video') ? clearTimeout(alertHandler.timerVideo) : clearTimeout(alertHandler.timerImage);
          this.timerVideo = this.timeOutTest();
        }).catch((err)=>{
          showError(`${err}`);
        });
      } else{
        alertHandler.timerImage = alertHandler.timeOutTestImage();
      }
    }
  };

  alertHandler.setConfig = function(video, textArea, textBubble){
    baseVideo = video;
    alertHandler.textArea = document.getElementById('textArea');
    alertHandler.textBubble = document.getElementById('textBubble');
  };

  alertHandler.setFollow = function(streamlabsAlerts){
    for(let i=0; i < streamlabsAlerts.length; i++){
      alerts.push(new Follow(streamlabsAlerts[i]));
    }
  };

  alertHandler.setSubscription = function(streamlabsAlerts){
    for(let i=0; i < streamlabsAlerts.length; i++){
      if(configGiftAndBomb['gift'].activate && typeof streamlabsAlerts[i].gifter !== 'undefined' && streamlabsAlerts[i].gifter !== null){
        alerts.push(new Subgift(streamlabsAlerts[i]));
      } else{
        if(streamlabsAlerts[i].months > 1){
          alerts.push(new Resubscribe(streamlabsAlerts[i]));
        } else{
          alerts.push(new Subscribe(streamlabsAlerts[i]));
        }
      }
    }
  };

  alertHandler.setDonation = function(streamlabsAlerts){
    for(let i=0; i < streamlabsAlerts.length; i++){
      alerts.push(new Donation(streamlabsAlerts[i]));
    }
  };

  alertHandler.setHost = function(streamlabsAlerts){
    for(let i=0; i < streamlabsAlerts.length; i++){
      alerts.push(new Host(streamlabsAlerts[i]));
    }
  };

  alertHandler.setBits = function(streamlabsAlerts){
    for(let i=0; i < streamlabsAlerts.length; i++){
      let amount = Number(streamlabsAlerts[i].amount);
      if(amount >= 1 && amount < 100){
        alerts.push(new Bits(streamlabsAlerts[i], '1'));
      } else if(amount >= 100 && amount < 1000){
        alerts.push(new Bits(streamlabsAlerts[i], '100'));
      } else if(amount >= 1000 && amount < 5000){
        alerts.push(new Bits(streamlabsAlerts[i], '1000'));
      } else if(amount >= 5000 && amount < 10000){
        alerts.push(new Bits(streamlabsAlerts[i], '5000'));
      } else if(amount >= 10000){
        alerts.push(new Bits(streamlabsAlerts[i], '10000'));
      }

    }
  };

  alertHandler.setRaid = function(streamlabsAlerts){
    for(let i=0; i < streamlabsAlerts.length; i++){
      alerts.push(new Raid(streamlabsAlerts[i]));
    }
  };

  alertHandler.setBlankFiller = function(){
    alerts.push(new BlankFill(Math.floor(Math.random()*config.general.blankNumber)+1));
    clearTimeout(alertHandler.timerBlank);
  };

}(window.alertHandler = window.alertHandler || {}));
