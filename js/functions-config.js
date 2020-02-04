const changeText = async function(text, type, username){
  if(testText(text)){
    let words = text.value.split(' ');
    bubbleText.innerHTML = '';
    for(let i=0; i < words.length; i++){
      let span = document.createElement('span');
      if(words[i] === '${name}' && username === 'long') words[i] = 'This_is_averylong_username';
      if(words[i] === '${name}' && username === 'short') words[i] = '0ne3y3';
      if(words[i] === '${amount}'){
        switch(type){
          case 'resubscribe':
            words[i] = '3';
            break;
          case 'raid':
            words[i] = '455';
            break;
          case 'host':
            words[i] = '1255';
            break;
          case 'donation':
            words[i] = '395.56';
            break;
          default :
            words[i] = '200';
        }
      }
      if(words[i] === '${currency}') words[i] = 'USD';
      span.textContent = `${words[i]}`;
      bubbleText.appendChild(span);
    }
    text.removeAttribute('class');
    if(text.parentNode.lastChild.tagName === 'P') text.parentNode.lastChild.remove();
  } else{
    errorText(text);
  }
};

const testText = function(text){
  return (text.value.trim()) ? true : false;
};

const errorText = async function(text){
  text.className = 'error-input';
  if(text.parentNode.lastChild.tagName !== 'P'){
    let p = document.createElement('p');
    p.className = 'error-paragraph';
    p.textContent = 'Text can\'t be empty';
    text.parentNode.appendChild(p);
  }
  bubbleText.innerHTML = '<span>ERROR:</span><span>No</span><span>text</span><span>!</span>';
};

const changeFontSize = async function(fontSize){
  if(fontSize.value > 0){
    bubbleText.style.fontSize = `${fontSize.value}px`;
  } else{
    bubbleText.style.fontSize = `45px`;
    fontSize.value = 45;
  }
};

const changeFontFamily = async function(name, extension){
  let newFont = new FontFace('new-font', `url(typo/${name.value}.${extension.value})`);
  testFontFamily(name, extension).then((loaded_face)=>{
    document.fonts.add(loaded_face);
    bubbleText.style.fontFamily = '"new-font", verdana';
    name.removeAttribute('class');
    extension.className = 'extensions';
    if(name.parentNode.lastChild.tagName === 'P') name.parentNode.lastChild.remove();
  }).catch((err)=>{
    bubbleText.style.fontFamily = 'verdana';
    errorFontFamily(name, extension);
  });
};

const testFontFamily = function(name, extension){
  let newFont = new FontFace('new-font', `url(typo/${name.value}.${extension.value})`);
  return newFont.load();
};

const errorFontFamily = function(name, extension){
  name.className = `error-input`;
  extension.className = `extensions error-input`;
  if(name.parentNode.lastChild.tagName !== 'P'){
    let p = document.createElement('p');
    p.className = 'error-paragraph';
    p.textContent = 'Typography not found in "typo" folder';
    name.parentNode.appendChild(p);
  }
};

const changeBubble = async function(name){
  testBubble(name).then((img)=>{
    let oldimg = document.getElementsByClassName('bubbles');
    img.className = oldimg[0].className;
    img.id = name.value;
    oldimg[0].remove();
    document.getElementById('textArea').insertBefore(img, bubbleText);
    changeBubbleScale(img);
    name.removeAttribute('class');
    if(name.parentNode.lastChild.tagName === 'P' && name.parentNode.lastChild.className !== 'informations inline-text') name.parentNode.lastChild.remove();
  }, ()=>{
    errorBubble(name);
  });
};

const testBubble = function(name){
  return new Promise((resolve, reject)=>{
    let img = new Image();
    img.onload = function(){
      resolve(img);
    };
    img.onerror = reject;
    img.src = `./speechBubbles/${name.value}.png`;
  });
};

const errorBubble = function(name){
  name.className = `error-input`;
  if(name.parentNode.lastChild.tagName !== 'P'){
    let p = document.createElement('p');
    p.className = 'error-paragraph';
    p.textContent = 'Image not found in "speechBubbles" folder';
    name.parentNode.appendChild(p);
  }
};

const changeBubbleScale = function(bubble){
  let textContainer = document.getElementById('textArea');
  textContainer.style.width = `${bubble.width}px`;
  textBubble.style.width = `${calculateWidth(textContainer)}px`;
  generalForm.elements['gapInbetween'].dispatchEvent(new Event('change'));
};

const calculateWidth = function(textContainer){
  return Number(textContainer.style.width.slice(0,-2))-Number(window.getComputedStyle(textBubble, null).getPropertyValue('padding-left').slice(0,-2))*2;
};

const calculateTotalPreview = function(){
  let videosContainer = document.getElementById('videos');
  if(generalForm.elements['ActivateSpeech'].value == '1'){
    let textAreaContainer = document.getElementById('textArea');
    let gap = 0;
    if(generalForm.elements['placeSpeech'].value === 'left') gap = Number(window.getComputedStyle(videosContainer, null).getPropertyValue('margin-left').slice(0,-2));
    if(generalForm.elements['placeSpeech'].value === 'right') gap = Number(window.getComputedStyle(textAreaContainer, null).getPropertyValue('margin-left').slice(0,-2));
    return videosContainer.clientWidth+textAreaContainer.clientWidth+gap;
  } else{
    return videosContainer.clientWidth;
  }
};

