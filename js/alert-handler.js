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

  const alerts = new Array();
  let timeGapAdd = 0;
  let baseVideo;

  const findAlert = function(){
    return alerts.find(alert => alert.alreadyDisplayed === false);
  };

  const findAlertConfig = function(type){
    return config.alerts.find(alert => alert.type === type);
  }

  const splitText = function(div){
    let words = div.innerHTML.split(' ');
    div.innerHTML = '';
    for(let i=0; i < words.length; i++){
      let span = document.createElement('span');
      span.textContent = `${words[i]}`;
      div.appendChild(span);
    }
    return div.children;
  }

  alertHandler.triggerAlertVideo = function(e){
    baseVideo.pause();
    e.target.removeAttribute('hidden');
    e.target.play().then(()=>{
      baseVideo.setAttribute('hidden', '');
    });
  };

  alertHandler.triggerAlertBubble = function(e){
    textBubble.style.fontSize = e.detail.config.fontSize;
    textBubble.style.fontFamily = `${e.detail.config.typographyId}, verdana`;
    textBubble.innerHTML = e.detail.config.text(e.detail.alert.name, e.detail.alert.amount, e.detail.alert.currency);
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
      }
    }).fromTo(e.target, e.detail.config.bubbleTime, {opacity:0}, {opacity:1}).staggerFrom(words, e.detail.config.textTime, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, (e.detail.config.textTime/words.length).toFixed(2), "+=0").to([e.target, words], 0.75, {opacity: 0}, e.detail.config.timeActive);
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
          e.target.setAttribute('hidden', '');
          e.target.currentTime = 0;
          alertHandler.timeOutTest();
        }, 50);
      });
    }
  };

  alertHandler.timeOutTest = function(){
    setTimeout(()=>{
      baseVideo.pause();
      timeGapAdd = Math.floor(baseVideo.currentTime)%config.general.intervalTime;
      if( timeGapAdd !== 0){
        timeGapAdd = 0-(Math.ceil(baseVideo.currentTime)-baseVideo.currentTime);
      } else{
        timeGapAdd = baseVideo.currentTime-Math.floor(baseVideo.currentTime);
      }
      alertHandler.alertTesting();
    }, config.general.intervalTime*1000-timeGapAdd*1000);
  };

  alertHandler.alertTesting = function(){
    const alert = findAlert();
    if(alert){
      alert.alreadyDisplayed = true;
      const alertConfig = findAlertConfig(alert.type);
      const eventVideo = new Event('triggerAlert');
      const eventBubble = new CustomEvent('triggerAlert', {detail : {config: alertConfig, alert: alert}});
      document.getElementById(`${alertConfig.videoId}-video`).dispatchEvent(eventVideo);
      if(config.general.activateSpeech) document.getElementById(`${alertConfig.bubbleId}-bubble`).dispatchEvent(eventBubble);
    } else{
      baseVideo.play().then(this.timeOutTest).catch((err)=>{
        showError(`${err}`);
      });
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
      if(streamlabsAlerts[i].months > 1){
        alerts.push(new Resubscribe(streamlabsAlerts[i]));
      } else{
        alerts.push(new Subscribe(streamlabsAlerts[i]));
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

}(window.alertHandler = window.alertHandler || {}));
