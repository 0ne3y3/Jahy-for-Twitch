'use strict';
class Config{
  constructor(){
    this.token = ''; // your streamlabs token
    this.textPosition = 'left'; // If the speech bubble is on the left or the right of the character
    this.displayBubble = 'yes'; // if you want just the animation without the bubble ('yes' or 'no');
    this.messages = new Messages();
    this.animations = new Animations();
    this.intervalTime = 5000; // how much time between checking if an alert is here (should be = to)
  }
}

// You can personalize messages displayed in the speech bubble
// Warning: idk how much words you can put before it goes out of the speech bubble
// Note: you can change font size of each message if it goes out.
class Messages{
  constructor(){
    this.followFontSize = 50;
    this.hostFontSize = 47;
    this.raidFontSize = 42;
    this.subscriptionFontSize = 47;
    this.subgiftFontSize = 47;
    this.resubscriptionFontSize = 47;
    this.bits1FontSize = 45;
    this.bits100FontSize = 45;
    this.bits1000FontSize = 45;
    this.bits5000FontSize = 45;
    this.bits10000FontSize = 45;
    this.donationFontSize = 42;
  }

  follow(name){
    return `${name} is following ! Thanks you.`;
  }

  host(name, amount){
    return `${name} is hosting with their ${amount} viewers ! Nice!`;
  }

  raid(name, amount){
    return `${name} and their ${amount} viewers want me to pay the rent !`;
  }

  subscription(name){
    return `${name} subscribe for the first time ! Thanks you !`;
  }

  resubscription(name, amount){
    return `${name} resub for their ${amount} months ! Thanks you !`;
  }

  bits(name, amount){
    if(amount < 100){ // 1 to 99 bits
      return`${name} give ${amount} bits ! Thanks.`;
    } else if(amount >= 100 && amount < 1000){ // 100 to 999 bits
      return `${name} give ${amount} bits ! Thanks you !`;
    } else if(amount >= 1000 && amount < 5000){ // 1000 to 4999 bits
      return `${name} give ${amount} bits ! That's alot !`;
    } else if(amount >= 5000 && amount < 10000){ // 5000 to 9999 bits
      return `WOW ! ${name} give ${amount} bits ! Thanks you so much !`;
    } else if(amount >= 10000){ // 10000 and more bits
      return `WHAT !? ${name} give ${amount} bits ! Thanks you so much !`;
    }
  }

  donation(name, amount, currency){
    return `${name} donate ${amount} ${currency} ! Thanks you so much !`;
  }

  subgift(name){
    return `Ooooh I see two lovebird...`;
  }
}


// Bubbles and text animation
// BubbleTime = how many time it take to the bubble to appear
// TextTime = how many time it take to the text to appear (will always appear after the bubble)
// TimeActive = how many time it take to the text before disappear /!\ you have to include time of BubbleTime and TextTime
// WARNING: the bubble have to disappear before the end of the animation, because if another alert have to be displayed, the bubble won't appear.
class Animations{
  constructor(){
    this.followBubbleTime = 1;
    this.followTextTime = 0.8;
    this.followTimeActive = 6;

    this.subscriptionBubbleTime = 1;
    this.subscriptionTextTime = 0.8;
    this.subscriptionTimeActive = 5;

    this.resubscriptionBubbleTime = 1;
    this.resubscriptionTextTime = 0.8;
    this.resubscriptionTimeActive = 5;

    this.subgiftBubbleTime = 1;
    this.subgiftTextTime = 0.8;
    this.subgiftTimeActive = 6;

    this.donationBubbleTime = 1;
    this.donationTextTime = 0.8;
    this.donationTimeActive = 5;

    this.hostBubbleTime = 1;
    this.hostTextTime = 0.8;
    this.hostTimeActive = 5;

    this.raidBubbleTime = 1;
    this.raidTextTime = 0.8;
    this.raidTimeActive = 5;

    this.bits1BubbleTime = 1;
    this.bits1TextTime = 0.8;
    this.bits1TimeActive = 6;

    this.bits100BubbleTime = 1;
    this.bits100TextTime = 0.8;
    this.bits100TimeActive = 6;

    this.bits1000BubbleTime = 1;
    this.bits1000TextTime = 0.8;
    this.bits1000TimeActive = 6;

    this.bits5000BubbleTime = 1;
    this.bits5000TextTime = 0.8;
    this.bits5000TimeActive = 6;

    this.bits10000BubbleTime = 1;
    this.bits10000TextTime = 0.8;
    this.bits10000TimeActive = 6;
  }
}