const changeVideo = async function(name, extension){
  testVideo(name, extension).then((video)=>{
    video.className = `video`;
    video.id = `${name.value}Stand`;
    video.currentTime = video.duration/2;
    document.getElementsByClassName('video')[0].remove();
    document.getElementById('videos').appendChild(video);
    changeVideoScale(video);
    name.removeAttribute('class');
    extension.className = 'extensions';
    if(name.parentNode.lastChild.tagName === 'P') name.parentNode.lastChild.remove();
    generalForm.elements['gapInbetween'].dispatchEvent(new Event('change'));
    document.getElementById('finalHeight').innerHTML = video.videoHeight;
    document.getElementById('preview-container').style.height = `${video.videoHeight}px`;
  }, ()=>{
    errorVideo(name, extension);
  });
};

const testVideo = function(name, extension){
  return new Promise((resolve, reject)=>{
    let video = document.createElement('video');
    video.src = `./video/${name.value}.${extension.value}`;
    video.onloadeddata = function(){
      resolve(video);
    };
    video.onerror = reject;
    video.load();
  });
};

const errorVideo = function(name, extension){
  name.className = `error-input`;
  extension.className = 'extensions error-input';
  if(name.parentNode.lastChild.tagName !== 'P'){
    let p = document.createElement('p');
    p.className = 'error-paragraph';
    p.textContent = 'Video not found in "video" folder';
    name.parentNode.appendChild(p);
  }
};

const changeVideoScale = function(video){
  let videoContainer = document.getElementById('videos');
  videoContainer.style.width = `${video.videoWidth}px`;
};

const changeShadow = async function(value){
  if(value === 'ON'){
    bubbleText.style.textShadow = '2px 2px 5px #111111';
  } else{
    bubbleText.style.textShadow = 'none';
  }
};

const changeSpeechPlace = async function(value){
  let textArea = document.getElementById('textArea');
  textArea.remove();
  if(value === 'left'){
    textArea.children[0].className = 'bubbles bubbles-left';
    document.getElementById('preview-container').insertBefore(textArea, document.getElementById('videos'));
  } else{
    textArea.children[0].className = 'bubbles';
    document.getElementById('preview-container').appendChild(textArea);
  }
  document.getElementById('videos').style.marginLeft = "0px";
  document.getElementById('textArea').style.marginLeft = "0px";
  generalForm.elements['gapInbetween'].dispatchEvent(new Event('change'));
};

