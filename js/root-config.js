'use strict';
/* DOM READY */
window.onload = function(){
  /* LOADING DOM IN NAMESPACE */
  preview.domLoad();

  /* Username selection */
  const usernameSelect = document.getElementById('username-select-container');
  for(let i = 0; i < usernameSelect.elements['username-select'].length; i++){
    usernameSelect.elements['username-select'][i].addEventListener('change', function(e){
      const alertsForm = document.getElementsByClassName('alerts-form');
      if(e.target.checked){
        let text;
        let type;
        for(let i=0; i < alertsForm.length; i++){
          if(alertsForm[i].elements['select-preview'].checked){
            text = alertsForm[i].elements[`${alertsForm[i].elements['select-preview'].value}-text`];
            type = alertsForm[i].dataset.type;
          }
        }
        if(typeof text !== 'undefined') preview.changeText(text, type, e.target.value);
      }
    });
  }

  /* NAVIGATION */
  /* Clicking on a nav1 button */
  const buttonsNav1 = document.getElementsByClassName('nav-button-1');
  for(let i=0; i < buttonsNav1.length; i++){
    buttonsNav1[i].addEventListener('click', function(e){
      if(e.currentTarget.id === 'nav-tutorial') return;

      const buttonsNav1 = document.getElementsByClassName('nav-button-1');
      for(let i=0; i < buttonsNav1.length; i++){
        buttonsNav1[i].className = 'nav-button-1';
      }
      e.currentTarget.className += ' nav-active';

      const tabs = document.getElementsByClassName('tabs');
      for(let i=0; i < tabs.length; i++){
        tabs[i].setAttribute('hidden', 'hidden');
      }
      const buttonsNav2 = document.getElementsByClassName('nav-button-2');
      switch(e.currentTarget.id){
        case 'nav-streamlabs':
          buttonsNav2[0].className = 'nav-button-2 nav-active';
          buttonsNav2[0].removeAttribute('hidden');
          buttonsNav2[1].className = 'nav-button-2';
          buttonsNav2[1].removeAttribute('hidden');
          buttonsNav2[2].className = 'nav-button-2';
          buttonsNav2[2].removeAttribute('hidden');
          document.getElementById('general').removeAttribute('hidden');
          break;
        case 'nav-twitch-chat':
          for(let i=0; i < buttonsNav2.length; i++){
            buttonsNav2[i].setAttribute('hidden', 'hidden');
          }
          document.getElementById('twitch-chat').removeAttribute('hidden');
          break;
        case 'nav-others':
          for(let i=0; i < buttonsNav2.length; i++){
            buttonsNav2[i].setAttribute('hidden', 'hidden');
          }
          document.getElementById('others').removeAttribute('hidden');
          break;
      }
    });
  }

  /* Clicking on a nav2 button */
  const buttonsNav2 = document.getElementsByClassName('nav-button-2');
  for(let i=0; i < buttonsNav2.length; i++){
    buttonsNav2[i].addEventListener('click', function(e){
      const buttonsNav2 = document.getElementsByClassName('nav-button-2');
      for(let i=0; i < buttonsNav2.length; i++){
        buttonsNav2[i].className = 'nav-button-2';
      }
      e.currentTarget.className += ' nav-active';

      const tabs = document.getElementsByClassName('tabs');
      for(let i=0; i < tabs.length; i++){
        tabs[i].setAttribute('hidden', 'hidden');
      }

      switch(e.currentTarget.id){
        case 'nav-general':
          document.getElementById('general').removeAttribute('hidden');
          break;
        case 'nav-advanced':
          document.getElementById('advanced').removeAttribute('hidden');
          break;
        case 'nav-variation':
          document.getElementById('subgift-and-bomb').removeAttribute('hidden');
          break;
      }
    });
  }

  /* GENERAL FORM */
  const generalForm = document.getElementById('form-general');

  /* gap-in-between field, calculate the max width */
  generalForm.elements['gap-in-between'].addEventListener('change', function(e){
    const videosContainer = document.getElementById('videos');
    const textAreaContainer = document.getElementById('textArea');
    if(generalForm.elements['place-speech'].value === 'left') videosContainer.style.marginLeft = `${e.target.value*-1}px`;
    if(generalForm.elements['place-speech'].value === 'right') textAreaContainer.style.marginLeft = `${e.target.value*-1}px`;
    document.getElementById('preview-container').style.width = `${alerts.calculateTotalPreview(generalForm)}px`;
  });

  generalForm.elements['color-text'].addEventListener('blur', function(e){
    const err = alerts.testColorTextInput(e.target);
    if(err === 'ok'){
      if(e.target.className === 'error-input'){
        e.target.removeAttribute('class');
        e.target.nextSibling.remove();
      }
      document.getElementById('textBubble').style.color = e.target.value;
    } else{
      alerts.errorColorTextInput(err, e.target);
    }
  });

  for(let i = 0; i < generalForm.elements['shadow-text'].length; i++){
    generalForm.elements['shadow-text'][i].addEventListener('change', function(e){
      if(e.target.checked) preview.changeShadow(e.target.value);
    });
  }

  for(let i = 0; i < generalForm.elements['place-speech'].length; i++){
    generalForm.elements['place-speech'][i].addEventListener('change', function(e){
      if(e.target.checked) preview.changeSpeechPlace(e.target.value);
    });
  }

  for(let i = 0; i < generalForm.elements['activate-speech'].length; i++){
    generalForm.elements['activate-speech'][i].addEventListener('change', function(e){
      if(e.target.checked) preview.activateBubbleSpeech(e.target.value);
    });
  }

  generalForm.elements['interval-time'].addEventListener('blur', function(e){
    if(e.target.value < 1) e.target.value = 5;
  });

  generalForm.elements['margin-text-top'].addEventListener('change', function(e){
    document.getElementById('textBubble').style.marginTop = `${e.target.value}px`;
  });

  generalForm.elements['center-text'].addEventListener('change', function(e){
    document.getElementById('textBubble').style.paddingLeft = `${e.target.value}px`;
    document.getElementById('textBubble').style.paddingRight = `${e.target.value}px`;
    let textContainer = document.getElementById('textArea');
    if(!textContainer.style.width) textContainer.style.width = `${textContainer.getElementsByClassName('bubbles')[0].width}px`;
    document.getElementById('textBubble').style.width = `${preview.calculateWidth(textContainer)}px`;
  });

  generalForm.elements['base-video-name'].addEventListener('blur', function(e){
    if(generalForm.elements['video-image'].value === 'video'){
      preview.changeVideo(e.target, e.target.parentNode.getElementsByTagName('input')[1]);
    } else{
      preview.changeImage(e.target, e.target.parentNode.getElementsByTagName('input')[1]);
    }
    if(generalForm.elements['activate-speech'].value == '1'){
      document.getElementById('textBubble').innerHTML = '<span>Hello,</span><span>how</span><span>are</span><span>you?!</span><span>Praise</span><span>me</span><span>!</span>';
      document.getElementById('textBubble').style.fontFamily = 'verdana';
      document.getElementById('textBubble').style.fontSize = '30px';
    }
    const alertsForm = document.getElementsByClassName('alerts-form');
    document.getElementById('textArea').getElementsByTagName('IMG')[0].removeAttribute('hidden');
    for(let i=0; i < alertsForm.length; i++){
      alertsForm[i].elements['select-preview'].checked = false;
      alertsForm[i].elements['select-preview'].removeAttribute('checked');
    }
  });

  generalForm.elements['base-video-extension'].addEventListener('blur', function(e){
    if(generalForm.elements['video-image'].value === 'video'){
      preview.changeVideo(e.target.parentNode.getElementsByTagName('input')[0], e.target);
    } else{
      preview.changeImage(e.target.parentNode.getElementsByTagName('input')[0], e.target);
    }
    document.getElementById('textBubble').innerHTML = '<span>Hello,</span><span>how</span><span>are</span><span>you?!</span><span>Praise</span><span>me</span><span>!</span>';
    document.getElementById('textBubble').style.fontFamily = 'verdana';
    document.getElementById('textBubble').style.fontSize = '30px';
  });

  for(let i=0; i < generalForm.elements['video-image'].length; i++){
    generalForm.elements['video-image'][i].addEventListener('change', function(e){
      if(e.target.checked) preview.changeMedia(e.target.value);
    });
  }

  generalForm.elements['img-animation-activate'].addEventListener('change', alerts.changeMarginTop);
  generalForm.elements['img-animation-margin'].addEventListener('change', function(e){
    preview.changeMarginImage(e.target.value);
  });

  /* ALERTS FORM */
  /* Clicking on a alert form */
  const alertsForm = document.getElementsByClassName('alerts-form');
  for(let i = 0; i < alertsForm.length; i++){
    if(alertsForm[i].id === 'template-form') continue;
    const select = alertsForm[i].elements['select-preview'].value;
    alertsForm[i].addEventListener('click', function(e){
      const form = e.currentTarget;
      if((!form.elements['select-preview'].checked || e.target.className === 'select-preview') && e.target.className !== 'activate-alert' && (form.dataset.type !== 'subgift' || document.getElementById('subgift-activation-form').elements['activate-alert-subgift'].checked) && (form.dataset.type !== 'subbomb' || document.getElementById('subbomb-activation-form').elements['activate-alert-subbomb'].checked)){
        alerts.uncheckPreviewForms();
        alerts.checkPreviewForm(form);
        alerts.resetForm(form);
        preview.changeAnimation(form);
      }
    });

    alertsForm[i].elements[`${select}-text`].addEventListener('blur', function(e){
      preview.changeText(e.target, e.target.parentNode.parentNode.parentNode.dataset.type, document.getElementById('username-select-container').elements['username-select'].value);
    });

    alertsForm[i].elements[`${select}-font-size`].addEventListener('blur', function(e){
      preview.changeFontSize(e.target);
    });

    alertsForm[i].elements[`${select}-bubble-time`].addEventListener('blur', function(e){
      if(e.target.value < 0){
        e.target.value = 1;
      }
    });

    alertsForm[i].elements[`${select}-text-time`].addEventListener('blur', function(e){
      if(e.target.value < 0){
        e.target.value = 1;
      }
    });

    alertsForm[i].elements[`${select}-time-active`].addEventListener('blur', function(e){
      if(e.target.value < 0){
        e.target.value = 1;
      }
    });

    alertsForm[i].elements[`${select}-bubble-name`].addEventListener('blur', function(e){
      preview.changeBubble(e.target);
    });

    alertsForm[i].elements[`${select}-typo-name`].addEventListener('blur', function(e){
      preview.changeFontFamily(e.target, e.target.parentNode.getElementsByClassName('extensions')[0]);
    });

    alertsForm[i].elements[`${select}-typo-extension`].addEventListener('blur', function(e){
      preview.changeFontFamily(e.target.parentNode.getElementsByTagName('input')[0], e.target);
    });

    alertsForm[i].elements[`${select}-video`].addEventListener('blur', function(e){
      if(document.getElementById('form-general').elements['video-image'].value === 'video'){
        preview.changeVideo(e.target, e.target.parentNode.getElementsByClassName('extensions')[0]);
      } else{
        preview.changeImage(e.target, e.target.parentNode.getElementsByClassName('extensions')[0]);
      }
    });

    alertsForm[i].elements[`${select}-video-extension`].addEventListener('blur', function(e){
      if(document.getElementById('form-general').elements['video-image'].value === 'video'){
        preview.changeVideo(e.target.parentNode.getElementsByTagName('input')[0], e.target);
      } else{
        preview.changeImage(e.target.parentNode.getElementsByTagName('input')[0], e.target);
      }
    });
    alertsForm[i].elements[`${select}-text-activate`].addEventListener('change', alerts.alertTextActivate);

    const variationForm = document.getElementById(`${alertsForm[i].dataset.type}-variation-form`);
    variationForm.elements[`${alertsForm[i].dataset.type}-variation-number`].addEventListener('change', alerts.variationChange);
  }

  /* SUBGIFT-BOMB FORM */
  const subgiftBombActivate = document.getElementsByClassName('activate-alert');
  for(let i=0; i < subgiftBombActivate.length; i++){
    subgiftBombActivate[i].addEventListener('change', alerts.activateAlert);
  }

  /* CONFIGURATION */
  document.getElementById('config-load').addEventListener('click', configFunctions.loadConfig);
  document.getElementById('config-generate').addEventListener('click', configFunctions.generateConfig);

  /* OTHERS */
  const generalBlank = document.getElementById('blank-filler-general-form');
  generalBlank.elements['blank-filler-number'].addEventListener('change', alerts.blankFillerChange);
};

/* When scrolling  */
window.onscroll = function(){
  if(window.scrollY >= 0){
    document.getElementById('preview').style.marginTop = `${window.scrollY}px`;
  } else{
    document.getElementById('preview').style.marginTop = `0px`;
  }
};
