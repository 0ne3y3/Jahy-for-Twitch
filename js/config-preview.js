'use strict';
(function(preview){
  let bubbleText;
  let generalForm;
  let alertsForms;
  preview.domLoad = async function(){
    bubbleText = document.getElementById('textBubble');
    generalForm = document.getElementById('form-general');
    alertsForms = document.getElementsByClassName('alerts-form');
  }

  /* CHANGE FUNCTIONS */
  preview.changeVideo = async function(name, extension){
    alerts.testVideo(name, extension).then((video)=>{
      video.className = `video`;
      video.id = `${name.value}Stand`;
      video.setAttribute('muted','muted');
      video.setAttribute('loop','loop');
      document.getElementsByClassName('video')[0].remove();
      document.getElementById('videos').appendChild(video);
      video.play();
      name.removeAttribute('class');
      extension.className = 'extensions';
      if(name.parentNode.lastChild.tagName === 'P') name.parentNode.lastChild.remove();
      preview.changeVideoScale(video);
      document.getElementById('form-general').elements['gap-in-between'].dispatchEvent(new Event('change'));
      document.getElementById('preview-container').style.height = `${video.videoHeight}px`;
      preview.changeMarginImage(0);
    }, ()=>{
      alerts.errorVideo(name, extension);
    });
  };

  preview.changeImage = async function(name, extension){
    alerts.testImage(name, extension).then((img)=>{
      img.className = 'video';
      img.id = `${name.value}Stand`;
      document.getElementsByClassName('video')[0].remove();
      document.getElementById('videos').appendChild(img);
      name.removeAttribute('class');
      extension.className = 'extensions';
      if(name.parentNode.lastChild.tagName === 'P') name.parentNode.lastChild.remove();
      preview.changeVideoScale(img);
      document.getElementById('form-general').elements['gap-in-between'].dispatchEvent(new Event('change'));
      document.getElementById('preview-container').style.height = `${img.height}px`;
      if(generalForm.elements['img-animation-activate'].checked){
        preview.changeMarginImage(generalForm.elements['img-animation-margin'].value);
      } else{
        preview.changeMarginImage(0);
      }
    }, ()=>{
      alerts.errorVideo(name, extension);
    });
  }

  preview.changeVideoScale = async function(video){
    let videoContainer = document.getElementById('videos');
    videoContainer.style.width = `${(video.tagName === 'VIDEO') ? video.videoWidth : video.width}px`;
  };

  preview.changeText = async function(text, type, username){
    if(alerts.testText(text)){
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
        if(words[i] === '${gifter}') words[i] = 'John';
        span.textContent = `${words[i]}`;
        if(!text.form.elements[`${text.form.elements['select-preview'].value}-text-activate`].checked) span.setAttribute('hidden', 'hidden');
        bubbleText.appendChild(span);
      }
      text.removeAttribute('class');
      if(text.parentNode.lastChild.tagName === 'P') text.parentNode.lastChild.remove();
    } else{
      alerts.errorText(text);
    }
  };

  preview.changeFontSize = async function(fontSize){
    if(fontSize.value > 0){
      bubbleText.style.fontSize = `${fontSize.value}px`;
    } else{
      bubbleText.style.fontSize = `45px`;
      fontSize.value = 45;
    }
  };

  preview.changeFontFamily = async function(name, extension){
    let newFont = new FontFace('new-font', `url(typo/${name.value}.${extension.value})`);
    alerts.testFontFamily(name, extension).then((loaded_face)=>{
      document.fonts.add(loaded_face);
      bubbleText.style.fontFamily = '"new-font", verdana';
      name.removeAttribute('class');
      extension.className = 'extensions';
      if(name.parentNode.lastChild.tagName === 'P') name.parentNode.lastChild.remove();
    }).catch(()=>{
      bubbleText.style.fontFamily = 'verdana';
      alerts.errorFontFamily(name, extension);
    });
  };

  preview.changeBubble = async function(name){
    alerts.testBubble(name).then((img)=>{
      let oldimg = document.getElementsByClassName('bubbles');
      img.className = oldimg[0].className;
      img.id = name.value;
      oldimg[0].remove();
      document.getElementById('textArea').insertBefore(img, bubbleText);
      preview.changeBubbleScale(img);
      name.removeAttribute('class');
      if(!name.form.elements[`${name.form.elements['select-preview'].value}-text-activate`].checked) document.getElementById('textArea').getElementsByTagName('IMG')[0].setAttribute('hidden', 'hidden');
      if(name.parentNode.lastChild.tagName === 'P' && name.parentNode.lastChild.className !== 'informations inline-text') name.parentNode.lastChild.remove();
    }, ()=>{
      alerts.errorBubble(name);
    });
  };

  preview.changeBubbleScale = function(bubble){
    let textContainer = document.getElementById('textArea');
    textContainer.style.width = `${bubble.width}px`;
    textBubble.style.width = `${preview.calculateWidth(textContainer)}px`;
    document.getElementById('form-general').elements['gap-in-between'].dispatchEvent(new Event('change'));
  };

  preview.calculateWidth = function(textContainer){
    return Number(textContainer.style.width.slice(0,-2))-Number(window.getComputedStyle(textBubble, null).getPropertyValue('padding-left').slice(0,-2))*2;
  };

  preview.changeShadow = async function(value){
    if(value === 'ON'){
      bubbleText.style.textShadow = '2px 2px 5px #111111';
    } else{
      bubbleText.style.textShadow = 'none';
    }
  };

  preview.changeSpeechPlace = async function(value){
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
    generalForm.elements['gap-in-between'].dispatchEvent(new Event('change'));
  };

  preview.changeAnimation = async function(form){
    const type = form.elements['select-preview'].value;
    if(generalForm.elements['activate-speech'].value == 1 && form.elements[`${type}-text-activate`].checked){
      preview.changeText(form.elements[`${type}-text`], type, document.getElementById('username-select-container').elements['username-select'].value);
      preview.changeFontSize(form.elements[`${type}-font-size`]);
      preview.changeFontFamily(form.elements[`${type}-typo-name`], form.elements[`${type}-typo-extension`]);
      preview.changeBubble(form.elements[`${type}-bubble-name`]);
    } else if(generalForm.elements['activate-speech'].value == 1 && !form.elements[`${type}-text-activate`].checked){
      form.elements[`${type}-text-activate`].dispatchEvent(new Event('change'));
    }
    if(generalForm.elements['video-image'].value === 'video'){
      preview.changeVideo(form.elements[`${type}-video`], form.elements[`${type}-video-extension`]);
    } else{
      preview.changeImage(form.elements[`${type}-video`], form.elements[`${type}-video-extension`]);
    }
  };

  preview.activateBubbleSpeech = async function(value){
    if(value == 1){
      let eBlur = new Event('blur');
      let eChange = new Event('change');
      generalForm.elements['color-text'].removeAttribute('disabled');
      for(let i = 0; i < generalForm.elements['place-speech'].length; i++){
        generalForm.elements['place-speech'][i].removeAttribute('disabled');
      }
      for(let i = 0; i < generalForm.elements['shadow-text'].length; i++){
        generalForm.elements['shadow-text'][i].removeAttribute('disabled');
      }
      generalForm.elements['margin-text-top'].removeAttribute('disabled', '');
      generalForm.elements['center-text'].removeAttribute('disabled', '');
      generalForm.elements['gap-in-between'].removeAttribute('disabled', '');
      for(let i=0; i < alertsForms.length; i++){
        if(i===0){
          for(let j=0; j < alertsForms.length; j++){
            alertsForms[j].elements['select-preview'].removeAttribute('checked');
            alertsForms[j].elements['select-preview'].checked = false;
          }
          alertsForms[i].elements['select-preview'].setAttribute('checked', '');
          alertsForms[i].elements['select-preview'].checked = true;
        }
        let type = alertsForms[i].elements['select-preview'].value;
        for(let j=0; j < alertsForms[i].elements.length; j++){
          if(type === 'subgift' || type === 'bomb'){
            if(alertsForms[i].elements[`activate-alert-${type}`].checked && alertsForms[i].elements[`${type}-text-activate`].checked){
              alertsForms[i].elements[j].removeAttribute('disabled', '');
            }
          } else{
            if(alertsForms[i].elements[`${type}-text-activate`].checked || alertsForms[i].elements[`${type}-text-activate`] === alertsForms[i].elements[j]) alertsForms[i].elements[j].removeAttribute('disabled', '');
          }
        }
        if(i===0){
          if(document.getElementById('textArea')) document.getElementById('textArea').remove();
          let div = document.createElement('div');
          div.className = 'alignement';
          div.id = 'textArea';
          let img = document.createElement('img');
          img.className = 'bubbles';
          if(generalForm.elements['place-speech'].value === 'left') img.className += ' bubbles-left';
          img.src = `./speechBubbles/${alertsForms[i].elements[`${type}-bubble-name`].value}.png`;
          div.appendChild(img);
          let p = document.createElement('p');
          p.id = 'textBubble';
          p.style.fontSize = `${alertsForms[i].elements[`${type}-font-size`]}px`;
          p.style.fontFamily = 'new-font, Arial';
          p.style.marginTop = `${generalForm.elements['margin-text-top'].value}px`;
          p.style.paddingLeft = `${generalForm.elements['center-text'].value}px`;
          p.style.paddingRight = `${generalForm.elements['center-text'].value}px`;
          div.style.width = `${img.width}px`;
          p.style.width = `${Number(div.style.width.slice(0,-2))-generalForm.elements['center-text'].value*2}px`;
          document.getElementById('preview-container').style.width = `${((generalForm.elements['video-image'].value === 'video') ? document.getElementsByClassName('video')[0].videoWidth : document.getElementsByClassName('video')[0].width)+img.width+generalForm.elements['gap-in-between'].value}px`;
          div.appendChild(p);
          if(generalForm.elements['place-speech'].value === 'left'){
            document.getElementById('preview-container').insertBefore(div, document.getElementById('videos'));
          } else{
            document.getElementById('preview-container').appendChild(div);
          }
          bubbleText = document.getElementById('textBubble');
          preview.changeText(alertsForms[i].elements[`${type}-text`], type, document.getElementById('username-select-container').elements['username-select'].value);
          preview.changeFontSize(alertsForms[i].elements[`${type}-font-size`]);
          preview.changeFontFamily(alertsForms[i].elements[`${type}-typo-name`], alertsForms[i].elements[`${type}-typo-extension`]);
          alertsForms[i].elements[`${type}-text-activate`].dispatchEvent(eChange);
          if(generalForm.elements['video-image'].value === 'video'){
            preview.changeVideo(alertsForms[i].elements[`${type}-video`], alertsForms[i].elements[`${type}-video-extension`]);
          } else{
            preview.changeImage(alertsForms[i].elements[`${type}-video`], alertsForms[i].elements[`${type}-video-extension`]);
          }
          generalForm.elements['color-text'].dispatchEvent(eBlur);
          for(let i = 0; i < generalForm.elements['shadow-text'].length; i++){
            generalForm.elements['shadow-text'][i].dispatchEvent(eChange);
          }
          generalForm.elements['gap-in-between'].dispatchEvent(eChange);
        }
      }
    } else{
      document.getElementById('textArea').remove();
      generalForm.elements['color-text'].setAttribute('disabled', '');
      for(let i = 0; i < generalForm.elements['place-speech'].length; i++){
        generalForm.elements['place-speech'][i].setAttribute('disabled', '');
      }
      for(let i = 0; i < generalForm.elements['shadow-text'].length; i++){
        generalForm.elements['shadow-text'][i].setAttribute('disabled', '');
      }
      generalForm.elements['margin-text-top'].setAttribute('disabled', '');
      generalForm.elements['center-text'].setAttribute('disabled', '');
      generalForm.elements['gap-in-between'].setAttribute('disabled', '');
      generalForm.elements['gap-in-between'].value = 0;
      document.getElementById('videos').style.marginLeft = '0px';
      document.getElementById('preview-container').style.width = `${alerts.calculateTotalPreview()}px`;
      for(let i=0; i < alertsForms.length; i++){
        for(let j=0; j < alertsForms[i].elements.length; j++){
          let type = alertsForms[i].elements['select-preview'].value;
          if(alertsForms[i].elements[j] !== alertsForms[i].elements[`${type}-video`] && alertsForms[i].elements[j] !== alertsForms[i].elements['select-preview'] && alertsForms[i].elements[j] !== alertsForms[i].elements[`${type}-video-extension`] && alertsForms[i].elements[j] !== alertsForms[i].elements[`activate-alert-${type}`]){
            alertsForms[i].elements[j].setAttribute('disabled', '');
          }
        }
      }
    }
  };

  preview.changeMedia = function(media){
    document.getElementsByClassName('video')[0].remove();
    let bubble = document.getElementsByClassName('bubbles')[0];
    let gap = generalForm.elements['gap-in-between'].value*-1;
    if(media === 'image'){
      alerts.unhideAnimationOption();
      const img = new Image();
      img.id = 'baseStand';
      img.className = 'video';
      img.src = 'video/noImage.png';
      document.getElementById('videos').appendChild(img);
      document.getElementById('videos').style.width = '660px';
      document.getElementById('preview-container').style.height = `760px`;
      document.getElementById('preview-container').style.width = ((typeof bubble !== 'undefined') ? `${660+bubble.width+gap}px` : '660px');
      generalForm.elements['base-video-name'].value = 'noImage';
      generalForm.elements['base-video-extension'].value = 'png';
      generalForm.querySelector(`[for='base-video-name']`).innerHTML = 'Base image:';
      for(let i=0; i < alertsForms.length; i++){
        const type = alertsForms[i].elements['select-preview'].value;
        alertsForms[i].querySelector(`[for='${type}-video']`).innerHTML = 'Image name:';
        alertsForms[i].elements[`${type}-video`].value = 'noImage';
        alertsForms[i].elements[`${type}-video-extension`].value = 'png';
      }
      if(generalForm.elements['activate-speech'].value == '1'){
        document.getElementById('textBubble').innerHTML = '<span>Hello,</span><span>how</span><span>are</span><span>you?!</span><span>Praise</span><span>me</span><span>!</span>';
        document.getElementById('textBubble').style.fontFamily = 'verdana';
        document.getElementById('textBubble').style.fontSize = '30px';
      }
      const alertsForm = document.getElementsByClassName('alerts-form');
      for(let i=0; i < alertsForm.length; i++){
        alertsForm[i].elements['select-preview'].checked = false;
        alertsForm[i].elements['select-preview'].removeAttribute('checked');
      }
      if(generalForm.elements['img-animation-activate'].checked) preview.changeMarginImage(generalForm.elements['img-animation-margin'].value);
    } else{
      alerts.hideAnimationOption();
      const video = document.createElement('video');
      video.id = 'baseStand';
      video.className = 'video';
      video.src = 'video/Basic.webm';
      video.loop = true;
      video.muted = true;
      document.getElementById('videos').appendChild(video);
      video.play();
      document.getElementById('videos').style.width = '660px';
      document.getElementById('preview-container').style.height = `760px`;
      document.getElementById('preview-container').style.width = ((typeof bubble !== 'undefined') ? `${660+bubble.width+gap}px` : '660px');
      generalForm.elements['base-video-name'].value = 'Basic';
      generalForm.elements['base-video-extension'].value = 'webm';
      generalForm.querySelector(`[for='base-video-name']`).innerHTML = 'Base Video:';
      for(let i=0; i < alertsForms.length; i++){
        const type = alertsForms[i].elements['select-preview'].value;
        alertsForms[i].querySelector(`[for='${type}-video']`).innerHTML = 'Video name:';
        if(type === 'template'){
          alertsForms[i].elements[`${type}-video`].value = 'resub';
        } else{
          alertsForms[i].elements[`${type}-video`].value = `${type.charAt(0).toUpperCase()+type.slice(1, -2)}`;
        }
        alertsForms[i].elements[`${type}-video-extension`].value = 'webm';
      }
      if(generalForm.elements['activate-speech'].value == '1'){
        document.getElementById('textBubble').innerHTML = '<span>Hello,</span><span>how</span><span>are</span><span>you?!</span><span>Praise</span><span>me</span><span>!</span>';
        document.getElementById('textBubble').style.fontFamily = 'verdana';
        document.getElementById('textBubble').style.fontSize = '30px';
      }
      const alertsForm = document.getElementsByClassName('alerts-form');
      for(let i=0; i < alertsForm.length; i++){
        alertsForm[i].elements['select-preview'].checked = false;
        alertsForm[i].elements['select-preview'].removeAttribute('checked');
      }
      preview.changeMarginImage(0);
    }
  };

  preview.changeMarginImage = function(value){
    document.getElementsByClassName('video')[0].style.marginTop = `${value}px`;
  };
}(window.preview = window.preview || {}));
