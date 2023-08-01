/**
 * Handles the Popup of the Theme
 *
 * @package Privacysavvy
 * */

 import SavvyTheme      from "./theme";
 import SavvyTriggers   from "./triggers";

 class SavvyPopup {
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

    register_close_buttons() {
        const close_btns = this.popup.querySelectorAll('.ps-popup_btn_close');

        /**
         * Close the modal when user clicks on 
         * an element with the .ps-popup_btn_close class
         */
        Array.prototype.forEach.call(close_btns, (btn) => {
            btn.addEventListener('click', (e) => {
                this.popup.classList.remove('ps-popup__active');
                this.remove_hash_from_url();
            });
        });

        /**
         * Close the modal also when user 
         * clicks outside the modal window
         */
        this.popup.addEventListener('click', (e) => {
            if(e.target == this.popup){
                this.popup.classList.remove('ps-popup__active');
                this.remove_hash_from_url();
            }
        });
    }

    remove_hash_from_url() {
        if(!this.is_vpn_offer){
            return;
        }

        window.history.replaceState({}, document.title, this.url.pathname);
    }


    init() {
        /**
         * If we find #vpnoffer on the url, 
         * then we need to trigger the popup right away.
         */
        this.url            = new URL(window.location.href);
        this.is_vpn_offer   = (this.url.hash === '#vpnoffer') ? true : false;

                    
        /**
         * Verify if Popup is set to be called on the LRC,
         * if so, then do nothing and wait for the lrc popup callback
         * to init this class
         */
         let popup_details = undefined;
        if(SavvyTheme.instance().check_lrc_resources()){
            Array.prototype.every.call(ps_lrc_resources, (resource) => {
                if(resource.resource_name == 'lrc_popups'){
                    popup_details = resource;
                    return false;
                }
                return true;
            });
        }

        /**
         * Open the Popup if the hash #vpnoffer 
         * is present in the url, otherwise wait 25s
         */
        if(this.is_vpn_offer){
            /**
             * If is set to be called in the lrc,
             * then we need to get it right away and then
             * remove it from lrc in order to avoid duplicates.
             */
            if(popup_details){
                console.log('Is VPN Offer and popup was set to open on LRC');
                console.log(popup_details);

                let args = {
                    action: 'popup_handler',
                    template: popup_details.include_popup,
                    link: popup_details.popup_link,
                    post_id: ps_single_post_id,
                };

                SavvyTheme.instance().ajax_handler(args).then( data => {
                    SavvyTheme.instance().popup_inserter(data.callback_args, data.data);
                    
                    /**
                     * Show the popup as soon as it gets inserted into the DOM
                     */
                    this.initialize();

                    /**
                     * Remove the popup call from the ps_lrc_resources
                     */
                    ps_lrc_resources.forEach(function(item, index, object) {
                        if (item.resource_name == 'lrc_popups') {
                            object.splice(index, 1);
                        }
                    });

                }).catch( error => {
                    console.log( error );
                });
            }
            else {
                this.initialize();
            }
        }
        else{
            if( !popup_details ){
                setTimeout(() => {
                    console.log('Triggering the popup');
                    this.initialize();
                }, 25000);
            }
            else {
                /**
                 * Do nothing here.
                 * if the popup is set to be called from
                 * the lrc then wait for the callback to 
                 * creates a new instance of this class.
                 * 
                 * @see SavvyTheme.popup_inserter();
                 */
            }
        }
    }

    initialize() {
        this.popup = document.getElementById('ps-popup');
        if(!this.popup){
            return;
        }

        /**
         * Add the active class.
         */
        this.popup.classList.add('ps-popup__active');
        this.register_close_buttons();
        this.register_triggers();
    }

    register_triggers() {
        let triggers = this.popup.querySelectorAll('.ps-triggers');

        if(triggers) {
            Array.prototype.forEach.call(triggers, (trigger) => {
                SavvyTriggers.register_trigger(trigger);
            });
        }
    }
}

export default SavvyPopup;
