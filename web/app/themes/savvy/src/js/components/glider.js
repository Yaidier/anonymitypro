/**
 * Handles the Glider
 *
 * @package Privacysavvy
 * 
 * */

 class Glider {
    constructor( carousel ) {
        /**
         * Get Carousel Wrapper.
         */
        this.carousel = carousel.querySelector( '.wn-carousel_wrapper' );
        
        /**
         * If Carousel Wrapper do not exist, then we proably are with a new version of the carousel,
         * so lets set up the elements.
         */
        if( !this.carousel ){
            /**
             * Setup carousel elements.
             */
            this.setup_carousel_elements( carousel );

            /**
             * Try to get the carousel wrapper again.
             */
            this.carousel = carousel.querySelector( '.wn-carousel_wrapper' );
        }

        /**
         * Get the other elements of the carousel.
         */
        this.carousel_slider    = this.carousel.querySelector( '.wn-carousel_slider' );
        this.carousel_items     = this.get_carousel_items();
        
        //We need at least two items to be able of slide
        if( this.carousel_items.length > 1 ) {
            this.init_carousel( carousel );
        }
    }

    setup_carousel_elements( carousel ) {
        /**
         * Create the carousel wrapper.
         */
        let carousel_wrapper = document.createElement('div');
        carousel_wrapper.classList.add('wn-carousel_wrapper');
        carousel_wrapper.style.overflow = 'hidden';

        /**
         * Create the carousel slider.
         */
        let carousel_slider = document.createElement('div');
        carousel_slider.classList.add('wn-carousel_slider');
        carousel_slider.style.display = 'flex';

        /**
         * Append all carousel items to the slider.
         */
        carousel.querySelectorAll('.wn-carousel_item').forEach((item) => {
            carousel_slider.append(item);
        });

        /**
         * Append the carousel slider to the carousel wrapper.
         */
        carousel_wrapper.append(carousel_slider);

        /**
         * Append the wrapper to the carousel element.
         */
        carousel.append(carousel_wrapper);

        /**
         * Remove flex style from the carousel.
         */
        carousel.style.display = 'block';
    }

    init_carousel( carousel ) {
        console.log('Timeout');
        console.log(carousel.dataset.autoplaydelay);

        this.carousel.slides_to_show_desktop    = carousel.dataset.desktop  ?? ( this.carousel.dataset.desktop  ?? 3 );
        this.carousel.slides_to_show_tablet     = carousel.dataset.tablet   ?? ( this.carousel.dataset.tablet   ?? 2 );
        this.carousel.slides_to_show_mobile     = carousel.dataset.mobile   ?? ( this.carousel.dataset.mobile   ?? 1 );
        this.carousel.is_autoplay               = carousel.dataset.autoplay ?? 'false';
        this.carousel.transition_duration       = parseInt(carousel.dataset.duration ?? 400);
        this.carousel.transitiontype            = carousel.dataset.transitiontype ?? 'ease';
        this.carousel.autoplay_direction        = carousel.dataset.autoplaydirection ?? 'right';
        this.carousel.autoplay_delay            = parseInt(carousel.dataset.autoplaydelay ?? 0);
        this.carousel.is_nav_buttons_active     = true;
        this.carousel.items_lateral_margin_sum  = this.get_element_lateral_margin_sum();
        this.carousel.wrapper_lateral_padding   = this.get_wrapper_lateral_padding_sum();

        this.set_slides_to_show();
        this.set_items_width();
        this.clone_last_item();
        this.move_slider_next( false );
        this.register_nav_btns_events();
        this.register_resize_event();
        this.register_swiper();
        this.set_autoplay();
    }

    set_autoplay(){
        let self = this;

        if( 'false' === this.carousel.is_autoplay ){
            return;
        }
        
        if( 'right' === this.carousel.autoplay_direction ){
            this.move_next();
        }
        else {
            this.move_prev();
        }
        
        if( this.carousel.autoplay_event_already_set ){
            return;
        }

        this.carousel_slider.addEventListener('transitionend', () => {
            setTimeout(() => {
                if( 'right' === self.carousel.autoplay_direction ){
                    self.move_next();
                }
                else {
                    self.move_prev();
                }
            }, self.carousel.autoplay_delay);
        });

        this.carousel.autoplay_event_already_set = true;
    }

    set_carousel_wrapper_height() {
        let carousel_swiper_height          = this.get_compouted_style( this.carousel_slider, 'height' ),
            carousel_vertical_padding_sum   = this.get_compouted_style( this.carousel, 'paddingBottom' ),
            height_to_set                   = carousel_swiper_height + carousel_vertical_padding_sum;

        
        this.set_dimmension( 'height', this.carousel, height_to_set );
    }

    get_translate_values(element) {
        const style = window.getComputedStyle(element)
        const matrix = style['transform'] || style.webkitTransform || style.mozTransform
    
        if (matrix === 'none' || typeof matrix === 'undefined') {
            return {
                x: '0',
                y: '0',
                z: '0'
            }
        }
    
        const matrixType = matrix.includes('3d') ? '3d' : '2d'
        const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
    
        if (matrixType === '2d') {
            return {
                x: matrixValues[4],
                y: matrixValues[5],
                z: 0
            }
        }
    
        if (matrixType === '3d') {
            return {
                x: matrixValues[12],
                y: matrixValues[13],
                z: matrixValues[14]
            }
        }
    }

    register_swiper(){
        let self    = this,
            xDown   = null,                                                     
            yDown   = null;

        this.carousel.addEventListener( 'touchstart', handle_touch_start, { passive: true } );        
        this.carousel.addEventListener( 'touchmove', handle_touch_move, { passive: true } );

        function get_touches( evt ) {
        return evt.touches || 
            evt.originalEvent.touches; 
        }                                                     
                                                                                
        function handle_touch_start( evt ) {
            const firstTouch = get_touches(evt)[0];   

            xDown = firstTouch.clientX;                                      
            yDown = firstTouch.clientY;                                      
        };                                                
                                                                                
        function handle_touch_move( evt ) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            let xUp     = evt.touches[0].clientX,                                  
                yUp     = evt.touches[0].clientY,
                xDiff   = xDown - xUp,
                yDiff   = yDown - yUp;
                                                                                
            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                if ( xDiff > 0 ) {
                    /* right swipe */ 
                    self.move_next();
                } else {

                    self.move_prev();
                }                       
            } 

            xDown = null;
            yDown = null;                                             
        };
    }

    get_wrapper_lateral_padding_sum() {
        const   padding_left    = this.get_compouted_style( this.carousel, 'paddingLeft' ),
                padding_right   = this.get_compouted_style( this.carousel, 'paddingRight' );

        return padding_left + padding_right;
    }

    get_wrapper_vertical_padding_sum() {
        const   padding_top         = this.get_compouted_style( this.carousel, 'paddingTop' ),
                padding_bottom      = this.get_compouted_style( this.carousel, 'paddingBottom' );

        return padding_top + padding_bottom;
    }

    set_slides_to_show() {
        const items_count = this.carousel_items.length;

        if( window.innerWidth < 1024 && window.innerWidth >= 767 ) {
            this.carousel.slides_to_show = this.carousel.slides_to_show_tablet;
        }
        else if ( window.innerWidth < 767 ) {
            this.carousel.slides_to_show = this.carousel.slides_to_show_mobile;
        }
        else {
            this.carousel.slides_to_show = this.carousel.slides_to_show_desktop;
        }

        if( items_count <= this.carousel.slides_to_show ) {
            this.carousel.slides_to_show = items_count - 1;
        }
    }

    register_resize_event(){
        let doit;

        window.addEventListener( 'resize', () => {
            const move = this.get_initial_left();

            this.set_slides_to_show();
            this.move_without_transition( move );
            this.set_items_width();

            clearTimeout(doit);

            doit = setTimeout(() => {
                this.set_autoplay();
            }, 500);
        }, true );
    }

    get_initial_left() {
        return '-' + parseFloat ( this.carousel.single_item_width + this.carousel.items_lateral_margin_sum );
    }

    clone_last_item() {
        let item        = this.get_carousel_items()[this.get_carousel_items().length - 1],
            cloned_item = item.cloneNode( true );

        item.parentNode.insertBefore( cloned_item, item.parentNode.firstChild );

        setTimeout(() => {
            if( !item.parentNode ){
                return;
            }

            item.parentNode.removeChild( item );
        }, this.carousel.transition_duration );
    }

    clone_first_item() {
        let item        = this.get_carousel_items()[0],
            cloned_item = item.cloneNode( true );

        item.parentNode.appendChild( cloned_item );

        item.parentNode.removeChild( item );
    }

    move_slider_next( is_transtion = true ) {
        const   current_translate   = this.get_translate_values(this.carousel_slider).x.replace( 'px', '' ) || 0,
                move                = parseFloat ( current_translate ) - parseFloat( ( this.carousel.single_item_width + this.carousel.items_lateral_margin_sum ) );

        if( !is_transtion ) {
            this.move_without_transition( move );
        }
        else {
            this.move_with_transition( move );
        }
    }

    move_slider_prev( is_transtion = true ) {
        const   current_translate   = this.get_translate_values(this.carousel_slider).x.replace( 'px', '' ) || 0,
                move                = parseFloat ( current_translate ) + parseFloat ( this.carousel.single_item_width + this.carousel.items_lateral_margin_sum );

        if( !is_transtion ) {
            this.move_without_transition( move );
        }
        else {
            this.move_with_transition( move );
        }
    }

    move_with_transition( move ) {
        this.carousel_slider.style.transform = 'translate3d( ' + move + 'px, 0px, 0px )';
    }

    move_without_transition( move ){ 
        this.carousel_slider.style.transition = 'none';
        this.carousel_slider.style.transform = 'translate3d( ' + move + 'px, 0px, 0px )';
        this.carousel_slider.offsetHeight;
        this.carousel_slider.style.transition = 'transform ' + ( this.carousel.transition_duration / 1000 ) + 's ' + this.carousel.transitiontype;
    }

    register_nav_btns_events(){ 
        let next_btn = this.carousel.parentNode.querySelector( '.wn-carousel_btn_next' ),
            prev_btn = this.carousel.parentNode.querySelector( '.wn-carousel_btn_prev' );

        if( !next_btn && !prev_btn ){
            return;
        }

        next_btn.addEventListener( 'click', () => {
            this.move_next();
        } );

        prev_btn.addEventListener( 'click', () => {
            this.move_prev();
        } );
    }

    nav_buttons_status() {
        if ( !this.carousel.is_nav_buttons_active ) {
            return false;
        }
        else {
            this.carousel.is_nav_buttons_active = false;
            setTimeout( () => {
                this.carousel.is_nav_buttons_active = true;
            }, this.carousel.transition_duration );
            return true;
        }
    }

    move_next(){
        if ( !this.nav_buttons_status() && !this.carousel.is_autoplay ) {
            return;
        }

        this.clone_first_item();
        this.move_slider_prev( false );
        this.move_slider_next();
    }

    move_prev(){
        if ( !this.nav_buttons_status() && !this.carousel.is_autoplay ) {
            return;
        }

        this.clone_last_item();
        this.move_slider_next( false );
        this.move_slider_prev();
    }

    get_carousel_items() {
        return this.carousel.querySelectorAll( '.wn-carousel_item' );
    }

    set_items_width() {
        let carousel_width      = this.get_compouted_style( this.carousel, 'width' ),
            item_width          = ( carousel_width / this.carousel.slides_to_show ) - this.carousel.items_lateral_margin_sum;

        Array.prototype.forEach.call( this.get_carousel_items(), ( item ) => {
            this.carousel.single_item_width = item_width;
            this.set_dimmension( 'width', item, item_width );
        } );  
    }

    get_element_lateral_margin_sum() {
        //Assuming all the items has the same margin...
        let one_item = this.carousel.querySelector( '.wn-carousel_item' );

        if( one_item ) {
            let margin_left     = this.get_compouted_style( one_item, 'marginLeft' ),
                margin_right    = this.get_compouted_style( one_item, 'marginRight' );

            return margin_left + margin_right;
        }
        
        return 0;
    }

    get_compouted_style( element, style ) {
        return parseFloat( getComputedStyle( element, null )[style].replace( "px", "" ) );
    }
    
    set_dimmension( dimmension, el, val ) {
        if ( typeof val === "function" ) val = val();
        if ( typeof val === "string" ) el.style.height = val;
        else el.style[dimmension] = val + "px";
    }
}

class SavvyGlider {
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
        let carousels = document.querySelectorAll( '.wn-carousel' );

        Array.prototype.forEach.call( carousels, (carousel) => {
            new Glider( carousel );
        } );   
        
        /**
         * Export Glider for external usage
         */
        window.wnglider = Glider;
    }
}

export default SavvyGlider;