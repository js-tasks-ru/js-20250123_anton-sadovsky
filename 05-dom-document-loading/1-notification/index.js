export default class NotificationMessage {
    element;
    static isShown = false;
    
    constructor(message, {
        duration = 0,
        type = ''
    } = {}) {
        this.message = message;
        
        this.duration = duration;
        this.type = type;
        this.element = this.createElement();
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }

    show(element) {
        if (NotificationMessage.isShown) return;

        NotificationMessage.isShown = true;

        if (element) {
            element.appendChild(this.element);
        }
        else {
            const body = document.querySelector('body');
            body.appendChild(this.element);
        }


        setTimeout(_ => {
            this.remove();
            NotificationMessage.isShown = false;
        }, this.duration);
    }

    createElement() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.createTemplate;
        console.log(this.createTemplate);

        return wrapper.firstElementChild;
    }

    get getSeconds() {
        return this.duration ? this.duration / 1000 : 0
    }

    get createTemplate() {
        return `
        <div class="notification ${this.type}" style="--value:${this.getSeconds}s">
            <div class="timer"></div>
            <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
                ${this.message}
            </div>
            </div>
        </div>`
    }
}
