'use strict';
const client = new StreamlabsSocket.Client({
  token: config.general.token,
  emitTests: true
});
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
  alertHandler.setSubscription(data);
});
client.connect();

const showError = function(err){
  document.getElementById('videos').setAttribute('hidden', '');
  if(document.getElementById('textArea')) document.getElementById('textArea').setAttribute('hidden', '');
  document.getElementById('error-message').textContent += err;
  document.getElementById('error').style.backgroundColor = '#313133';
  document.getElementById('error').removeAttribute('hidden');
};

const addVideos = async function(){
  for(let i=0; i < config.alerts.length; i++){
    if(!document.getElementById(`${config.alerts[i].videoId}-video`)){
      let video = await importVideo(config.alerts[i].video, config.alerts[i].videoId).catch(()=>{
        showError(`404: ${config.alerts[i].video} not found in "video" folder.`);
      });
      video.addEventListener('triggerAlert', alertHandler.triggerAlertVideo);
      video.addEventListener('ended', alertHandler.endAlert);
    }
  }
};

const importVideo = function(videoName, videoId){
  return new Promise((resolve, reject)=>{
    let video = document.createElement('video');
    video.onloadeddata = function(){
      video.className = 'video';
      video.id = `${videoId}-video`;
      video.muted = true;
      video.setAttribute('hidden', '');
      document.getElementById('videos').appendChild(video);
      resolve(video);
    };
    video.onerror = function(){
      reject();
    };
    video.src = `./video/${videoName}`;
  });
};

const addBubbles = async function(){
  for(let i=0; i < config.alerts.length; i++){
    if(!document.getElementById(`${config.alerts[i].bubbleId}-bubble`)){
      let bubble = await importBubble(config.alerts[i].bubbleName, config.alerts[i].bubbleId).catch(()=>{
        showError(`404: ${config.alerts[i].bubbleName} not found in "speechBubbles" folder.`);
      });
      bubble.addEventListener('triggerAlert', alertHandler.triggerAlertBubble);
    }
  }
};

const importBubble = function(bubbleName, bubbleId){
  return new Promise((resolve, reject)=>{
    let img = new Image();
    img.onload = function(){
      img.id = `${bubbleId}-bubble`;
      img.className = 'bubbles';
      if(config.general.placeSpeech === 'left') img.className += ' bubbles-left';
      img.setAttribute('hidden', '');
      document.getElementById('textArea').appendChild(img);
      resolve(img);
    };
    img.onerror = function(){
      reject();
    };
    img.src = `./speechBubbles/${bubbleName}`;
  });
};

const addTypos = async function(){
  for(let i=0; i < config.alerts.length; i++){
    await importFont(config.alerts[i].typography, config.alerts[i].typographyId).catch(()=>{
      config.alerts[i].typographyId = 'verdana';
    });
  }
};

const importFont = function(typography, typographyId){
  return new Promise((resolve, reject)=>{
    let newFont = new FontFace(typographyId, `url(typo/${typography})`);
    newFont.load().then((loaded_face)=>{
      document.fonts.add(loaded_face);
      resolve();
    }).catch(()=>{
      reject();
    });
  });

};

window.onload = function(){
  document.body.style.width = config.general.width;
  document.body.style.height = config.general.height;
  importVideo(config.general.baseVideo, 'Base').then((video)=>{
    video.loop = true;
    video.removeAttribute('hidden');
    document.getElementById('videos').style.width = `${video.videoWidth}px`;
    alertHandler.setConfig(video);
    alertHandler.textBubble.style.color = config.general.colorText;
    alertHandler.textBubble.style.textShadow = (config.general.shadowText) ? '2px 2px 5px #111111': 'none';
    alertHandler.textBubble.style.paddingLeft = config.general.centerText;
    alertHandler.textBubble.style.paddingRight = config.general.centerText;
    alertHandler.textBubble.style.marginTop = config.general.marginTextTop;
    if(!config.general.activateSpeech){
      alertHandler.textArea.remove();
    }
    if(config.general.placeSpeech === 'left' && config.general.activateSpeech){
      alertHandler.textArea.parentNode.removeChild(alertHandler.textArea);
      document.getElementById('body').insertBefore(alertHandler.textArea, document.getElementById('videos'));
      document.getElementById('videos').style.marginLeft = `-${config.general.gapInbetween}`;
    } else if(config.general.placeSpeech === 'right' && config.general.activateSpeech){
      document.getElementById('textArea').style.marginLeft = `-${config.general.gapInbetween}`;
    }
    addVideos();
    if(config.general.activateSpeech){
      addBubbles().then(()=>{
        let firstBubble = alertHandler.textArea.getElementsByClassName('bubbles')[0];
        alertHandler.textArea.style.width = `${firstBubble.width}px`;
        alertHandler.textBubble.style.width = `${firstBubble.width-Number(config.general.centerText.slice(0,-2))*2}px`;
      });
      addTypos();
    }
    video.play().then(alertHandler.timeOutTest).catch((err)=>{
      showError(`${err}`);
    });
  }, ()=>{
    showError(`404: BaseStand.webm not found in "video" folder.`);
  });
};
