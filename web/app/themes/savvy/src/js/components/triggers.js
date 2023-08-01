/**
 * Handles the Triggers Class
 * 
 * This object is intented to register events from the html directly
 *
 * @package Privacysavvy
 * */

 class SavvyTriggers {
	constructor() {
        if (document.readyState != "loading") {
            this.init();
        }
        else {
            document.addEventListener("DOMContentLoaded", () => {
                this.init();
            });
        }
	}

    static register_triggers(triggers){
        let self = this;

        Array.prototype.forEach.call(triggers, (trigger) => {
            self.register_trigger(trigger);
        });
    }

    static register_trigger(trigger) {
        let events  = trigger.dataset.event,
            target  = trigger.dataset.target,
            action  = trigger.dataset.action,
            content = trigger.dataset.content;


        if(!events || !target || !action || !content) {
            return;
        }

        function get_target_node(target) {
            let target_node;

            if(target.includes('closest-')) {
                target_node = trigger.closest(target.replace('closest-', ''));
            }

            if(target.includes('sibling-')) {
                target_node = trigger.parentNode.querySelector(target.replace('sibling-', ''));
            }

            return target_node;
        }

        function do_the_actions() {
            let target_node = get_target_node(target);

            if( action == 'toggle_class' ){
                target_node.classList.toggle(content);
            }
        }

        /**
         * Registering multiple events
         */
        events = events.split(' ');
        events.forEach(event => {
            trigger.addEventListener(event, () => {
                do_the_actions();
            });
        });
    }

    init() {
        let triggers = document.querySelectorAll('.ps-triggers');
        console.log('Registering the triggers');

        if(triggers) {
            Array.prototype.forEach.call(triggers, (trigger) => {
                this.constructor.register_trigger(trigger);
            });
        }
    }
}

export default SavvyTriggers;