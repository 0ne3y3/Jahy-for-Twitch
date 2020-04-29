'use strict';
(function(alerts){
  twitchChat.activateOptions = function(e){
    const navs = document.getElementById('cat-3').getElementsByClassName('nav-button-2');
    const generalInput = document.getElementById('form-twitch-general').getElementsByTagName('INPUT');
    const buttons = document.getElementById('form-twitch-general').getElementsByTagName('BUTTON');
    if(e.target.checked){
      navs[1].disabled = false;
      navs[2].disabled = false;
      for(let i=0; i < generalInput.length; i++){
        generalInput[i].disabled = false;
      }
      for(let i = 0; i < buttons.length; i++){
        buttons[i].disabled = false;
      }
    } else{
      navs[1].disabled = true;
      navs[2].disabled = true;
      for(let i=0; i < generalInput.length; i++){
        if(generalInput[i] !== e.target){
          generalInput[i].disabled = true;
        }
      }
      for(let i = 0; i < buttons.length; i++){
        buttons[i].disabled = true;
      }
    }
  };

  twitchChat.publicKeys = function(e){
    e.preventDefault();
    const form = document.getElementById('form-twitch-general');
    form.elements['twitch-name'].value = 'jahysamabot';
    form.elements['twitch-password'].value = 'oauth:7ndydxjsx6nheiuiiqu479az0bp9ob';
  };

}(window.twitchChat = window.twitchChat || {}));
