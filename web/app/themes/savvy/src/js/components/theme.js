/**
 * Handles the Core Theme App of the Theme
 *
 * @package Savvy 
 * */

 import SavvyTriggers   from "./triggers";
 import Glider          from "./glider";
 import SavvySharer     from "./sharer";
 import SavvyPopup      from "./popup";
 import SavvyTableOfContents from "./table-of-contents";

  /**
  * The FUI function excutor. This function callbacks 
  * all the functions declared into the fui_events array.
  * 
  * Note: This function needs to be outside of the scope of 
  * the SavvyTheme class, so we can remove the event listeners 
  * if all the handlers were removed.
  * 
  * @see SavvyTheme.instance().fui_remove_event()
  * 
  */
   function ps_fui_executor() {
    const fui_events = SavvyTheme.instance().get_fui_events();

    Array.prototype.forEach.call(fui_events, (fui_event) => {
        SavvyTheme[fui_event.callback]();
    });
}

 class SavvyTheme {
    static start() {
        if (document.readyState != "loading") {
            this.init();
        }
        else {
            document.addEventListener("DOMContentLoaded", () => {
                this.init();
            });
        }
	}

    /**
     * Work only with one instance of the SavvyTheme class
     */
    static instance() {
        if (!this.instance_obj) {
            this.instance_obj = this;
        }
        return this.instance_obj;
    }

    /**
     * 
     * @returns the fui_events array
     */
     static get_fui_events() {
        return this.fui_events;
    }

    /**
     * Register the First User Interaction (FUI) events.
     * 
     * FUI events are intented to execute functions right after the, 
     * very first interaction of the user (either mouse move or scroll).
     * However the functions attached needs to be removed later on the code using the 
     * fui_remove_event() function.
     */
    static fui_events_register() {
        document.addEventListener('mousemove', ps_fui_executor, { passive: true });
        document.addEventListener('scroll', ps_fui_executor, { passive: true });
    }

    static fui_add_event(handler, callback){
        /**
         * If the event do not exists, 
         * the we need to register it.
         */
        if(this.fui_events.length < 1){
            this.fui_events_register();
        }

        /**
         * Pushing the hanlders and the callbacks
         */
        this.fui_events.push({
            handler: handler,
            callback: callback,
        });
    }

    /**
     * Remove an event by giving the handler name
     */
    static fui_remove_event(handler) {
        this.fui_events.forEach((fui_event, index, object) => {
            if(fui_event.handler == handler){
                object.splice(index, 1);
            }
        });

        /**
         * Check if there the event removed was the last one on the fui_events array,
         * if so, then remove the event listeners
         */
        if(this.fui_events.length < 1){
            document.removeEventListener('mousemove', ps_fui_executor);
            document.removeEventListener('scroll', ps_fui_executor);
        }
    }

    static get_cookie(cname) {
        let name            = cname + "=",
            decodedCookie   = decodeURIComponent(document.cookie),
            ca              = decodedCookie.split(';');

        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }

        return false;
    }

    static set_cookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

        let expires     = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    static cookie_bar(){
        let self            = this,
            cookie_element  = document.querySelector('.ps-cookiebar');

        if(!cookie_element){
            return;
        }

        let cookie_value = this.get_cookie('ps_cookie_policy');

        if(cookie_value == 'true'){
            return;
        }

        cookie_element.classList.remove('hidden');

        /**
         * Register Cookie Consent Button
         */
        let consent_btn = cookie_element.querySelector('.ps-cookiebar_btn');

        consent_btn.addEventListener('click', function(){
            self.set_cookie('ps_cookie_policy', true, 365);
            cookie_element.classList.add('hidden');
        });
    }

    static get_the_gtm() {
        /**
         * This function is declared in
         * Optimizations::load_gtm_on_fui_event();
         */
        ps_load_gtm_on_fui();

        console.log('FUI GTM Loaded');
        this.fui_remove_event('fui_gtm_later');
    }

    static get_gtm_later() {
        if (typeof ps_load_gtm_on_fui !== 'undefined' && ps_load_gtm_on_fui != '') {
            this.fui_add_event('fui_gtm_later', 'get_the_gtm');
        }
    }

    static popup_inserter(args, data_content){
        /**
         * Inserting the popup into the DOM
         */
        this.dom_inserter(args, data_content, true);

        /**
         * Registering events right after 
         * we insert the popup into the DOM
         */
        new SavvyPopup();
    }

    static dom_inserter(args, data_content, is_append = false){
        args = args.split(',');

        if(args[0] === undefined || data_content === undefined){
            return;
        }

        let parent = document.querySelector(args[0]);
            
        if(!parent){
            return;
        }

        if(is_append){
            let new_node        = document.createElement('div');
            new_node.innerHTML  = data_content;

            parent.appendChild(new_node);
        }
        else {
            parent.innerHTML = data_content;
        }
    }

    static display_the_ldl_content() {
        if ((typeof ps_ldl == 'undefined') || this.ldl_already_fired) {
            return;
        }

        if(!ps_ldl) {
            return;
        }

        this.ldl_already_fired = true;
 
        console.log('LDL');
        
        let ldl_node = document.getElementById('ps-late_dom_load'),
            triggers = undefined;

        if(!ldl_node){
            return;
        }

        let ldl_content = ldl_node.innerHTML;

        ldl_content     = ldl_content.replace('<!-- {{ldl}}', '');
        ldl_content     = ldl_content.replace('{{ldl}} -->', '');
        ldl_node.parentElement.innerHTML += ldl_content;

        /**
         * Remove the LDL content wrapper.
         */
        document.getElementById('ps-late_dom_load').remove();

        /**
         * Registering Triggers for Later DOM Load Elements
         */
        triggers = document.querySelector('.ps-post_content').querySelectorAll('.ps-triggers');
        if(triggers) {
            SavvyTriggers.register_triggers(triggers);
        }

        /**
         * Loading the Table of Content live progress bar script
         */
        new SavvyTableOfContents(true);

        /**
         * If we are loading lrc resources for this page then we better 
         * load the lrc scripts once those resources are inserted into the DOM.
         */
        if(!this.check_lrc_resources()) {
            console.log('Loading LRC Scripts from LDL');
            this.loading_lrc_scripts();
        }

        this.fui_remove_event('fui_later_dom_load');
    }

    static later_dom_load() {
        /**
         * Don't wait for the the FUI event if there is an 'hash' on the url,
         * call the function right away instead.
         * 
         * Add the callback of the function to an FUI envent otherwise.
         */
        if( this.is_hash_url ){
            this.display_the_ldl_content();
        }
        else {
            this.fui_add_event('fui_later_dom_load', 'display_the_ldl_content');
        }
    }

    static loading_lrc_scripts(){
        if(this.lrc_scripts_fired){
            return;
        }

        let lrc_scripts = document.querySelectorAll('.ps-lrc_scripts');

        Array.prototype.forEach.call(lrc_scripts, (lrc_script) => {
            lrc_script.setAttribute('src', lrc_script.getAttribute('data-src'));
        });

        this.lrc_scripts_fired = true;
    }

    static lrc_post_last_sections(args, data_content) {
        this.dom_inserter(args, data_content);

        args = args.split(',');

        if(args[0] === undefined){
            return;
        }

        let parent = document.querySelector(args[0]);
        
        /**
         * Registering the Gliders
         */
        let gliders = parent.querySelectorAll('.wn-carousel');
        Array.prototype.forEach.call( gliders, ( carousel ) => {
            new Glider( carousel );
        } ); 

        /**
         * Registering the Sharer
         */
         new SavvySharer();
    }

    static check_lrc_resources() {
        if ((typeof ps_lrc_resources == 'undefined')) {
            return false;
        }

        if( !ps_lrc_resources.length ){
            return false;
        }

        return true;
    }

    static get_the_resources(){
        let self = this;

        if (!this.check_lrc_resources() || this.lrc_already_fired) {
            return;
        }

        Array.prototype.forEach.call(ps_lrc_resources, (resource) => {
            console.log('LRC for ' + resource.resource_name);                
        });

        this.lrc_already_fired  = true;
        ps_lrc_resources        = JSON.stringify(ps_lrc_resources);

        let args = {
            action: 'lrc_handler',
            resources: ps_lrc_resources,
            post_id: ps_single_post_id,
        };

        this.ajax_handler(args)
        .then(data => {
            console.log( 'Data Received: ' );
            console.log(data);
            
            if(typeof data === 'object'){

                data.forEach(function (resource, index) {
                    const response_callback  = resource.callback ?? false;
                    const response_args      = resource.callback_args ?? false;

                    switch (response_callback) {
                        case 'dom_inserter':
                            self.dom_inserter(response_args, resource.data);
                            break;
                        case 'lrc_post_last_sections':
                            self.lrc_post_last_sections(response_args, resource.data);
                            break;
                        case 'popup_inserter':
                            self.popup_inserter(response_args, resource.data);
                            break;
                        default:
                            break;
                    }
                });

                console.log('Loading LRC Scripts from LRC');
                self.loading_lrc_scripts();
            }
        })
        .catch(error => {
            console.log(error);
        });

        this.fui_remove_event('fui_later_resource_call', 'get_the_resources');
    }

    static later_resource_call(){
        /**
         * Don't wait for the the FUI event if there is an 'hash' on the url,
         * call the function right away instead.
         * 
         * Add the callback of the function to an FUI envent otherwise.
         */
        if( this.is_hash_url ){
            this.get_the_resources();
        }
        else {
            this.fui_add_event('fui_later_resource_call', 'get_the_resources');
        }
    }

    static check_if_hash_in_url(){
        /**
         * If we find # on the url, 
         * then we need to trigger the popup right away.
         */
        this.url           = new URL(window.location.href);
        this.is_hash_url   = this.url.hash.includes('#');
    }

    static scroll_to_heading() {
        /**
         * Return if there is not hash set onb the url.
         */
        if(!this.is_hash_url){
            return;
        }
        
        const heading = document.querySelector(this.url.hash);

        /**
         * Return if the heading isn't in the post content.
         */
        if(!heading){
            return;
        }

         /**
         * Return if the the browser already scrolled 
         * to the heading position.
         */
        if(window.scrollY > 10){
            return;
        }
        
        /**
         * Scroll the window to the heading position.
         */
        window.scrollTo({
            left: 0,
            top:  window.scrollY + heading.getBoundingClientRect().top,
            behavior: 'smooth'
        });

    }

    /**
     * Utility Ajax Hanlder Function
     */
     static async ajax_handler(data = false, nonce = '') {
        console.log('Running the handler');
        console.log(ajax_var);
        
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

    static static_files_cache() {
        if ( typeof ajax_var.cache_status !== 'undefined' && ajax_var.cache_status != '{{cachestatus}}' ) {
            console.log('Serving a Cached Page (' + ajax_var.cache_status + ')');
        }
    }

    static load_fonts_later() {
        savvy_load_fonts_on_fui.forEach(( fui_font ) => {
            document.documentElement.style.setProperty(fui_font.cssvar, fui_font.family);
        });

        this.fui_remove_event('load_fonts_later_handler');
    }
    
    static load_custom_font() {
        /**
         * If variable is undefined or ,
         * then just return.
         */
        if( 'undefined' == typeof savvy_load_fonts_on_fui ){
            return;
        }

        /**
         * If variable is empty, then return.
         */
        if( savvy_load_fonts_on_fui.length < 1 ){
            return;
        }
        
        this.fui_add_event('load_fonts_later_handler', 'load_fonts_later');
    }

    /**
     * 
     * Back to Top Button
     * 
     * */
     static totop_btn() {
        let totop_btn = document.querySelector('.ps-btn_back_totop');

        if(!totop_btn) {
            return;
        }

        //Scroll back to top when click
        totop_btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0, 
                behavior: 'smooth'
            });
        });

        //Hide it when gets close to the header
        window.addEventListener('scroll', (e) => {
            if(window.pageYOffset > 300) {
                totop_btn.classList.add('ps-trans_fade_in');
            }
            else {
                totop_btn.classList.remove('ps-trans_fade_in');
            }
        }, { passive: true });
    }

    static init() {
        console.log('MAIN CORE APP ');

        this.fui_events = [];

        this.static_files_cache();
        this.load_custom_font();
        this.check_if_hash_in_url();
        this.totop_btn();
        this.cookie_bar();
        this.get_gtm_later();
        this.later_resource_call();
        this.later_dom_load();
        this.scroll_to_heading();
    }
}

export default SavvyTheme;