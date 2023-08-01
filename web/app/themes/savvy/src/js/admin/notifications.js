/**
 * Handles the Notifications Admin Options of the Theme
 *
 * @package Savvy Theme
 * */

 class Notifications {
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

    is_auto_dismissible(notification) {
        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);
    }

    hide_all_notifications() {
        Array.prototype.forEach.call( this.admin_notifications, ( notification ) => {
            notification.classList.remove('active');
        });
    }

    init() {
        this.admin_notifications = document.querySelectorAll('.ps-admin_notice');
        let self = this;

        Array.prototype.forEach.call(this.admin_notifications, (notification) => {
            setTimeout(() => {
                notification.classList.add('active');
                
                if(notification.classList.contains('auto_dismissible')){
                    this.is_auto_dismissible(notification);
                }
            }, 1000);

            /**
             * Register close btn event
             */
            let close_btn = notification.querySelector('.ps-admin_notice_close');

            close_btn.addEventListener('click', () => {
                notification.classList.remove('active');
            });
        } );

        /**
         * Adding event listerner for Publish/Update button
         */
        if(!self.is_update_btn_event){
            let update_btn_interval = setInterval(() => {
                self.update_btn = document.querySelector('.editor-post-publish-button');

                if(!self.is_update_btn_event && self.update_btn && self.update_btn.innerHTML == 'Update' ){
                    self.is_update_btn_event = true;
                    self.update_btn.addEventListener('click', function() {
                        console.log('click on Update btn');
                        self.hide_all_notifications();
                        self.wait_for_btn_to_be_ready(self.update_btn);
                    }); 
    
                    clearInterval(update_btn_interval);           
                }
            }, 500);
        }
    }

    static async call_admin_ajax(data = false) {
        if(typeof ajax_var == 'undefined' || !data){
            return;
        }

        let request = new XMLHttpRequest(),
            url     = new URL(ajax_var.url);

        Object.entries(data).forEach(([key, value]) => {
            url.searchParams.append( key, value );
        });

        return await new Promise((resolve, reject) => {
            request.open( 'GET', url.href, true );
            request.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    resolve(JSON.parse(this.response));
                } else {
                    reject(this);
                }
            };
                
            request.onerror = function() {
                reject(this);
            };
    
            request.send();
        });
    }

    insert_new_notice(data) {
        /**
         * Remove old notifications
         */
        let old_notifications   = document.querySelectorAll('.ps-admin_notice'),
            wrapper             = document.createElement('div'),
            wp_wrap             = document.querySelector('#wpwrap');

        Array.prototype.forEach.call(old_notifications, (old_notifications) => {
            if (old_notifications.parentNode !== null) {
                old_notifications.parentNode.removeChild(old_notifications);
            }
        });

        wrapper.innerHTML = data.content;
        wp_wrap.appendChild(wrapper);

        this.init();
    }

    wait_for_btn_to_be_ready(update_btn) {
        let self = this;

        let wait_for_btn_ready_interval = setInterval(() => {
            const is_aria_disabled = update_btn.getAttribute('aria-disabled');

            console.log(is_aria_disabled);

            if( is_aria_disabled == 'false' ){
                clearInterval(wait_for_btn_ready_interval);

                let args = {
                    action: 'get_schema_status',
                    schema_type: 'review',
                    post_id: ps_admin_post_id,
                };
        
                self.constructor.call_admin_ajax(args).then(data => {
                    if( data.status == 'success' ){
                        self.insert_new_notice(data);
                    }
                    else {
                        console.log('status: ' + data.status + ' | ' + 'message: ' + data.message);
                    }
                })
                .catch(error => {
                    console.log('error');
                    console.log(error);
                });
            }
        }, 500);
    }
}

export default Notifications;