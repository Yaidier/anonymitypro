/**
 * Handles the Table of Contents live progress bar
 *
 * @package Privacysavvy
 * */


 class SavvyTableOfContents {
	constructor(override_ldl = false) {
        if (document.readyState != "loading") {
            this.init(override_ldl);
        }
        else {
            document.addEventListener("DOMContentLoaded", () => {
                this.init(override_ldl);
            });
        }
	}

    calculate_length(heading, toc_heading, last_element){
        let heading_next_sibling = '';

        if(last_element){
            heading_next_sibling = last_element;
        }
        else {
            const toc_next_sibling = toc_heading.parentElement.nextElementSibling.nextElementSibling.children[0];
            const href_attr             = toc_next_sibling.getAttribute('href');
            heading_next_sibling  = this.post_content.querySelector(href_attr);
        }

        if(!heading_next_sibling) {
            return;
        }

        const top_dis_heading         = heading.getBoundingClientRect().top;
        const top_dis__next_sibling   = heading_next_sibling.getBoundingClientRect().top;
        const dis_between             = top_dis__next_sibling - top_dis_heading;
        const ref_point               = top_dis__next_sibling - 100;
        const percentage              = ( ref_point * 100 ) / dis_between;
        const positive_percentage     = (100 - percentage.toFixed(1));

        return positive_percentage;
    }

    draw_line(percentage){
        let active_li = this.toc.querySelector('nav > ol > li.ps-toc_heading__active');
        active_li.setAttribute('style', '--ps_toc_line_width: ' + percentage + '%;');

    }

    is_in_viewport(el) {
        return el.getBoundingClientRect().top >= 100;

    }

    do_autoscroll() {
        const active_elements_collection  = this.toc.querySelectorAll('.ps-toc_heading__active');

        if(active_elements_collection.length == 0){
            return;
        }
        
        const first_li_element            = this.toc.querySelector('nav > ol > li');
        const last_element_active         = active_elements_collection[active_elements_collection.length - 1];
        const first_li_element_dist       = first_li_element.getBoundingClientRect().top;
        const last_element_active_dist    = last_element_active.getBoundingClientRect().top;

        let toc = document.querySelector('.ps-table_of_contents');

        toc.scrollTo({
            left: 0,
            top: (last_element_active_dist - first_li_element_dist),
            behavior: 'smooth'
        });

    }

    apply_active(heading, last_element = false){
        const heading_id    = heading.getAttribute('id');
        const tag_name      = heading.tagName.toLowerCase();
        let toc_heading     = this.toc.querySelector('a[href="#' + heading_id + '"]');

        if(!toc_heading){
            return;
        }

        if(this.current_active_heading != toc_heading){
            Array.prototype.forEach.call(this.toc_lis, (this_toc_li) => {
                this_toc_li.classList.remove('ps-toc_heading__active');
            });

            if(tag_name === 'h3'){
                toc_heading.closest('li.relative').classList.add('ps-toc_heading__active');
            }

            toc_heading.parentElement.classList.add('ps-toc_heading__active');
            this.current_active_heading = toc_heading;

            this.do_autoscroll(); 
        }
        else {
            if(tag_name === 'h3'){
                toc_heading  = toc_heading.closest('li.relative').children[0];
                heading      = this.post_content.querySelector(toc_heading.getAttribute('href'));
            }

            const percentage = this.calculate_length(heading, toc_heading, last_element);

            if(percentage){
                this.draw_line(percentage);
            }
        }
    }

    prevent_default_scroll_to_element() {
        Array.prototype.forEach.call(this.toc_a, (a_element) => {
            a_element.addEventListener('click', (e) => {
                e.preventDefault();

                const a_href          = a_element.getAttribute('href');
                const active_heading  = this.post_content.querySelector(a_href);
                const heading_dist    = active_heading.getBoundingClientRect().top;
        
                window.scrollTo({
                    left: 0,
                    top: window.scrollY + heading_dist,
                    behavior: 'smooth'
                });

                let url     = new URL(window.location.href);
                let new_url = url.origin + url.pathname + a_href

                window.history.replaceState({}, document.title, new_url);
            });
        });
    }

    remove_default_checked_on_mobile() {
        if(window.screen.width < 1024){
            this.toc.querySelector('input[type="checkbox"]').checked = false;
        }
    }

    register_toggle_btn_events() {
        if( !this.toggle_btn ){
            return;
        }

        this.toggle_btn.addEventListener('click', () => {
            if( !this.toc.classList.contains('closed') && !this.toc.classList.contains('active') ){
                if(screen.width < 1200){
                    this.toc.classList.add('active');
                }
                else {
                    this.toc.classList.add('closed');
                }
            }
            else {
                if( this.toc.classList.contains('closed') ){
                    this.toc.classList.remove('closed');
                    this.toc.classList.add('active');
                }
                else {
                    this.toc.classList.add('closed');
                    this.toc.classList.remove('active');
                }
            }
        });
    }

    init(override_ldl) {
        /**
         * If page is loading with LDL, then we better wait until all the content 
         * of the page gets loaded, then and only after it, we run the
         * toc app.
         */
        if (((typeof ps_ldl != 'undefined') && ps_ldl && !override_ldl)) {
            return;
        }

        this.post_content   = document.querySelector('.ps-post_content');
        this.toc            = document.querySelector('.ps-table_of_contents');

        /**
         * If there is either not "post content" or not 
         * "table of content" widget, then do nothing.
         */
        if(!this.toc || !this.post_content){
            return;
        }

        this.last_heading           = document.querySelector('#ps-lrc_last_sections');
        this.toc_lis                = this.toc.querySelectorAll('li');
        this.toc_a                  = this.toc.querySelectorAll('a');
        this.toggle_btn             = this.toc.querySelector('.ps-table_of_contents_toggle_btn');
        this.pc_headings            = this.post_content.querySelectorAll('h2, h3');
        this.pc_headings            = Array.prototype.slice.call(this.pc_headings);
        this.current_active_heading = '';

        /**
         * if there is either not li in the toc or not headings in the content,
         * the just return.
         */
        if(this.pc_headings.length == 0 || this.toc_lis.length == 0){
            return;
        }

        this.prevent_default_scroll_to_element();
        this.remove_default_checked_on_mobile();
        this.register_toggle_btn_events();

        /**
         * Adding the last element to the headings array
         */
         this.pc_headings.push(this.last_heading);

        document.addEventListener('scroll', () => {
            Array.prototype.some.call(this.pc_headings, (pc_heading, index, pc_headings) => {
                if( 'null' == typeof pc_heading ){
                    return;
                }

                if(this.is_in_viewport(pc_heading)){
                    if(pc_headings[index - 1] !== undefined){
                        if( this.pc_headings.length == (index + 1) ){
                            this.apply_active(pc_headings[index - 1], pc_headings[index]);
                        }
                        else {
                            this.apply_active(pc_headings[index - 1]);
                        }

                    }
                    return true;
                }
                else {
                    return false;
                }
            })
        }, {
            passive: true
        });
    }
}

export default SavvyTableOfContents;