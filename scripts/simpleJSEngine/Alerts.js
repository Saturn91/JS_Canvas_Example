class AlertButton {
    constructor(text, callback) {
        this.text = text;
        this.callback = callback;
    }
}

class SJSE_Alert {
    constructor() {
        this.alert = document.getElementById('alert');
        this.hide(); 
        document.getElementById('close-btn').addEventListener('click', () => {
            this.hide();
        });   
        GameEnvironement.alert = this;   
    }

    show(title, content, buttons) {
        document.getElementById('alert-title').innerHTML = title;
        document.getElementById('alert-content').innerHTML = content;
        this.alert.style.display = 'block';

        if(buttons?.length) {
            this.initializeButtons(buttons);
            return
        }

        this.initializeButtons([new AlertButton('Ok')]);
    }

    initializeButtons(buttons, alert) {
        let buttonHolder =  document.getElementById('alert-btn-holder');
        buttonHolder.innerHTML = '';

        buttons.forEach((btn, index) => {
            let btnElement = document.createElement("button");
            btnElement.innerHTML = btn.text;
            btnElement.id = `aletr-btn-${index}`;
            buttonHolder.appendChild(btnElement);

            if(btn.callback) {
                btnElement.addEventListener('click', () => {
                    btn.callback();
                    GameEnvironement.alert.hide();
                });
                return;
            } 

            btnElement.addEventListener('click', () => {
                GameEnvironement.alert.hide();
            });
        });
    }

    hide() {
        this.alert.style.display = 'none';
    }    
}
