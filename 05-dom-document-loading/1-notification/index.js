export default class NotificationMessage {
    element;
    static lastShownComponent;
    
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
        if (NotificationMessage.lastShownComponent) {
            NotificationMessage.lastShownComponent.remove();
        }
        
        NotificationMessage.lastShownComponent = this;
        if (element) {
            element.appendChild(this.element);
        }
        else {
            const body = document.querySelector('body');
            body.appendChild(this.element);
        }


        setTimeout(_ => {
            this.remove();
        }, this.duration);
    }

    createElement() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.createTemplate;
        console.log(this.createTemplate);

        return wrapper.firstElementChild;
    }

    get createTemplate() {
        return `
        <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
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
