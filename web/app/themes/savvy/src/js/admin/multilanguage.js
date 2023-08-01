/**
 * Handles the Multilanguage Admin Options of the Theme
 *
 * @package Savvy Theme
 * */

import AjaxHandler from "./ajax-handler";

 class PsMultilanguage {
	constructor() {

        if (document.readyState != "loading") {
            this.initialize();
        }
        else {
            document.addEventListener("DOMContentLoaded", () => {
                this.initialize();
            });
        }
	}

    initialize() {
        this.url                = window.location.href;
        this.post_translated    = false;

        this.check_translation_status();
        this.check_pll_metabox();
        this.remove_tags_from_url();
    }

    check_translation_status() {
        if(this.url.includes('&gt_api=success')){
            this.post_translated = true;
        }
    }

    remove_tags_from_url(){

        this.url = this.url.replace( '&auto_translate=yes', '' );
        this.url = this.url.replace( '&gt_api=success', '' );
        window.history.replaceState({}, document.title, this.url);
    }

    check_pll_metabox() {
        setInterval( () => {
            let pll_metabox = document.querySelector('.pll-metabox-location');        
    
            if(pll_metabox){
                if(!pll_metabox.getAttribute('gtapi-inserted')){
                    pll_metabox.setAttribute('gtapi-inserted', true);
                    this.pll_metabox = pll_metabox.parentNode;
                    this.init();
                }
            }
        } , 1000);

    }

    disable_translate_btn(){
        this.button.innerHTML    = 'Translating';
        this.button.setAttribute('aria-disabled', true);
        this.button.classList.add('is-busy');
    }

    enable_translate_btn() {
        this.button.innerHTML    = 'Translate';
        this.button.setAttribute('aria-disabled', false);
        this.button.classList.remove('is-busy');
    }

    read_selected_language() {
        let selected_language = document.querySelector('.ps-gtapi_target_language');

        return selected_language.value;
    }

    get_translation_options() {
        let input_options   = document.querySelectorAll('.ps-gtapi_options input'),
            options         = [];

        Array.prototype.forEach.call(input_options, (option) => {
            console.log(option);
            
            if(option.checked){
                const name = option.getAttribute('name');
                options.push(name);
            }
        });

        return options.toString();
    }


    register_events(){
        this.button     = this.pll_metabox.querySelector('#ps_gtapi_btn_translate');
        let self        = this;

        this.button.addEventListener('click', () => {
            /**
             * If the button is busy, then
             * skip the click
             */
            if(self.button.classList.contains('is-busy')){
                return;
            }

            /**
             * Removing the message.
             */
             this.show_message('', '');

            self.disable_translate_btn();
            
            let args = {
                action:                 'gtapi_hanlder',
                post_id:                ps_gtapi_post_info.post_id,
                target_lang:            this.read_selected_language(),
                translations_options:   this.get_translation_options(),
            };

            AjaxHandler.call(args, ps_gtapi_post_info.nonce).then(data => {                
                if(data.status == 'success'){
                    this.button.innerHTML = 'Reloading Page';
                    window.location.href += '&gt_api=success'; 
                }
                else {
                    console.log('Error received from server');
                    this.show_message('There was an error during the trasnlation. Error: ' + data.message.error, 'error');
                    self.enable_translate_btn();
                }

            }).catch( error => {
                console.log( error );
            });

        });
    }

    get_target_language_dropdown() {
        console.log('Getting the languages list');

        let options = '',
            label   = '<label>Translate to</label>';

        ps_gtapi_post_info.languages.forEach((item) => {
            const selected = (ps_gtapi_post_info.post_lang == item.slug) ? 'selected="selected"' : '';
            options += '<option value="' + item.slug + '" ' + selected + ' >' + item.name + '</option>';
        });

        return label + '<select class="ps-gtapi_target_language">' + options + '</select>';
    }

    show_message(message, type = ''){
        this.message_container.innerHTML = message;
        this.message_container.setAttribute('class', 'ps-gtapi_message ' + type);
    }

    get_trasnlation_options(post_type){
        const title             = '<div><label class="switch"><input id="ps-gtapi-translate-title" name="post_title" type="checkbox" checked="checked"><span class="slider"></span></label><label for="ps-gtapi-translate-title">Title</label></div>',
            slug                = '<div><label class="switch"><input id="ps-gtapi-translate-slug" name="post_name" type="checkbox" checked="checked"><span class="slider"></span></label><label for="ps-gtapi-translate-slug">Slug</label></div>',
            content             = '<div><label class="switch"><input id="ps-gtapi-translate-content" name="post_content" type="checkbox" checked="checked"><span class="slider"></span></label><label for="ps-gtapi-translate-content">Content</label></div>',
            intro               = '<div><label class="switch"><input id="ps-gtapi-translate-intro" name="post_meta__intro" type="checkbox" checked="checked"><span class="slider"></span></label><label for="ps-gtapi-translate-intro">Intro</label></div>',
            tldr_title          = '<div><label class="switch"><input id="ps-gtapi-translate-tldr-title" name="post_meta__tldr_title" type="checkbox" checked="checked"><span class="slider"></span></label><label for="ps-gtapi-translate-tldr-title">TLDR Title</label></div>',
            tldr_content        = '<div><label class="switch"><input id="ps-gtapi-translate-tldr-content" name="post_meta__tldr_content" type="checkbox" checked="checked"><span class="slider"></span></label><label for="ps-gtapi-translate-tldr-content">TLDR Content</label></div>',
            yoast_description   = '<div><label class="switch"><input id="ps-gtapi-translate-yoast-metadecription" name="post_meta___yoast_wpseo_metadesc" type="checkbox" checked="checked"><span class="slider"></span></label><label for="ps-gtapi-translate-yoast-metadecription">Yoast Meta Decription</label></div>',
            yoast_focus_keyword = '<div><label class="switch"><input id="ps-gtapi-translate-yoast-focuskey" name="post_meta___yoast_wpseo_focuskw" type="checkbox" checked="checked"><span class="slider"></span></label><label for="ps-gtapi-translate-yoast-focuskey">Yoast Focus Keyword</label></div>',
            summary_bullets     = '<div><label class="switch"><input id="ps-gtapi-translate-summary-bullets" name="post_meta__summary_bullets" type="checkbox" checked="checked"><span class="slider"></span></label><label for="ps-gtapi-translate-summary-bullets">Summary Bullets</label></div>';

        let options = title + slug + content + yoast_description + yoast_focus_keyword;
        if( post_type == 'post' ){
            options += summary_bullets;
        }
        else {
            options += intro + tldr_title + tldr_content;
        }

        return '<div class="ps-gtapi_options">' + options + '</div>';
    }

    init(){
        if(!ps_gtapi_post_info){
            console.log('ps_gtapi_post_info is missing');
            return;
        }

        this.pll_metabox = document.querySelector('.pll-metabox-location').parentNode;  
        
        let gt_metabox = document.createElement('div'),
        label      = '<br><p><strong>Google Translate API</strong></p>',
        button     = '<button id="ps_gtapi_btn_translate" class="ps-gtapi_translate_btn components-button is-primary" type="button" aria-disabled="false">Translate Now</button>',
        message    = '<p class="ps-gtapi_message"></p>';
        
        gt_metabox.innerHTML = '<div class="ps-gtapi"></div>' + label + this.get_trasnlation_options(ps_gtapi_post_info.post_type) + this.get_target_language_dropdown() + button + message + '</div>';
        
        this.pll_metabox.appendChild(gt_metabox);
        this.register_events();
        
        this.message_container  = document.querySelector('.ps-gtapi_message');
        if(this.post_translated){
            this.show_message('Post Translated Successfully', 'success');
        }
    }

}

export default PsMultilanguage;