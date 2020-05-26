'use strict';
(function(generateLoad){

  configFunctions.loadConfig = async function(e){
    const configScript = document.createElement('script');
    configScript.onload = function(){
      if(typeof config !== 'undefined'){
        const bubbleText = document.getElementById('textBubble');
        const generalForm = document.getElementById('form-general');
        const alertsForms = document.getElementsByClassName('alerts-form');
        generalForm.elements['streamlabs-token'].value = config.general.token;
        if(config.general.videoimage === 'video'){
          document.getElementById('vimg-video').checked = true;
          document.getElementById('vimg-image').checked = false;
          generalForm.elements['img-animation-activate'].checked = false;
          generalForm.elements['img-animation-margin'].value = 0;
          alerts.hideAnimationOption();
          generalForm.elements['img-animation-margin'].setAttribute('disabled', 'disabled');
        } else{
          if(config.general.activateImgAnimation){
            generalForm.elements['img-animation-activate'].checked = true;
            generalForm.elements['img-animation-margin'].value = config.general.marginImgAnimation.slice(0,-2);
          } else{
            generalForm.elements['img-animation-activate'].checked = false;
            generalForm.elements['img-animation-margin'].value = 0;
          }
          alerts.unhideAnimationOption();
          generalForm.elements['img-animation-margin'].removeAttribute('disabled');
          document.getElementById('vimg-video').checked = false;
          document.getElementById('vimg-image').checked = true;
        }
        if(config.general.activateSpeech){
          document.getElementById('activate-speech-yes').checked = true;
          document.getElementById('activate-speech-no').checked = false;
        } else{
          document.getElementById('activate-speech-no').checked = true;
          document.getElementById('activate-speech-yes').checked = false;
        }

        if(config.twitch.general.activate){
          const twitchGeneralForm = document.getElementById('form-twitch-general');
          twitchGeneralForm.elements['twitch-activate'].checked = true;
          twitchGeneralForm.elements['twitch-activate'].dispatchEvent(new Event('change'));
          twitchGeneralForm.elements['twitch-name'].value = config.twitch.general.botName;
          twitchGeneralForm.elements['twitch-password'].value = config.twitch.general.botPassword;
          twitchGeneralForm.elements['twitch-channel'].value = config.twitch.general.botChannel;
          document.getElementById('twitch-chat-form-number').elements['twitch-chat-number'].value = config.twitch.regex.length;
          document.getElementById('twitch-chat-form-number').elements['twitch-chat-number'].dispatchEvent(new Event('change'));
        }

        const blankGeneral = document.getElementById('blank-filler-general-form');
        blankGeneral.elements['blank-filler-general-time'].value = config.general.blankTime;
        blankGeneral.elements['blank-filler-number'].value = config.general.blankNumber;
        blankGeneral.elements['blank-filler-number'].dispatchEvent(new Event('change'));

        const regexChat = /^twitch/;
        const regexGreet = /^greet/;
        const regexBall = /^8ball/;
        const regexOdd = /^oddeven/;
        let variationsForm = document.getElementsByClassName('variation-form');
        for(let i=0; i < variationsForm.length; i++){
          const type = variationsForm[i].dataset.type;
          if(config.general[`${type}VariationNumber`] > 1 && (!regexChat.test(type) || !regexGreet.test(type) || !regexBall.test(type) || !regexOdd.test(type))){
            variationsForm[i].elements[`${type}-variation-number`].value = config.general[`${type}VariationNumber`]-1;
            variationsForm[i].elements[`${type}-variation-number`].dispatchEvent(new Event('change'));
          } else if(config.twitch.general.activate && (regexChat.test(type) || regexGreet.test(type) || regexBall.test(type) || regexOdd.test(type)) && config.twitch.general[`${type}VariationNumber`] > 1){
            variationsForm[i].elements[`${type}-variation-number`].value = config.twitch.general[`${type}VariationNumber`]-1;
            variationsForm[i].elements[`${type}-variation-number`].dispatchEvent(new Event('change'));
          }
        }

        document.getElementById('subgift-activation-form').elements['activate-alert-subgift'].checked = config.general.subgiftActivate;
        if(config.twitch.general.activate){
          const twitchRegexForm = document.getElementById('twitch-chat-alerts').getElementsByClassName('regex-form');
          for(let i=0; i < twitchRegexForm.length; i++){
            const regex = /^\^/;
            const alert = config.twitch.regex.find(configRegex => configRegex.id === twitchRegexForm[i].dataset.type);
            if(regex.test(alert.regex)){
              twitchRegexForm[i].elements[`${twitchRegexForm[i].dataset.type}-regex-option`].value = 'start';
              twitchRegexForm[i].elements[`${twitchRegexForm[i].dataset.type}-regex`].value = alert.regex.slice(1,alert.regex.length);
            } else{
              twitchRegexForm[i].elements[`${twitchRegexForm[i].dataset.type}-regex-option`].value = 'contain';
              twitchRegexForm[i].elements[`${twitchRegexForm[i].dataset.type}-regex`].value = alert.regex;
            }
            twitchRegexForm[i].elements[`${twitchRegexForm[i].dataset.type}-timeout`].value = alert.timeOut;
            twitchRegexForm[i].elements[`${twitchRegexForm[i].dataset.type}-afterTrigger-option`].value = alert.command;
            if(alert.command === 'respond'){
              twitchRegexForm[i].elements[`${twitchRegexForm[i].dataset.type}-message`].value = alert.message;
            } else if (alert.command === 'ban'){
              twitchRegexForm[i].elements[`${twitchRegexForm[i].dataset.type}-ban-time`].value = alert.banTime;
            }
            twitchRegexForm[i].elements[`${twitchRegexForm[i].dataset.type}-afterTrigger-option`].dispatchEvent(new Event('change'));
          }
          document.getElementById('greet-activation-form').elements['activate-alert-greet'].checked = config.twitch.general.greetActivate;
          document.getElementById('8ball-activation-form').elements['activate-alert-8ball'].checked = config.twitch.general.ballActivate;
          document.getElementById('oddeven-activation-form').elements['activate-alert-oddeven'].checked = config.twitch.general.oddevenActivate;
        }

        if(config.general.activateSpeech){
          if(config.general.placeSpeech === 'right'){
            document.getElementById('place-speech-right').checked = true;
            document.getElementById('place-speech-left').checked = false;
          } else{
            document.getElementById('place-speech-right').checked = false;
            document.getElementById('place-speech-left').checked = true;
          }
          if(config.general.placeSpeech === 'right') document.getElementById('textArea').style.marginLeft = config.general.gapInbetween;
          if(config.general.placeSpeech === 'left') document.getElementById('videos').style.marginLeft = config.general.gapInbetween;
          bubbleText.style.paddingLeft = config.general.centerText;
          bubbleText.style.paddingRight = config.general.centerText;
          bubbleText.style.marginTop = config.general.marginTextTop;
          generalForm.elements['color-text'].value = config.general.colorText;
          if(config.general.shadowText){
            document.getElementById('shadow-on').checked = true;
            document.getElementById('shadow-off').checked = false;
          } else{
            document.getElementById('shadow-off').checked = true;
            document.getElementById('shadow-on').checked = false;
          }

          generalForm.elements['margin-text-top'].value = config.general.marginTextTop.slice(0,-2);
          generalForm.elements['center-text'].value = config.general.centerText.slice(0,-2);
          generalForm.elements['gap-in-between'].value = config.general.gapInbetween.slice(0,-2);
        }
        let video = configFunctions.getNameExtension(config.general.baseVideo);
        generalForm.elements['base-video-name'].value = video[0];
        generalForm.elements['base-video-extension'].value = video[1];
        generalForm.elements['interval-time'].value = config.general.intervalTime;
        for(let i=0; i < alertsForms.length; i++){
          let form = alertsForms[i];
          let type = form.elements['select-preview'].value;
          if(type === 'template') continue;
          let configAlert = config.alerts.find(alert => alert.type === type);
          if(!configAlert) continue;
          form.elements[`${type}-text-activate`].checked = configAlert.activateSpeech;
          if(config.general.activateSpeech && (typeof configAlert.activate == 'undefined' || configAlert.activate === true) && configAlert.activateSpeech){
            form.elements[`${type}-text`].value = configAlert.textBase;
            form.elements[`${type}-font-size`].value = configAlert.fontSize.slice(0, -2);
            form.elements[`${type}-bubble-time`].value = configAlert.bubbleTime;
            form.elements[`${type}-text-time`].value = configAlert.textTime;
            form.elements[`${type}-time-active`].value = configAlert.timeActive;
            form.elements[`${type}-bubble-name`].value = configAlert.bubbleId;
            let typo = configFunctions.getNameExtension(configAlert.typography);
            form.elements[`${type}-typo-name`].value = typo[0];
            form.elements[`${type}-typo-extension`].value = typo[1];
          }
          let video = configFunctions.getNameExtension(configAlert.video);
          form.elements[`${type}-video`].value = video[0];
          form.elements[`${type}-video-extension`].value = video[1];
          if(!configAlert.activateSpeech) form.elements[`${type}-text-activate`].dispatchEvent(new Event('change'));
        }
        (config.general.activateSpeech) ? preview.activateBubbleSpeech(1) : preview.activateBubbleSpeech(0);
        if(config.general.activateSpeech){
          preview.changeSpeechPlace(config.general.placeSpeech);
          generalForm.elements['color-text'].dispatchEvent(new Event('blur'));
          (config.general.shadowText) ? preview.changeShadow('ON') : preview.changeShadow('OFF');
        }
        document.getElementById('subgift-activation-form').elements['activate-alert-subgift'].dispatchEvent(new Event('change'));
        document.getElementById('greet-activation-form').elements['activate-alert-greet'].dispatchEvent(new Event('change'));
        document.getElementById('8ball-activation-form').elements['activate-alert-8ball'].dispatchEvent(new Event('change'));
        document.getElementById('oddeven-activation-form').elements['activate-alert-oddeven'].dispatchEvent(new Event('change'));
        setTimeout(()=>{
          generalForm.elements['base-video-name'].dispatchEvent(new Event('blur'));
        }, 20);
      } else{
        let grey = document.createElement('div');
        grey.className = 'grey';
        let div = document.createElement('div');
        div.className = 'error-container';
        let p = document.createElement('p');
        p.textContent = 'No config to load in config.js.';
        let button = document.createElement('button');
        button.id = 'ok-button';
        button.textContent = 'OK';
        button.addEventListener('click', function(e){
          e.target.parentNode.parentNode.remove();
        });
        div.appendChild(p);
        div.appendChild(button);
        grey.appendChild(div);
        document.body.appendChild(grey);
      }
    };
    configScript.onerror = function(){
      let grey = document.createElement('div');
      grey.className = 'grey';
      let div = document.createElement('div');
      div.className = 'error-container';
      let p = document.createElement('p');
      p.textContent = 'No file config.js founded.';
      let button = document.createElement('button');
      button.id = 'ok-button';
      button.textContent = 'OK';
      button.addEventListener('click', function(e){
        e.target.parentNode.parentNode.remove();
      });
      div.appendChild(p);
      div.appendChild(button);
      grey.appendChild(div);
      document.body.appendChild(grey);
    };
    configScript.type = "text/javascript";
    configScript.src = 'config.js';
    document.body.appendChild(configScript);
  };

  configFunctions.getNameExtension = function(name){
    const reg1 = /[a-zA-Z0-9-_\s]*/g;
    const reg2 = /\.[a-zA-Z0-9-]*/g;
    const match1 = name.match(reg1);
    const match2 = name.match(reg2);
    return [match1[0], match2[0].slice(1)];
  };

  configFunctions.generateConfig = async function(e){
    let config = {};
    let errorConfig = false;
    let test;
    config.general = {};
    config.alerts = [];
    config.twitch = {};
    config.twitch.general = {};
    config.twitch.regex = [];
    const bubbleText = document.getElementById('textBubble');
    const generalForm = document.getElementById('form-general');
    const alertsForms = document.getElementsByClassName('alerts-form');
    const generalBlank = document.getElementById('blank-filler-general-form');
    const variationForms = document.getElementsByClassName('variation-form');
    const generalTwitch = document.getElementById('form-twitch-general');
    const regexChat = /^twitch/;
    const regexGreet = /^greet/;
    const regexBall = /^8ball/;
    const regexOdd = /^oddeven/;

    if(generalForm.elements['streamlabs-token'].value.trim() != ''){
      config.general.token = generalForm.elements['streamlabs-token'].value.trim();
      generalForm.elements['streamlabs-token'].removeAttribute('class');
    } else{
      errorConfig = true;
      generalForm.elements['streamlabs-token'].className = 'error-input';
    }

    config.general.activateSpeech = ((generalForm.elements['activate-speech'].value == '1') ? true : false);
    if(config.general.activateSpeech){
      config.general.placeSpeech = generalForm.elements['place-speech'].value;
      test = alerts.testColorTextInput(generalForm.elements['color-text']);
      if(test === 'ok'){
        if(generalForm.elements['color-text'].className === 'error-input') generalForm.elements['color-text'].removeAttribute('class');
        if(generalForm.elements['color-text'].nextSibling.tagName === 'P') generalForm.elements['color-text'].nextSibling.remove();
        config.general.colorText = generalForm.elements['color-text'].value;
      } else{
        errorConfig = true;
        alerts.errorColorTextInput(test, generalForm.elements['color-text']);
      }
      config.general.shadowText = ((generalForm.elements['shadow-text'].value == 'ON') ? true : false);
      config.general.marginTextTop = `${generalForm.elements['margin-text-top'].value}px`;
      config.general.centerText = `${generalForm.elements['center-text'].value}px`;
      config.general.gapInbetween = `${generalForm.elements['gap-in-between'].value}px`;
    } else{
      config.general.colorText = '#000000';
      config.general.placeSpeech = 'right';
      config.general.shadowText = false;
      config.general.marginTextTop = '0px';
      config.general.centerText = '0px';
      config.general.gapInbetween = `0px`;
    }

    config.general.videoimage = generalForm.elements['video-image'].value;
    if(config.general.videoimage === 'video'){
      await alerts.testVideo(generalForm.elements['base-video-name'], generalForm.elements['base-video-extension']).catch(()=>{
        errorConfig = true;
        alerts.errorVideo(generalForm.elements['base-video-name'], generalForm.elements['base-video-extension']);
      });
      config.general.activateImgAnimation = false;
      config.general.marginImgAnimation = '0px';
    } else{
      await alerts.testImage(generalForm.elements['base-video-name'], generalForm.elements['base-video-extension']).catch(()=>{
        errorConfig = true;
        alerts.errorVideo(generalForm.elements['base-video-name'], generalForm.elements['base-video-extension']);
      });
      if(generalForm.elements['img-animation-activate'].checked){
        config.general.activateImgAnimation = true;
        config.general.marginImgAnimation = `${generalForm.elements['img-animation-margin'].value}px`;
      } else{
        config.general.activateImgAnimation = false;
        config.general.marginImgAnimation = '0px';
      }
    }

    config.general.baseVideo = `${generalForm.elements['base-video-name'].value}.${generalForm.elements['base-video-extension'].value}`;

    config.general.intervalTime = ((Number(generalForm.elements['interval-time'].value)) ? Number(generalForm.elements['interval-time'].value) : 5);
    let width = document.getElementById('preview-container').style.width;
    let height = document.getElementById('preview-container').style.height;
    width = ((width == '') ? '1245px' : width);
    height = ((height == '') ? '760px' : height);
    config.general.width = `${width}`;
    config.general.height = `${height}`;

    if(generalBlank.elements['blank-filler-number'].value > 0){
      config.general.blankTime = Number(generalBlank.elements['blank-filler-general-time'].value);
      config.general.blankNumber = Number(generalBlank.elements['blank-filler-number'].value);
    } else{
      config.general.blankTime = 0;
      config.general.blankNumber = 0;
    }

    for(let i=0; i < variationForms.length; i++){
      if(generalTwitch.elements['twitch-activate'].checked && (regexChat.test(variationForms[i].dataset.type) || regexGreet.test(variationForms[i].dataset.type) || regexBall.test(variationForms[i].dataset.type) || regexOdd.test(variationForms[i].dataset.type))){
        config.twitch.general[`${variationForms[i].dataset.type}VariationNumber`] = Number(variationForms[i].elements[`${variationForms[i].dataset.type}-variation-number`].value)+1;
      } else if(!regexChat.test(variationForms[i].dataset.type) && !regexGreet.test(variationForms[i].dataset.type) && !regexBall.test(variationForms[i].dataset.type) && variationForms[i].dataset.type !== 'templateTwitch' && !regexOdd.test(variationForms[i].dataset.type)){
        config.general[`${variationForms[i].dataset.type}VariationNumber`] = Number(variationForms[i].elements[`${variationForms[i].dataset.type}-variation-number`].value)+1;
      }
    }

    if(generalTwitch.elements['twitch-activate'].checked){
      config.twitch.general.activate = true;
      if(generalTwitch.elements['twitch-name'].value.trim() != ''){
        config.twitch.general.botName = generalTwitch.elements['twitch-name'].value.trim();
        generalTwitch.elements['twitch-name'].removeAttribute('class');
      } else{
        errorConfig = true;
        generalTwitch.elements['twitch-name'].className = 'error-input';
      }
      if(generalTwitch.elements['twitch-password'].value.trim() != ''){
        config.twitch.general.botPassword = generalTwitch.elements['twitch-password'].value.trim();
        generalTwitch.elements['twitch-password'].removeAttribute('class');
      } else{
        errorConfig = true;
        generalTwitch.elements['twitch-password'].className = 'error-input';
      }
      if(generalTwitch.elements['twitch-channel'].value.trim() != ''){
        config.twitch.general.botChannel = generalTwitch.elements['twitch-channel'].value.trim();
        generalTwitch.elements['twitch-channel'].removeAttribute('class');
      } else{
        errorConfig = true;
        generalTwitch.elements['twitch-channel'].className = 'error-input';
      }
    } else{
      config.twitch.general.activate = false;
    }

    for(let i = 0; i < alertsForms.length; i++){
      let alert = {};
      alert.type = alertsForms[i].elements['select-preview'].value;
      if(alert.type === 'template' || (!generalTwitch.elements['twitch-activate'].checked && (regexChat.test(alert.type) || regexGreet.test(alert.type) || regexBall.test(alert.type) || regexOdd.test(alert.type)))) continue;
      if(alert.type === 'greet-1'){
        config.twitch.general[`${alertsForms[i].dataset.type}Activate`] = document.getElementById(`${alertsForms[i].dataset.type}-activation-form`).elements[`activate-alert-${alertsForms[i].dataset.type}`].checked;
      } else if(alert.type === '8ball-1'){
        config.twitch.general[`ballActivate`] = document.getElementById(`${alertsForms[i].dataset.type}-activation-form`).elements[`activate-alert-${alertsForms[i].dataset.type}`].checked;
      } else if(alert.type === 'oddeven-1'){
        config.twitch.general[`oddevenActivate`] = document.getElementById(`${alertsForms[i].dataset.type}-activation-form`).elements[`activate-alert-${alertsForms[i].dataset.type}`].checked;
      }
      if((regexGreet.test(alert.type) && !config.twitch.general.greetActivate) || (regexBall.test(alert.type) && !config.twitch.general.ballActivate)) continue;
      if(alert.type === 'subgift-1' || alert.type === 'bomb-1'){
        config.general[`${alertsForms[i].dataset.type}Activate`] = document.getElementById(`${alertsForms[i].dataset.type}-activation-form`).elements[`activate-alert-${alertsForms[i].dataset.type}`].checked;
      }
      if(!config.general[`${alertsForms[i].dataset.type}Activate`] && alertsForms[i].dataset.type === 'subgift') continue;
      if(config.general.activateSpeech && (typeof alert.activate == 'undefined' || alert.activate === true) && alertsForms[i].elements[`${alert.type}-text-activate`].checked){
        alert.activateSpeech = true;
        if(alerts.testText(alertsForms[i].elements[`${alert.type}-text`])){
          alert.text = alertsForms[i].elements[`${alert.type}-text`].value;
        } else{
          errorConfig = true;
          alerts.errorText(alertsForms[i].elements[`${alert.type}-text`]);
        }

        alert.fontSize = (alertsForms[i].elements[`${alert.type}-font-size`].value > 0) ? `${alertsForms[i].elements[`${alert.type}-font-size`].value}px` : '45px';

        alert.bubbleTime = Number(alertsForms[i].elements[`${alert.type}-bubble-time`].value);
        alert.textTime = Number(alertsForms[i].elements[`${alert.type}-text-time`].value);
        alert.timeActive = (Number(alertsForms[i].elements[`${alert.type}-time-active`].value) >= 1) ? Number(alertsForms[i].elements[`${alert.type}-time-active`].value) : 1;

        await alerts.testBubble(alertsForms[i].elements[`${alert.type}-bubble-name`]).catch(()=>{
          errorConfig = true;
          alerts.errorBubble(alertsForms[i].elements[`${alert.type}-bubble-name`]);
        });
        alert.bubbleName = `${alertsForms[i].elements[`${alert.type}-bubble-name`].value}.png`;
        alert.bubbleId = alertsForms[i].elements[`${alert.type}-bubble-name`].value;

        await alerts.testFontFamily(alertsForms[i].elements[`${alert.type}-typo-name`], alertsForms[i].elements[`${alert.type}-typo-extension`]).catch(()=>{
          errorConfig = true;
          alerts.errorFontFamily(alertsForms[i].elements[`${alert.type}-typo-name`], alertsForms[i].elements[`${alert.type}-typo-extension`]);
        });
        alert.typography = `${alertsForms[i].elements[`${alert.type}-typo-name`].value}.${alertsForms[i].elements[`${alert.type}-typo-extension`].value}`;
        alert.typographyId = alertsForms[i].elements[`${alert.type}-typo-name`].value;
      } else{
        alert.text = '';
        alert.bubbleTime = 0;
        alert.textTime = 0;
        alert.timeActive = 0;
        alert.bubbleName = '';
        alert.bubbleId = '';
        alert.fontSize = '';
        alert.typography = '';
        alert.typographyId = '';
        alert.activateSpeech = false;
      }
      if(config.general.videoimage === 'video'){
        await alerts.testVideo(alertsForms[i].elements[`${alert.type}-video`], alertsForms[i].elements[`${alert.type}-video-extension`]).catch(()=>{
          errorConfig = true;
          alerts.errorVideo(alertsForms[i].elements[`${alert.type}-video`], alertsForms[i].elements[`${alert.type}-video-extension`]);
        });
      } else{
        await alerts.testImage(alertsForms[i].elements[`${alert.type}-video`], alertsForms[i].elements[`${alert.type}-video-extension`]).catch(()=>{
          errorConfig = true;
          alerts.errorVideo(alertsForms[i].elements[`${alert.type}-video`], alertsForms[i].elements[`${alert.type}-video-extension`]);
        });
      }
      alert.video = `${alertsForms[i].elements[`${alert.type}-video`].value}.${alertsForms[i].elements[`${alert.type}-video-extension`].value}`;
      alert.videoId = alertsForms[i].elements[`${alert.type}-video`].value;

      config.alerts.push(alert);
    }

    if(generalTwitch.elements['twitch-activate'].checked){
      const regexForms = document.getElementsByClassName('regex-form');
      for(let i=0; i < regexForms.length; i++){
        if(regexForms[i].dataset.type === 'templateTwitch') continue;
        const regexObj = {};
        const type = regexForms[i].dataset.type;
        if(regexForms[i].elements[`${type}-regex`].value.trim() === ''){
          regexForms[i].elements[`${type}-regex`].className = 'error-input';
          errorConfig = true;
          continue;
        } else{
          regexForms[i].elements[`${type}-regex`].removeAttribute('class');
        }
        if(regexForms[i].elements[`${type}-regex-option`].value === 'contain'){
          regexObj.regex = `${regexForms[i].elements[`${type}-regex`].value}`;
        } else if(regexForms[i].elements[`${type}-regex-option`].value === 'start'){
          regexObj.regex = `^${regexForms[i].elements[`${type}-regex`].value}`;
        }
        regexObj.timeOut = 1;
        regexObj.id = regexForms[i].dataset.type;
        regexObj.timeOut = (regexForms[i].elements[`${type}-timeout`].value < 1) ? 1 : regexForms[i].elements[`${type}-timeout`].value;
        regexObj.command = regexForms[i].elements[`${type}-afterTrigger-option`].value;
        if(regexForms[i].elements[`${type}-afterTrigger-option`].value === 'respond'){
          if(regexForms[i].elements[`${type}-message`].value === ''){
            errorConfig = true;
            regexForms[i].elements[`${type}-message`].className = 'error-input';
          }  else{
            regexForms[i].elements[`${type}-message`].removeAttribute('class');
            regexObj.message = regexForms[i].elements[`${type}-message`].value;
          }
        } else if(regexForms[i].elements[`${type}-afterTrigger-option`].value === 'ban'){
          regexObj.banTime = (regexForms[i].elements[`${type}-ban-time`].value < 1) ?  1 : regexForms[i].elements[`${type}-ban-time`].value;
        }
        config.twitch.regex.push(regexObj);
      }
    }

    let grey = document.createElement('div');
    grey.className = 'grey';

    let div = document.createElement('div');
    if(errorConfig === true){
      div.className = 'error-container';
      let p = document.createElement('p');
      p.textContent = 'A field or more have an invalid entry.';
      let button = document.createElement('button');
      button.id = 'ok-button';
      button.textContent = 'OK';
      button.addEventListener('click', function(e){
        e.target.parentNode.parentNode.remove();
      });
      div.appendChild(p);
      div.appendChild(button);
    } else{
      div.className = 'config-container';
      let p = document.createElement('p');
      let pConf = document.createElement('p');
      pConf.textContent = `In OBS settings, Width: ${width}, Height: ${height}.`;
      pConf.className = 'config-paragraph';
      p.textContent = 'Copy this in config.js :';
      p.className = 'config-title';
      let field = document.createElement('textArea');
      field.className = 'text-area';
      field.id = 'config-container';
      field.setAttribute('rows', '20');
      field.setAttribute('cols', '150');
      field.innerHTML = configFunctions.generateJson(config);
      let button = document.createElement('button');
      button.id = 'ok-button';
      button.textContent = 'OK';
      button.addEventListener('click', function(e){
        e.target.parentNode.parentNode.remove();
      });
      let buttonCopy = document.createElement('button');
      buttonCopy.id = 'copy-button';
      buttonCopy.textContent = 'Copy to clipboard';
      buttonCopy.addEventListener('click', function(e){
        let config = document.getElementById('config-container');
        config.select();
        document.execCommand("copy");
      });
      div.appendChild(p);
      div.appendChild(pConf);
      div.appendChild(field);
      div.appendChild(buttonCopy);
      div.appendChild(button);
    }
    grey.appendChild(div);
    document.body.appendChild(grey);
  };

  configFunctions.generateJson = function(config){
    let text = `'use strict';const config={general:${JSON.stringify(config.general)},alerts:[`;
    for(let i=0; i < config.alerts.length; i++){
      let alert = config.alerts[i];
      text += `{bubbleName:"${alert.bubbleName}",bubbleTime:${alert.bubbleTime},fontSize:"${alert.fontSize}",textTime: ${alert.textTime},timeActive:${alert.timeActive}, activateSpeech:${alert.activateSpeech},type:"${alert.type}",typography:"${alert.typography}",video:"${alert.video}",bubbleId:"${alert.bubbleId}", typographyId:"${alert.typographyId}", videoId: "${alert.videoId}", textBase: "${alert.text}",${((alert.type === 'subgift' || alert.type === 'bomb') ? 'activate:'+alert.activate+',' : '')}`;
      text += 'text:function(name,amount,currency,gifter){return `'+alert.text+'`;}}';
      if(alert !== config.alerts[config.alerts.length-1]){
        text += ',';
      }
    }
    text += '],';
    text += `twitch:{general:${JSON.stringify(config.twitch.general)},regex:[`;
    for(let i=0; i < config.twitch.regex.length; i++){
      let regex = config.twitch.regex[i];
      text += `{regex:"${regex.regex}",id:"${regex.id}", timeOut:${regex.timeOut}, command:"${regex.command}", message:"${(regex.command === 'respond') ? regex.message : ''}", banTime:${(regex.command === 'ban') ? regex.banTime : 0},`;
      text += ' text: function(name){return `'+((regex.command === 'respond') ? regex.message : '')+'`}}'
      if(alert !== config.twitch.regex[config.twitch.regex.length-1]){
        text += ',';
      }
    }
    text += ']}};';
    return text;
  };

}(window.configFunctions = window.configFunctions || {}));
