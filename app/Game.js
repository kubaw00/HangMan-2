
import { Quote } from './Quote.js'


class Game {

    currentStep = 0;
    lastStep = 7;

    quotes = [
        {
            text: 'pan tadeusz',
            category: 'Utwór literacki'
        },
        {
            text: 'skazani na shawshank',
            category: 'Film'  
        },
        {
            text: 'batman',
            category: 'Film'  
        },
        {
            text: 'omlet',
            category: 'Jedzenie'  
        },
        {
            text: 'jajecznica',
            category: 'Jedzenie'  
        }
    ];

    constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }){
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;

        const {text, category} = this.quotes[Math.floor(Math.random()* this.quotes.length)]
        this.categoryWrapper.innerText = category;
        this.quote = new Quote(text);

    }

    guess(letter, e) {
        e.target.disabled = true;
        
        if(this.quote.guess(letter)){
            this.drawQuote();
            
        }else {
            this.currentStep +=1
            document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
            if(this.lastStep === this.currentStep){
                this.winning('PRZEGRYWASZ! KONIEC GRY!');
            }
        }
        
    }

    drawLetters(){
        for(let i = 0; i<26 ; i++){
            const label = (i+10).toString(36);
            const button = document.createElement('button');
            button.innerText = label;
            button.addEventListener('click',(e) => this.guess(label, e))
            this.lettersWrapper.appendChild(button)
        }
    }

    drawQuote(){
        const content = this.quote.getContent();
        this.wordWrapper.innerText = content;
        if(!content.includes('_')){
            this.winning('GRATULACJE! WYGRYWASZ! KONIEC GRY!');
        }
    }
    start(){
       document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
       this.drawLetters();
       this.drawQuote();
    }

    winning(text) {
        this.wordWrapper.innerText = text;
        this.lettersWrapper.innerText = '';
    }

}

const game = new Game({
    lettersWrapper: document.getElementById('letters'),
    categoryWrapper: document.getElementById('category'),
    wordWrapper: document.getElementById('word'),
    outputWrapper: document.getElementById('output')

});
game.start();


