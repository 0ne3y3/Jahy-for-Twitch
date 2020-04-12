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

  /* OTHER */
  alerts.blankFillerChange = function(e){
    if(e.target.value > 0){
      document.getElementById('blank-filler-general-form').elements['blank-filler-general-time'].removeAttribute('disabled');
      let forms = document.getElementById('blank-filler-form-container').getElementsByTagName('FORM');
      if(e.target.value < forms.length){
        const container = document.getElementById('blank-filler-form-container');
        while(e.target.value < forms.length) container.removeChild(container.lastChild);
      } else if(e.target.value > forms.length){
        for(let i = forms.length; i < e.target.value; i++){
          const dupForm = alerts.duplicateForm(`blank-filler-${forms.length+1}`);
          document.getElementById('blank-filler-form-container').appendChild(dupForm);
          const p = document.createElement('P');
          p.className = 'separator';
          document.getElementById('blank-filler-form-container').appendChild(p);
        }
      }
    } else{
      if(e.target.value < 0) e.target.value = 0;
      document.getElementById('blank-filler-general-form').elements['blank-filler-general-time'].setAttribute('disabled', 'disabled');
      const container = document.getElementById('blank-filler-form-container');
      while(container.firstChild) container.removeChild(container.lastChild);
      container.innerHTML = '<p class="separator"></p><h2>Advanced</h2>';
    }
  };

  alerts.blankFillerRegex = function(bef, id){
    return bef.replace('template', id);
  };

  alerts.alertTextActivate = async function(e){
    const form = e.target.form;
    const type = form.dataset.type;
    const container = document.getElementById('textArea');
    if(e.target.checked){
      for(let i=0; i < form.elements.length; i++){
        if(form.elements[i] !== form.elements[`${type}-video`] && form.elements[i] !== form.elements['select-preview'] && form.elements[i] !== form.elements[`${type}-video-extension`] && form.elements[i] !== form.elements[`activate-alert-${type}`] && form.elements[i] !== form.elements[`${type}-text-activate`]){
            form.elements[i].removeAttribute('disabled');
        }
      }
      container.getElementsByTagName('IMG')[0].removeAttribute('hidden');
      const spans = container.getElementsByTagName('SPAN');
      for(let i=0; i < spans.length; i++) spans[i].removeAttribute('hidden');
      form.elements[`${type}-text`].dispatchEvent(new Event('blur'));
      form.elements[`${type}-font-size`].dispatchEvent(new Event('blur'));
      form.elements[`${type}-bubble-time`].dispatchEvent(new Event('blur'));
      form.elements[`${type}-text-time`].dispatchEvent(new Event('blur'));
      form.elements[`${type}-time-active`].dispatchEvent(new Event('blur'));
      form.elements[`${type}-bubble-name`].dispatchEvent(new Event('blur'));
      form.elements[`${type}-typo-name`].dispatchEvent(new Event('blur'));
    } else{
      for(let i=0; i < form.elements.length; i++){
        if(form.elements[i] !== form.elements[`${type}-video`] && form.elements[i] !== form.elements['select-preview'] && form.elements[i] !== form.elements[`${type}-video-extension`] && form.elements[i] !== form.elements[`activate-alert-${type}`] && form.elements[i] !== form.elements[`${type}-text-activate`]){
            form.elements[i].setAttribute('disabled', 'disabled');
        }
      }
      container.getElementsByTagName('IMG')[0].setAttribute('hidden', 'hidden');
      const spans = container.getElementsByTagName('SPAN');
      for(let i=0; i < spans.length; i++) spans[i].setAttribute('hidden', 'hidden');
    }
  };

  alerts.duplicateForm = function(id){
    const template = document.getElementById('template-form');
    const dupForm = template.cloneNode(true);
    dupForm.id = id;
    dupForm.dataset.type = id;
    dupForm.elements['select-preview'].value = id;
    const labels = dupForm.getElementsByTagName('LABEL');
    for (let j = 0; j < labels.length; j++){
      labels[j].setAttribute('for', alerts.blankFillerRegex(labels[j].getAttribute('for'), id));
    }
    const elements = dupForm.getElementsByTagName('INPUT');
    for (let j = 0; j < elements.length; j++){
      if(elements[j] !== elements[0]){
        elements[j].name = alerts.blankFillerRegex(elements[j].name, id);
      }
    }

    const select = dupForm.elements['select-preview'].value;
    dupForm.addEventListener('click', function(e){
      const form = e.currentTarget;
      if((!form.elements['select-preview'].checked || e.target.className === 'select-preview') && e.target.className !== 'activate-alert' && (!form.elements['activate-alert-subgift'] || form.elements['activate-alert-subgift'].checked === true) && (!form.elements['activate-alert-bomb'] || form.elements['activate-alert-bomb'].checked === true)){
        alerts.uncheckPreviewForms();
        alerts.checkPreviewForm(form);
        alerts.resetForm(form);
        preview.changeAnimation(form);
      }
    });
    dupForm.elements[`${select}-text`].addEventListener('blur', function(e){
      preview.changeText(e.target, e.target.parentNode.parentNode.parentNode.dataset.type, document.getElementById('username-select-container').elements['username-select'].value);
    });
    dupForm.elements[`${select}-font-size`].addEventListener('blur', function(e){
      preview.changeFontSize(e.target);
    });
    dupForm.elements[`${select}-bubble-time`].addEventListener('blur', function(e){
      if(e.target.value < 0){
        e.target.value = 1;
      }
    });
    dupForm.elements[`${select}-text-time`].addEventListener('blur', function(e){
      if(e.target.value < 0){
        e.target.value = 1;
      }
    });
    dupForm.elements[`${select}-time-active`].addEventListener('blur', function(e){
      if(e.target.value < 0){
        e.target.value = 1;
      }
    });
    dupForm.elements[`${select}-bubble-name`].addEventListener('blur', function(e){
      preview.changeBubble(e.target);
    });
    dupForm.elements[`${select}-typo-name`].addEventListener('blur', function(e){
      preview.changeFontFamily(e.target, e.target.parentNode.getElementsByClassName('extensions')[0]);
    });
    dupForm.elements[`${select}-typo-extension`].addEventListener('blur', function(e){
      preview.changeFontFamily(e.target.parentNode.getElementsByTagName('input')[0], e.target);
    });
    dupForm.elements[`${select}-video`].addEventListener('blur', function(e){
      if(document.getElementById('form-general').elements['video-image'].value === 'video'){
        preview.changeVideo(e.target, e.target.parentNode.getElementsByClassName('extensions')[0]);
      } else{
        preview.changeImage(e.target, e.target.parentNode.getElementsByClassName('extensions')[0]);
      }
    });
    dupForm.elements[`${select}-video-extension`].addEventListener('blur', function(e){
      if(document.getElementById('form-general').elements['video-image'].value === 'video'){
        preview.changeVideo(e.target.parentNode.getElementsByTagName('input')[0], e.target);
      } else{
        preview.changeImage(e.target.parentNode.getElementsByTagName('input')[0], e.target);
      }
    });
    dupForm.elements[`${select}-text-activate`].addEventListener('change', alerts.alertTextActivate);

    dupForm.removeAttribute('hidden');
    dupForm.getElementsByClassName('option-container')[0].removeAttribute('hidden');
    dupForm.elements['select-preview'].removeAttribute('hidden');

    return dupForm;
  };

}(window.alerts = window.alerts || {}));
