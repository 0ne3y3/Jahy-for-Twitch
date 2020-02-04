// GLOBAL VAR
let alertsForms = [];
let generalForm;
let bubbleText = document.getElementById('textBubble');
let usernameSelect;

window.onscroll = function(){
  if(window.scrollY >= 706){
    document.getElementById('preview').style.marginTop = `${10+(window.scrollY-706)}px`;
  } else{
    document.getElementById('preview').style.marginTop = `10px`;
  }
};

window.onload = function(){
  // USERNAME SELECTION
  usernameSelect = document.getElementById('usernameSelectContainer');

  for(let i = 0; i < usernameSelect.elements['usernameSelect'].length; i++){
    usernameSelect[i].addEventListener('change', function(e){
      if(e.target.checked){
        let text;
        let type;
        for(let i=0; i < alertsForms.length; i++){
          if(alertsForms[i].elements['selectPreview'].checked === true){
            text = alertsForms[i].elements[`${alertsForms[i].dataset.type}Text`];
            type = alertsForms[i].dataset.type;
          }
        }
        if(typeof text !== 'undefined') changeText(text, type, e.target.value);
      }
    });
  }

  // #### GENERAL FORM ####
  generalForm = document.getElementById('formGeneral');

  generalForm.elements['colorText'].addEventListener('blur', function(e){
    let err = testColorTextInput(e.target);
    if(err === 'ok'){
      bubbleText.style.color = e.target.value;
    } else{
      errorColorTextInput(err, e.target);
    }
  });
  generalForm.elements['colorText'].addEventListener('focus', function(e){
    if(e.target.className === 'error-input'){
      e.target.removeAttribute('class');
      e.target.nextSibling.remove();
    }
  });

  for(let i = 0; i < generalForm.elements['shadowText'].length; i++){
    generalForm.elements['shadowText'][i].addEventListener('change', function(e){
      if(e.target.checked) changeShadow(e.target.value);
    });
  }

  for(let i = 0; i < generalForm.elements['placeSpeech'].length; i++){
    generalForm.elements['placeSpeech'][i].addEventListener('change', function(e){
      if(e.target.checked) changeSpeechPlace(e.target.value);
    });
  }


  generalForm.elements['baseVideoName'].addEventListener('blur', function(e){
    changeVideo(e.target, e.target.parentNode.getElementsByTagName('input')[1]);
    if(generalForm.elements['ActivateSpeech'].value == '1'){
      textBubble.innerHTML = '<span>Hello,</span><span>I\'m</span><span>Jahy</span><span>Sama !</span><span>Praise</span><span>me</span><span>!</span>';
      textBubble.style.fontFamily = 'verdana';
      textBubble.style.fontSize = '30px';
    }
    for(let i=0; i < alertsForms.length; i++){
      alertsForms[i].elements['selectPreview'].checked = false;
      alertsForms[i].elements['selectPreview'].removeAttribute('checked');
    }
  });

  generalForm.elements['baseVideoExtension'].addEventListener('blur', function(e){
    changeVideo(e.target.parentNode.getElementsByTagName('input')[0], e.target);
    textBubble.innerHTML = '<span>Hello,</span><span>I\'m</span><span>Jahy</span><span>Sama !</span><span>Praise</span><span>me</span><span>!</span>';
    textBubble.style.fontFamily = 'verdana';
    textBubble.style.fontSize = '30px';
  });

  generalForm.elements['intervalTime'].addEventListener('blur', function(e){
    if(e.target.value < 1) e.target.value = 5;
  });

  for(let i = 0; i < generalForm.elements['ActivateSpeech'].length; i++){
    generalForm.elements['ActivateSpeech'][i].addEventListener('change', function(e){
      if(e.target.checked) activateBubbleSpeech(e.target.value);
    });
  }

  generalForm.elements['marginTextTop'].addEventListener('change', function(e){
    textBubble.style.marginTop = `${e.target.value}px`;
  });

  generalForm.elements['centerText'].addEventListener('change', function(e){
    textBubble.style.paddingLeft = `${e.target.value}px`;
    textBubble.style.paddingRight = `${e.target.value}px`;
    let textContainer = document.getElementById('textArea');
    if(!textContainer.style.width) textContainer.style.width = `${textContainer.getElementsByClassName('bubbles')[0].width}px`;
    textBubble.style.width = `${calculateWidth(textContainer)}px`;
  });

  generalForm.elements['gapInbetween'].addEventListener('change', function(e){
    let videosContainer = document.getElementById('videos');
    let textAreaContainer = document.getElementById('textArea');
    if(generalForm.elements['placeSpeech'].value === 'left') videosContainer.style.marginLeft = `-${e.target.value}px`;
    if(generalForm.elements['placeSpeech'].value === 'right') textAreaContainer.style.marginLeft = `-${e.target.value}px`;
    document.getElementById('finalWidth').innerHTML = calculateTotalPreview();
    document.getElementById('preview-container').style.width = `${calculateTotalPreview()}px`;
  });

  // #### ADVANCED FORMS ####
  alertsForms = document.getElementsByClassName('alerts-form');
  for(let i=0; i < alertsForms.length; i++){
    // When we click on a form, load config in the preview (and display error if any)
    alertsForms[i].addEventListener("click" , function(e){
      if(e.currentTarget.elements['selectPreview'].checked !== true){
        let inputs = e.currentTarget.getElementsByClassName('error-input');
        let errorMessages = e.currentTarget.getElementsByClassName('error-paragraph');
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
        let checkboxs = document.getElementsByClassName('selectPreview');
        let type = e.currentTarget.dataset.type;
        for(let j = 0; j < checkboxs.length; j++){
          if(checkboxs[j].value !== type){
            checkboxs[j].checked = false;
            checkboxs[j].removeAttribute('checked');
          } else{
            checkboxs[j].checked = true;
            checkboxs[j].setAttribute('checked', '');
          }
        }
        if(generalForm.elements['ActivateSpeech'].value == 1){
          changeText(e.currentTarget.elements[`${type}Text`], type, usernameSelect.elements['usernameSelect'].value);
          changeFontSize(e.currentTarget.elements[`${type}FontSize`]);
          changeFontFamily(e.currentTarget.elements[`${type}TypoName`], e.currentTarget.elements[`${type}TypoExtension`]);
          changeBubble(e.currentTarget.elements[`${type}BubbleName`]);
        }
        changeVideo(e.currentTarget.elements[`${type}Video`], e.currentTarget.elements[`${type}VideoExtension`]);
      }
    });

    let select = alertsForms[i].elements['selectPreview'].value;

    alertsForms[i].elements[`${select}Text`].addEventListener('blur', function(e){
      changeText(e.target, e.target.parentNode.parentNode.parentNode.dataset.type, usernameSelect.elements['usernameSelect'].value);
    });

    alertsForms[i].elements[`${select}FontSize`].addEventListener('blur', function(e){
      changeFontSize(e.target);
    });

    alertsForms[i].elements[`${select}BubbleTime`].addEventListener('blur', function(e){
      if(e.target.value < 0){
        e.target.value = 1;
      }
    });

    alertsForms[i].elements[`${select}TextTime`].addEventListener('blur', function(e){
      if(e.target.value < 0){
        e.target.value = 1;
      }
    });

    alertsForms[i].elements[`${select}TimeActive`].addEventListener('blur', function(e){
      if(e.target.value < 0){
        e.target.value = 1;
      }
    });

    alertsForms[i].elements[`${select}BubbleName`].addEventListener('blur', function(e){
      changeBubble(e.target);
    });

    alertsForms[i].elements[`${select}TypoName`].addEventListener('blur', function(e){
      changeFontFamily(e.target, e.target.parentNode.getElementsByClassName('extensions')[0]);
    });

    alertsForms[i].elements[`${select}TypoExtension`].addEventListener('blur', function(e){
      changeFontFamily(e.target.parentNode.getElementsByTagName('input')[0], e.target);
    });

    alertsForms[i].elements[`${select}Video`].addEventListener('blur', function(e){
      changeVideo(e.target, e.target.parentNode.getElementsByClassName('extensions')[0]);
    });

    alertsForms[i].elements[`${select}VideoExtension`].addEventListener('blur', function(e){
      changeVideo(e.target.parentNode.getElementsByTagName('input')[0], e.target);
    });
  }

  // #### BUTTON GENERATE ####
  document.getElementById('config-generate').addEventListener('click', async function(e){
    let config = {};
    let errorConfig = false;
    let test;
    config.general = {};
    config.alerts = [];

    if(generalForm.elements['streamlabsToken'].value.trim() != ''){
      config.general.token = generalForm.elements['streamlabsToken'].value.trim();
      generalForm.elements['streamlabsToken'].removeAttribute('class');
    } else{
      errorConfig = true;
      generalForm.elements['streamlabsToken'].className = 'error-input';
    }

    config.general.activateSpeech = ((generalForm.elements['ActivateSpeech'].value == '1') ? true : false);
    if(config.general.activateSpeech){
      config.general.placeSpeech = generalForm.elements['placeSpeech'].value;
      test = testColorTextInput(generalForm.elements['colorText']);
      if(test === 'ok'){
        if(generalForm.elements['colorText'].className === 'error-input') generalForm.elements['colorText'].removeAttribute('class');
        if(generalForm.elements['colorText'].nextSibling.tagName === 'P') generalForm.elements['colorText'].nextSibling.remove();
        config.general.colorText = generalForm.elements['colorText'].value;
      } else{
        errorConfig = true;
        errorColorTextInput(test, generalForm.elements['colorText']);
      }
      config.general.shadowText = ((generalForm.elements['shadowText'].value == 'ON') ? true : false);
      config.general.marginTextTop = `${generalForm.elements['marginTextTop'].value}px`;
      config.general.centerText = `${generalForm.elements['centerText'].value}px`;
      config.general.gapInbetween = `${generalForm.elements['gapInbetween'].value}px`;
    } else{
      config.general.colorText = '#000000';
      config.general.placeSpeech = 'right';
      config.general.shadowText = false;
      config.general.marginTextTop = '0px';
      config.general.centerText = '0px';
      config.general.gapInbetween = `0px`;
    }

    await testVideo(generalForm.elements['baseVideoName'], generalForm.elements['baseVideoExtension']).catch(()=>{
      errorConfig = true;
      errorVideo(generalForm.elements['baseVideoName'], generalForm.elements['baseVideoExtension']);
    });
    config.general.baseVideo = `${generalForm.elements['baseVideoName'].value}.${generalForm.elements['baseVideoExtension'].value}`;

    config.general.intervalTime = ((Number(generalForm.elements['intervalTime'].value)) ? Number(generalForm.elements['intervalTime'].value) : 5);

    config.general.width = `${document.getElementById('finalWidth').innerHTML}px`;
    config.general.height = `${document.getElementById('finalHeight').innerHTML}px`;

    for(let i = 0; i < alertsForms.length; i++){
      let alert = {};
      alert.type = alertsForms[i].elements['selectPreview'].value;
      if(config.general.activateSpeech){
        if(testText(alertsForms[i].elements[`${alert.type}Text`])){
          alert.text = alertsForms[i].elements[`${alert.type}Text`].value;
        } else{
          errorConfig = true;
          errorText(alertsForms[i].elements[`${alert.type}Text`]);
        }

        alert.fontSize = (alertsForms[i].elements[`${alert.type}FontSize`].value > 0) ? `${alertsForms[i].elements[`${alert.type}FontSize`].value}px` : '45px';

        alert.bubbleTime = Number(alertsForms[i].elements[`${alert.type}BubbleTime`].value);
        alert.textTime = Number(alertsForms[i].elements[`${alert.type}TextTime`].value);
        alert.timeActive = (Number(alertsForms[i].elements[`${alert.type}TimeActive`].value) >= 1) ? Number(alertsForms[i].elements[`${alert.type}TimeActive`].value) : 1;

        await testBubble(alertsForms[i].elements[`${alert.type}BubbleName`]).catch(()=>{
          errorConfig = true;
          errorBubble(alertsForms[i].elements[`${alert.type}BubbleName`]);
        });
        alert.bubbleName = `${alertsForms[i].elements[`${alert.type}BubbleName`].value}.png`;
        alert.bubbleId = alertsForms[i].elements[`${alert.type}BubbleName`].value;

        await testFontFamily(alertsForms[i].elements[`${alert.type}TypoName`], alertsForms[i].elements[`${alert.type}TypoExtension`]).catch(()=>{
          errorConfig = true;
          errorFontFamily(alertsForms[i].elements[`${alert.type}TypoName`], alertsForms[i].elements[`${alert.type}TypoExtension`]);
        });
        alert.typography = `${alertsForms[i].elements[`${alert.type}TypoName`].value}.${alertsForms[i].elements[`${alert.type}TypoExtension`].value}`;
        alert.typographyId = alertsForms[i].elements[`${alert.type}TypoName`].value;
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
      }
      await testVideo(alertsForms[i].elements[`${alert.type}Video`], alertsForms[i].elements[`${alert.type}VideoExtension`]).catch(()=>{
        errorConfig = true;
        errorVideo(alertsForms[i].elements[`${alert.type}Video`], alertsForms[i].elements[`${alert.type}VideoExtension`]);
      });

      alert.video = `${alertsForms[i].elements[`${alert.type}Video`].value}.${alertsForms[i].elements[`${alert.type}VideoExtension`].value}`;
      alert.videoId = alertsForms[i].elements[`${alert.type}Video`].value;
      config.alerts.push(alert);
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
      pConf.textContent = `In OBS settings, Width: ${document.getElementById('finalWidth').textContent}, Height: ${document.getElementById('finalHeight').textContent}.`;
      pConf.className = 'config-paragraph';
      p.textContent = 'Copy this in config.js :';
      p.className = 'config-title';
      let field = document.createElement('textArea');
      field.className = 'text-area';
      field.id = 'config-container';
      field.setAttribute('rows', '20');
      field.setAttribute('cols', '150');
      field.innerHTML = generateConfig(config);
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
  });

  document.getElementById('config-load').addEventListener('click', function(e){
    let configScript = document.createElement('script');
    configScript.onload = function(){
      if(typeof config !== 'undefined'){
        generalForm.elements['streamlabsToken'].value = config.general.token;
        if(config.general.activateSpeech){
          document.getElementById('ActivateSpeechYes').checked = true;
          document.getElementById('ActivateSpeechNo').checked = false;
          activateBubbleSpeech(1);
        } else{
          document.getElementById('ActivateSpeechNo').checked = true;
          document.getElementById('ActivateSpeechYes').checked = false;
          activateBubbleSpeech(0);
        }

        if(config.general.activateSpeech){
          if(config.general.placeSpeech === 'right'){
            document.getElementById('placeSpeechRight').checked = true;
            document.getElementById('placeSpeechLeft').checked = false;
          } else{
            document.getElementById('placeSpeechRight').checked = false;
            document.getElementById('placeSpeechLeft').checked = true;
          }
          if(config.general.placeSpeech === 'right') document.getElementById('textArea').style.marginLeft = config.general.gapInbetween;
          if(config.general.placeSpeech === 'left') document.getElementById('videos').style.marginLeft = config.general.gapInbetween;
          changeSpeechPlace(config.general.placeSpeech);
          bubbleText.style.paddingLeft = config.general.centerText;
          bubbleText.style.paddingRight = config.general.centerText;
          bubbleText.style.marginTop = config.general.marginTextTop;
          generalForm.elements['colorText'].value = config.general.colorText;
          bubbleText.style.color = config.general.colorText;
          if(config.general.shadowText){
            document.getElementById('shadowON').checked = true;
            document.getElementById('shadowOFF').checked = false;
            changeShadow('ON');
          } else{
            document.getElementById('shadowOFF').checked = true;
            document.getElementById('shadowON').checked = false;
            changeShadow('OFF');
          }

          generalForm.elements['marginTextTop'].value = config.general.marginTextTop.slice(0,-2);
          generalForm.elements['centerText'].value = config.general.centerText.slice(0,-2);
          generalForm.elements['gapInbetween'].value = config.general.gapInbetween.slice(0,-2);
        }
        let video = getNameExtension(config.general.baseVideo);
        generalForm.elements['baseVideoName'].value = video[0];
        generalForm.elements['baseVideoExtension'].value = video[1];
        generalForm.elements['intervalTime'].value = config.general.intervalTime;
        for(let i=0; i < alertsForms.length; i++){
          let form = alertsForms[i];
          let type = form.dataset.type;
          let configAlert = config.alerts.find(alert => alert.type === type);
          if(config.general.activateSpeech){
            form.elements[`${type}Text`].value = configAlert.textBase;
            form.elements[`${type}FontSize`].value = configAlert.fontSize.slice(0, -2);
            form.elements[`${type}BubbleTime`].value = configAlert.bubbleTime;
            form.elements[`${type}TextTime`].value = configAlert.textTime;
            form.elements[`${type}TimeActive`].value = configAlert.timeActive;
            form.elements[`${type}BubbleName`].value = configAlert.bubbleId;
            let typo = getNameExtension(configAlert.typography);
            form.elements[`${type}TypoName`].value = typo[0];
            form.elements[`${type}TypoExtension`].value = typo[1];
          }
          let video = getNameExtension(configAlert.video);
          form.elements[`${type}Video`].value = video[0];
          form.elements[`${type}VideoExtension`].value = video[1];
        }
        let eventBlur = new Event('blur');
        generalForm.elements['baseVideoName'].dispatchEvent(eventBlur);

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
  });
};
