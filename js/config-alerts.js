'use strict';
(function(alerts){

  /* checkbox preview */
  alerts.uncheckPreviewForms = function(){
    const selectPreview = document.getElementsByClassName('select-preview');
    for(let i=0; i < selectPreview.length; i++){
      selectPreview[i].checked = false;
    }
  };

  alerts.checkPreviewForm = function(form){
    form.elements['select-preview'].checked = true;
  };

  /* video field */
  alerts.testVideo = function(name, extension){
    return new Promise((resolve, reject)=>{
      const video = document.createElement('video');
      video.src = `./video/${name.value}.${extension.value}`;
      video.onloadeddata = function(){
        resolve(video);
      };
      video.onerror = reject;
      video.load();
    });
  };

  alerts.testImage = function(name, extension){
    return new Promise((resolve, reject)=>{
      const img = new Image;
      img.onload = function(){
        resolve(img);
      };
      img.onerror = reject;
      img.src = `./video/${name.value}.${extension.value}`;
    });
  }

  alerts.errorVideo = function(name, extension){
    const generalForm = document.getElementById('form-general');
    name.className = `error-input`;
    extension.className = 'extensions error-input';
    if(name.parentNode.lastChild.tagName !== 'P'){
      let p = document.createElement('p');
      p.className = 'error-paragraph';
      p.textContent = ((generalForm.elements['video-image'].value === 'video') ? 'Video not found in "video" folder' : 'Image not found in "video" folder');
      name.parentNode.appendChild(p);
    }
  };

  /* text field */
  alerts.testText = function(text){
    return (text.value.trim()) ? true : false;
  };

  alerts.errorText = async function(text){
    text.className = 'error-input';
    if(text.parentNode.lastChild.tagName !== 'P'){
      let p = document.createElement('p');
      p.className = 'error-paragraph';
      p.textContent = 'Text can\'t be empty';
      text.parentNode.appendChild(p);
    }
    document.getElementById('textBubble').innerHTML = '<span>ERROR:</span><span>No</span><span>text</span><span>!</span>';
  };

  /* font family fields */
  alerts.testFontFamily = function(name, extension){
    let newFont = new FontFace('new-font', `url(typo/${name.value}.${extension.value})`);
    return newFont.load();
  };

  alerts.errorFontFamily = function(name, extension){
    name.className = `error-input`;
    extension.className = `extensions error-input`;
    if(name.parentNode.lastChild.tagName !== 'P'){
      let p = document.createElement('p');
      p.className = 'error-paragraph';
      p.textContent = 'Typography not found in "typo" folder';
      name.parentNode.appendChild(p);
    }
  };

  alerts.testBubble = function(name){
    return new Promise((resolve, reject)=>{
      let img = new Image();
      img.onload = function(){
        resolve(img);
      };
      img.onerror = reject;
      img.src = `./speechBubbles/${name.value}.png`;
    });
  };

  alerts.errorBubble = async function(name){
    name.className = `error-input`;
    if(name.parentNode.lastChild.tagName !== 'P'){
      let p = document.createElement('p');
      p.className = 'error-paragraph';
      p.textContent = 'Image not found in "speechBubbles" folder';
      name.parentNode.appendChild(p);
    }
  };

  alerts.testColorTextInput = function(target){
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

  alerts.errorColorTextInput = async function(err, target){
    let p;
    target.className = 'error-input';
    document.getElementById('textBubble').style.color = '#000000';
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

  alerts.activateAlert = function(e){
    const form = document.getElementById(`${e.target.value}-form`);
    if(e.target.checked){
      let formGeneral = document.getElementById('form-general');
      let type = form.dataset.type;
      for(let i=0; i < form.elements.length; i++){
        if(formGeneral.elements['activate-speech'].value == 0){
          if(form.elements[i] === form.elements[`${type}-video`] || form.elements[i] === form.elements['select-preview'] || form.elements[i] === form.elements[`${type}-video-extension`] && form.elements[i] !== form.elements[`activate-alert-${type}`]){
            form.elements[i].disabled = false;
          }
        } else{
          if(form.elements[i] !== e.target) form.elements[i].disabled = false;
        }
      }
    } else{
      for(let i=0; i < form.elements.length; i++){
        if(form.elements[i] !== e.target) form.elements[i].disabled = true;
      }
    }
  };

  /* form */
  alerts.resetForm = function(form){
    const inputs = form.getElementsByClassName('error-input');
    const errorMessages = form.getElementsByClassName('error-paragraph');
    while(inputs[0]){
      if(inputs[0].className === 'extensions error-input'){
        inputs[0].className = 'extensions';
      } else{
        inputs[0].removeAttribute('class');
      }
    }
    while (errorMessages[0]){
      errorMessages[0].remove();
    }
  };

  alerts.calculateTotalPreview = function(generalForm){
    let video = document.getElementsByClassName('video')[0];
    if(document.getElementById('form-general').elements['activate-speech'].value == '1'){
      let bubble = document.getElementsByClassName('bubbles')[0];
      let gap = generalForm.elements['gap-in-between'].value*-1;
      return ((video.tagName === 'VIDEO') ? video.videoWidth : video.width)+bubble.width+gap;
    } else{
      return ((video.tagName === 'VIDEO') ? video.videoWidth : video.width);
    }
  };

  alerts.unhideAnimationOption = function(){
    const container = document.getElementById('img-animation-container');
    for(let i = 0; i < container.children.length; i++){
      container.children[i].removeAttribute('hidden');
    }
    container.removeAttribute('hidden');
  };

  alerts.hideAnimationOption = function(){
    const container = document.getElementById('img-animation-container');
    for(let i = 0; i < container.children.length; i++){
      container.children[i].setAttribute('hidden', 'hidden');
    }
    container.setAttribute('hidden', 'hidden');
  };

  alerts.changeMarginTop = function(e){
    if(e.target.checked){
      e.target.nextSibling.removeAttribute('disabled');
      preview.changeMarginImage(e.target.nextSibling.value);
    } else{
      e.target.nextSibling.setAttribute('disabled', 'disabled');
      e.target.nextSibling.value = 0;
      preview.changeMarginImage(0);
    }
  };

}(window.alerts = window.alerts || {}));
