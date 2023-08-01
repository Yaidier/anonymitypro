/**
 * Handles the Article Score App of articles
 *
 * @package Privacysavvy
 * */

 import AjaxHandler from "../admin/ajax-handler";

 class SavvyArticleScore {
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

    init() {
        console.log('ARTICLE SCORE APP');
        this.as = document.querySelector('.ps-article_score');

        if( !this.as ){
            return;
        }

        this.current_rate       = null;
        this.disable_events     = false;
        this.is_mobile          = (screen.width < 1110) ? false : true;    
        this.stars_type         = { full: 'star_full', half: 'star_half_empty', empty: 'star_radial' };
        this.rating_values      = Object.assign({}, this.as.dataset.labels.split(','));
        this.content_wrap       = document.querySelector('.ps-post_content');
        this.toc_wrap           = document.querySelector('.ps-table_of_contents');
        this.stars_wrap         = this.as.querySelector('.ps-article_score_stars');
        this.stars              = this.stars_wrap.querySelectorAll('i');
        this.info               = this.as.querySelector('.ps-article_score_info');
        this.subinfo            = this.as.querySelector('.ps-article_score_subinfo');
        this.thanks             = this.as.querySelector('.ps-article_score_subinfo_thanks');
        this.star_full_model    = this.as.querySelector('.ps-article_score_stars_models .savvy-icon_star_full');
        this.star_empty_model   = this.as.querySelector('.ps-article_score_stars_models .savvy-icon_star_radial');
        this.star_half_model    = this.as.querySelector('.ps-article_score_stars_models .savvy-icon_star_half_empty');
        this.info_value         = this.info.innerHTML;
        
        this.get_inital_stars_configuration();
        this.stars_wrap_events();
        this.stars_events();
        this.move_element();
        this.on_mobile_event();
    }

    get_inital_stars_configuration() {
        this.initial_stars_config = [];

        Array.prototype.forEach.call(this.stars, (star) => {
            this.initial_stars_config.push( star.getAttribute('class') );
        });
    }

    move_after_content(){
        this.content_wrap.parentNode.insertBefore(this.as, this.content_wrap.nextSibling);
    }

    move_to_sidebar() {
        this.toc_wrap.parentNode.insertBefore(this.as, this.toc_wrap.nextSibling);
    }

    move_element(){
        if(!this.toc_wrap){
            return;
        }

        if(screen.width < 1110 ){
            if(this.is_mobile == false){
                this.move_after_content();
                this.is_mobile = true;
            }
        }
        else {
            if(this.is_mobile == true){
                this.move_to_sidebar();
                this.is_mobile = false;
            }
        }
    }
    
    on_mobile_event() {
        let self = this;

        window.addEventListener('resize', function() {
            self.move_element()
        }, true);
    }

    show_rating_value(i){
        this.current_rate   = i;
        this.info.innerHTML = this.rating_values[i - 1];
    }

    stars_wrap_events() {
        this.stars_wrap.addEventListener('mouseleave', () => {
            let i = 0;

            if(this.disable_events){
                return;
            }

            Array.prototype.forEach.call(this.stars, (star) => {
                let star_class  = this.initial_stars_config[i],
                    star_type   = '';

                for( const key of Object.keys(this.stars_type) ){
                    if( star_class == this.stars_type[key] ){
                        star_type = key;
                    }
                }

                star.setAttribute('class', this.stars_type[star_type]);

                if( star_type == 'empty' ){
                    star.innerHTML = this.star_empty_model.innerHTML;
                }

                if( star_type == 'half' ){
                    star.innerHTML = this.star_half_model.innerHTML;
                }

                if( star_type == 'full' ){
                    star.innerHTML = this.star_full_model.innerHTML;
                }

                i++;
            });

            this.info.innerHTML = this.info_value;
        });
    }

    already_voted(){
        this.disable_events = true;
        this.subinfo.classList.add('hidden');
        this.thanks.classList.remove('hidden');
    }

    send_vote_to_server(vote){
        if( !ps_single_post_id ){
            console.log('Error sending vote to server, \'post_id\' is missing');
            return;
        }
        if( !vote ){
            console.log('Error sending vote to server, \'vote value\' is missing');
            return;
        }

        let args = {
            action: 'article_score_handler',
            post_id: ps_single_post_id,
            vote: vote
        };

        AjaxHandler.call(args).then( data => {
            console.log(data);
        }).catch( error => {
            console.log( error );
        });
    }

    stars_events() {
        let current_stars_conf  = {};
        let i                   = 0;

        Array.prototype.forEach.call( this.stars, (star) => {
            if( !this.currrent_stars_conf ){
                for(const key of Object.keys(this.stars_type)){
                    if( star.classList.contains(this.stars_type[key]) ){
                        current_stars_conf[i] = this.stars_type[key];
                        i++;
                    }
                }
            }

            this.register_star_mouse_over_event(star);
            this.register_star_mouse_leave_event(star);
            this.register_star_click_event(star);
    
            if( !this.currrent_stars_conf ){
                this.currrent_stars_conf = current_stars_conf;
            }
        });
    }

    register_star_mouse_over_event(star){
        star.addEventListener('mouseover', () => {
            if(this.disable_events){
                return;
            }

            if(this.current_hover_star == star){
                return;
            }

            this.current_hover_star = star;
            this.fill_up_to_this_star(star);
        });
    }

    register_star_mouse_leave_event(star){
        star.addEventListener('mouseleave', () => {
            if(this.disable_events){
                return;
            }

            this.current_hover_star = null;
        });
    }

    register_star_click_event(star) {
        star.addEventListener('click', () => {
            if(this.disable_events){
                return;
            }

            this.already_voted();

            /**
             * Read cookie if exist 
             */
             this.setCookie('ps-article-score-voted', false, 0);
            if (!this.getCookie('ps-article-score-voted')) {
                this.setCookie('ps-article-score-voted', true, 7);
                this.send_vote_to_server(this.current_rate);
            }
        } );
    }

    setCookie(cname, cvalue, days) {
        const d = new Date();

        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires     = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname) {
        let name            = cname + "=";
        let decodedCookie   = decodeURIComponent(document.cookie);
        let ca              = decodedCookie.split(';');

        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
      }

    fill_up_to_this_star(hovered_star){
        let equal_reached   = false;
        let i               = 1;

        Array.prototype.forEach.call( this.stars, (star) => {           
            for( const key of Object.keys(this.stars_type) ){
                star.classList.remove(this.stars_type[key]);
            }

            if( !equal_reached ) {
                star.innerHTML = this.star_full_model.innerHTML;
                star.classList.add(this.stars_type['full']);
            }
            else {
                star.innerHTML = this.star_empty_model.innerHTML;
                star.classList.add(this.stars_type['empty']);
            }

            if( hovered_star == star ){
                equal_reached = true;
                this.show_rating_value(i);
            }

            i++;
        } );
    }
}

export default SavvyArticleScore;