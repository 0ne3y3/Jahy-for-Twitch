'use strict';
// REQUIREMENT
const config = new Config();
const client = new StreamlabsSocket.Client({
  token: config.token,
  emitTests: true
});
const alertHandler = new AlertHandler();

// ######################
// ##### Socket IO ######
// ######################
// socket to streamlabs API to receive alert
client.on('follow', (...data)=>{
  alertHandler.setFollow(data);
});

client.on('subscription', (...data)=>{
  alertHandler.setSubscription(data);
});

client.on('bits', (...data)=>{
  alertHandler.setBits(data);
});

client.on('host', (...data)=>{
  alertHandler.setHost(data);
});

client.on('donation', (...data)=>{
  alertHandler.setDonation(data);
});

client.on('raid', (...data)=>{
  alertHandler.setRaid(data);
});

client.on('resub', (...data)=>{
  console.log(data);
  alertHandler.setSubscription(data);
});

client.connect();

// ######################
// ##### DOM READY  #####
// ######################
// When DOM is loaded, do this
window.onload = function(){
  if(config.displayBubble === 'no'){
    document.getElementById('textArea').setAttribute('hidden', '');
  } else if(config.textPosition === 'left'){
    let textArea = document.getElementById('textArea');
    textArea.parentNode.removeChild(textArea);
    document.getElementById('body').insertBefore(textArea, document.getElementById('videos'));
    let bubbles = document.getElementsByClassName('bubbles');
    for(let i=0; i < bubbles.length; i++){
      bubbles[i].className = 'bubbles bubbles-left';
    }
  }
  alertHandler.getVideosAndBubbles();
  alertHandler.videos.base.play().then(()=>{
    setTimeout(()=>{
      alertHandler.alertTest();
    }, config.intervalTime);
  });
}
