window.onload = function(){
  const menuBigButton = document.getElementsByClassName('big-button');
  const menuSmallButton = document.getElementsByClassName('small-button');

  for(let i = 0; i<menuBigButton.length; i++){
    const buttons = menuBigButton[i].getElementsByTagName('BUTTON');
    buttons[0].addEventListener('click', function(e){
      const menuBigButton = document.getElementsByClassName('big-button');
      const menuSmallButton = document.getElementsByClassName('small-button');
      for(let i=0; i<menuBigButton.length; i++){
        for (let j = 0; j < menuSmallButton.length; j++){
          if(menuSmallButton[i].dataset.bigmenu === e.target.innerHTML){
            menuSmallButton[i].getElementsByTagName('BUTTON')[0].dispatchEvent(new Event('click'));
          }
        }
      }
    });
  }

  for(let i = 0; i<menuSmallButton.length; i++){
    const buttons = menuSmallButton[i].getElementsByTagName('BUTTON');
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].addEventListener('click', function(e){
        const menuBigButton = document.getElementsByClassName('big-button');
        for(let i=0; i<menuBigButton.length; i++){
          menuBigButton[i].getElementsByTagName('BUTTON')[0].className = '';
          if(menuBigButton[i].getElementsByTagName('BUTTON')[0].innerHTML == e.target.parentNode.dataset.bigmenu) menuBigButton[i].getElementsByTagName('BUTTON')[0].className = 'selected';
        }
        const menuSmallButton = document.getElementsByClassName('small-button');
        for(let i=0; i<menuSmallButton.length; i++){
          const buttons = menuSmallButton[i].getElementsByTagName('BUTTON');
          for(let j=0; j<buttons.length; j++){
            buttons[j].className = '';
          }
        }
        e.target.className = 'selected';
        const view = e.target.innerHTML.replace(' ', '-').toLowerCase();
        const sectionViews = document.getElementsByClassName('section-view');
        for(let i=0; i < sectionViews.length; i++){
          sectionViews[i].setAttribute('hidden', 'hidden');
        }
        console.log(view);
        document.getElementById(view).removeAttribute('hidden');
      });
    }
  }
};

window.onscroll = function(){
  if(window.scrollY >= 0){
    document.getElementById('navbar').style.marginTop = `${window.scrollY}px`;
  } else{
    document.getElementById('navbar').style.marginTop = `0px`;
  }
};
