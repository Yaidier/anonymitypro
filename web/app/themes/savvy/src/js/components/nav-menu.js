/**
 * Handles the Nav Menu of the Theme
 *
 * @package Savvy
 * */


 class SavvyNavMenu {
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
        this.theme_header   = document.querySelector('#ps-header');
        this.nav_menu       = document.querySelector('#ps-header_main_nav_menu');

        if(this.theme_header && this.nav_menu) {
            this.prevent_default_on_mobile();
            this.register_open_mobile_nav();
            this.register_close_btn();
        }
	}

    register_open_mobile_nav() {
        let self        = this,
            open_btns   = this.theme_header.querySelectorAll('.ps-header_nav_menu_btn__open');

        Array.prototype.forEach.call(open_btns, (btn) => {
            btn.addEventListener('click', () => {
                self.theme_header.classList.add('ps-header_nav_menu__active');
            });
        });
    }

    register_close_btn() {
        let self       = this,
            close_btns = this.theme_header.querySelectorAll('.ps-header_nav_menu_btn__close');

        Array.prototype.forEach.call(close_btns, (btn) => {
            btn.addEventListener('click', () => {
                self.theme_header.classList.remove('ps-header_nav_menu__active');
            });
        });
    }

    prevent_default_on_mobile() {
        let self                        = this,
            items_to_prevent_default    = self.nav_menu.querySelectorAll('.ps-prevent_default_mobile');

        Array.prototype.forEach.call(items_to_prevent_default, function(item, i) {
            item.addEventListener('click', function(e){
                if(!self.is_on_mobile_view()) {
                    return;
                }

                if( !self.is_dropdwon_link(item) ){
                    return;
                }

                e.preventDefault();
            });
        });

        window.addEventListener('resize', function(){
            self.is_on_mobile_view();
        }, { passive: true });
    }

    is_dropdwon_link(item) {
        let sibliings = item.parentNode.children,
            status    = false;

        Array.prototype.forEach.call(sibliings, function(sibling, i) {
            if( sibling.classList.contains('ps-header__dropdown') ) {
                status = true;
            }
        });

        return status;
    }

    is_on_mobile_view() {
        if( window.screen.width < 1110 ) {
            return true;
        }

        return false;
    }
}

export default SavvyNavMenu;