const activateBubbleSpeech = async function(value){
  if(value == 1){
    let eBlur = new Event('blur');
    let eChange = new Event('change');
    generalForm.elements['colorText'].removeAttribute('disabled');
    for(let i = 0; i < generalForm.elements['placeSpeech'].length; i++){
      generalForm.elements['placeSpeech'][i].removeAttribute('disabled');
    }
    for(let i = 0; i < generalForm.elements['shadowText'].length; i++){
      generalForm.elements['shadowText'][i].removeAttribute('disabled');
    }
    generalForm.elements['marginTextTop'].removeAttribute('disabled', '');
    generalForm.elements['centerText'].removeAttribute('disabled', '');
    generalForm.elements['gapInbetween'].removeAttribute('disabled', '');
    for(let i=0; i < alertsForms.length; i++){
      if(i===0){
        for(let j=0; j < alertsForms.length; j++){
          alertsForms[j].elements['selectPreview'].removeAttribute('checked');
        }
        alertsForms[i].elements['selectPreview'].setAttribute('checked', '');
        alertsForms[i].elements['selectPreview'].checked = true;
      }
      let type = alertsForms[i].dataset.type;
      for(let j=0; j < alertsForms[i].elements.length; j++){
        alertsForms[i].elements[j].removeAttribute('disabled', '');
      }
      if(i===0){
        if(document.getElementById('textArea')) document.getElementById('textArea').remove();
        let div = document.createElement('div');
        div.className = 'alignement';
        div.id = 'textArea';
        let img = document.createElement('img');
        img.className = 'bubbles';
        if(generalForm.elements['placeSpeech'].value === 'left') img.className += ' bubbles-left';
        img.src = `./speechBubbles/${alertsForms[i].elements[`${type}BubbleName`].value}.png`;
        div.appendChild(img);
        let p = document.createElement('p');
        p.id = 'textBubble';
        p.style.fontSize = `${alertsForms[i].elements[`${type}FontSize`]}px`;
        p.style.fontFamily = 'new-font, Arial';
        p.style.marginTop = `${generalForm.elements['marginTextTop'].value}px`;
        p.style.paddingLeft = `${generalForm.elements['centerText'].value}px`;
        p.style.paddingRight = `${generalForm.elements['centerText'].value}px`;
        div.style.width = `${img.width}px`;
        p.style.width = `${Number(div.style.width.slice(0,-2))-generalForm.elements['centerText'].value*2}px`;
        document.getElementById('preview-container').style.width = `${document.getElementsByClassName('video')[0].videoWidth+img.width+generalForm.elements['gapInbetween'].value}px`;
        div.appendChild(p);
        if(generalForm.elements['placeSpeech'].value === 'left'){
          document.getElementById('preview-container').insertBefore(div, document.getElementById('videos'));

        } else{
          document.getElementById('preview-container').appendChild(div);
        }
        bubbleText = document.getElementById('textBubble');
        changeText(alertsForms[i].elements[`${type}Text`], type, usernameSelect.elements['usernameSelect'].value);
        changeFontSize(alertsForms[i].elements[`${type}FontSize`]);
        changeFontFamily(alertsForms[i].elements[`${type}TypoName`], alertsForms[i].elements[`${type}TypoExtension`]);
        changeVideo(alertsForms[i].elements[`${type}Video`], alertsForms[i].elements[`${type}VideoExtension`]);
        generalForm.elements['colorText'].dispatchEvent(eBlur);
        for(let i = 0; i < generalForm.elements['shadowText'].length; i++){
          generalForm.elements['shadowText'][i].dispatchEvent(eChange);
        }
        generalForm.elements['gapInbetween'].dispatchEvent(eChange);
      }
    }
  } else{
    document.getElementById('textArea').remove();
    generalForm.elements['colorText'].setAttribute('disabled', '');
    for(let i = 0; i < generalForm.elements['placeSpeech'].length; i++){
      generalForm.elements['placeSpeech'][i].setAttribute('disabled', '');
    }
    for(let i = 0; i < generalForm.elements['shadowText'].length; i++){
      generalForm.elements['shadowText'][i].setAttribute('disabled', '');
    }
    generalForm.elements['marginTextTop'].setAttribute('disabled', '');
    generalForm.elements['centerText'].setAttribute('disabled', '');
    generalForm.elements['gapInbetween'].setAttribute('disabled', '');
    generalForm.elements['gapInbetween'].value = 0;
    document.getElementById('videos').style.marginLeft = '0px';
    document.getElementById('finalWidth').innerHTML = calculateTotalPreview();
    document.getElementById('preview-container').style.width = `${calculateTotalPreview()}px`;
    for(let i=0; i < alertsForms.length; i++){
      for(let j=0; j < alertsForms[i].elements.length; j++){
        let type = alertsForms[i].dataset.type;
        if(alertsForms[i].elements[j] !== alertsForms[i].elements[`${type}Video`] && alertsForms[i].elements[j] !== alertsForms[i].elements['selectPreview'] && alertsForms[i].elements[j] !== alertsForms[i].elements[`${type}VideoExtension`]){
          alertsForms[i].elements[j].setAttribute('disabled', '');
        }
      }
    }
  }
};

const testColorTextInput = function(target){
  if(target.value.trim()){
    if(RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$').test(target.value)){
      return 'ok';
    } else{
      return 'format';
    }
  } else{
    return 'trim';
  }
};

const errorColorTextInput = async function(err, target){
  let p;
  target.className = 'error-input';
  bubbleText.style.color = '#000000';
  target.value = '#000000';
  if(target.nextSibling.tagName !== 'P'){
    p = document.createElement('p');
    p.className = 'error-paragraph';
  }
  if(err === 'trim'){
    if(typeof p !== 'undefined'){
      p.textContent = 'No color, back to default.';
      target.parentNode.insertBefore(p, target.nextSibling);
    } else{
      target.nextSibling.innerHTML = 'No color, back to default.';
    }
  } else{
    if(typeof p !== 'undefined'){
      p.textContent = 'Format invalid (must be like "#12FF12"), back to default.';
      target.parentNode.insertBefore(p, target.nextSibling);
    } else{
      target.nextSibling.innerHTML = 'Format invalid (must be like "#12FF12"), back to default.';
    }
  }
};

const getNameExtension = function(name){
  let reg1 = /[a-zA-Z0-9-_\s]*/g;
  let reg2 = /\.[a-zA-Z0-9-]*/g;
  let match1 = name.match(reg1);
  let match2 = name.match(reg2);
  return [match1[0], match2[0].slice(1)];
};

const generateConfig = function(config){
  let text = `'use strict';const config={general:${JSON.stringify(config.general)},alerts:[`;
  for(let i=0; i < config.alerts.length; i++){
    let alert = config.alerts[i];
    text += `{bubbleName:"${alert.bubbleName}",bubbleTime:${alert.bubbleTime},fontSize:"${alert.fontSize}",textTime: ${alert.textTime},timeActive:${alert.timeActive},type:"${alert.type}",typography:"${alert.typography}",video:"${alert.video}",bubbleId:"${alert.bubbleId}", typographyId:"${alert.typographyId}", videoId: "${alert.videoId}", textBase: "${alert.text}",`;
    text += 'text:function(name,amount,currency){return `'+alert.text+'`;}}';
    if(alert !== config.alerts[config.alerts.length-1]){
      text += ',';
    }
  }
  text += ']};';
  return text;
};
