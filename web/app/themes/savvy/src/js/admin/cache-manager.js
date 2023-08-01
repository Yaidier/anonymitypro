/**
 * Handles the Multilanguage Admin Options of the Theme
 *
 * @package Privacysavvy
 * */

 import AjaxHandler     from "./ajax-handler";
 import Notifications   from "./notifications";

 class CacheManager {
	constructor() {

        if ( document.readyState != "loading" ) {
            this.initialize();
        }
        else {
            document.addEventListener( "DOMContentLoaded", () => {
                this.initialize();
            });
        }
	}

    initialize() {
        let purge_cache_btn     = document.querySelector('#wp-admin-bar-ps-cache_purge'),
            purge_cache_icon    = purge_cache_btn.querySelector('.ps-flush_cache_icon');

        purge_cache_btn.addEventListener('click', function (){

            let args = {
                action: 'cache_hanlder'
            };

            purge_cache_icon.classList.add('ps-animation_rotate');

            AjaxHandler.call(args).then(data => {                
                if(data.status == 'success'){
                    console.log('Success');
                    let notifications = new Notifications();
                    notifications.insert_new_notice(data);

                    setTimeout(() => {
                        purge_cache_icon.classList.remove('ps-animation_rotate');
                    }, 2000);
                }
                else {
                    console.log('Error received from server');
                }

            }).catch( error => {
                console.log( error );
            });
        });
    }
}

export default CacheManager;