/**
 * 
 * @package Node Builder
 * 
 * */

 class NoderStyles {
    constructor() {
        console.log('Noder Styles');
        this.styles_data = noder_json_styles;

        console.log(this.styles_data);
    }

    setControlsValues(block_id, styles_data){
        this.styles_data[block_id] = styles_data;
        console.log(this.styles_data);
    }

    getControlsValues(block_id){
        return this.styles_data[block_id] ?? [];
    }

    getStylesObject(){
        return this.styles_data;
    }

    getPropertyValue(block_id, control_id, screen){
        /**
         * If there is no an screen specified for the property,
         * then return the desktop (default).
         */
        if( 'undefined' === typeof this.styles_data[block_id][control_id][screen] ){
            return this.styles_data[block_id][control_id]['desktop']['value'];
        }
        else {
            return this.styles_data[block_id][control_id][screen]['value'];
        }
    }

    render_block_style(block_id){
        /**
         * Remove Current Styles of the Block.
         */
        Array.prototype.forEach.call(document.querySelectorAll('style.nb-style-' + block_id), (style_tab) => {
            style_tab.remove();
        });

        /**
         * Create the Style Tab.
         */
        let style_tab = document.createElement('style');
        style_tab.classList.add('nb-style-' + block_id);

        /**
         * Iterate over all controls wrap which matach 
         * the block id.
         */
        Array.prototype.forEach.call(this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="'+ block_id +'"]'), (control_wrap) => {
            /**
             * Iterate over all selectors within the controls wraps.
             */
            Array.prototype.forEach.call(control_wrap.querySelectorAll('.nb-editor_selector'), (selector) => {
                style_tab.innerHTML += selector.dataset.renderedstyle ?? '';
            });
        });

        /**
         * Attach the generated style to the document head.
         */
        document.querySelector('head').appendChild(style_tab);
    }

    renderInlineStylesForBlockId(block_id){
        /**
         * Remove Current Styles of the Block.
         */
         Array.prototype.forEach.call(document.querySelectorAll('style.nb-style-' + block_id), (style_tab) => {
            style_tab.remove();
        });

        /**
         * Create the Style Tab.
         */
        let style_tab = document.createElement('style');
        style_tab.classList.add('nb-style-' + block_id);

        let object = this.styles_data[block_id];
        let styles_html = '';

        for(const control_id in object) {
            if (Object.prototype.hasOwnProperty.call(object, control_id)) {
                const control   = object[control_id];
                const selector  = control['selector'];
                const property  = control['property'];
                const value     = control['desktop']['value'];

                styles_html += selector + '{' + property.replace('{{VALUE}}', value) + '}';

                if (Object.prototype.hasOwnProperty.call(control, 'tablet')) {
                    const tablet_value = control['tablet']['value'];

                    styles_html += '@media screen and (max-width: 1024px){ ' + selector + '{' + property.replace('{{VALUE}}', tablet_value) + '}}';
                }

                if (Object.prototype.hasOwnProperty.call(control, 'mobile')) {
                    const mobile_value = control['mobile']['value'];

                    styles_html += '@media screen and (max-width: 767px){ ' + selector + '{' + property.replace('{{VALUE}}', mobile_value) + '}}';
                }
            }
        }

        style_tab.innerHTML = styles_html;

        /**
         * Attach the generated style to the document head.
         */
        document.querySelector('head').appendChild(style_tab);
    }

    setPropertyValue(block_id, control_id, screen, value){
        this.styles_data[block_id][control_id][screen]['value'] = value;
        this.renderInlineStylesForBlockId(block_id);
    }
}
 
class NbEditor {
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
        this.registered_controls    = [];
        this.dragging_node          = false;
        this.cloned_picker          = null;
        this.mouse_in_base          = false;
        this.mouse_down             = false;
        this.styles_obj             = new NoderStyles();
        this.editor                 = document.querySelector('.nb-editor');
        this.blocks                 = document.querySelectorAll('.nb-block');
        this.bases                  = document.querySelectorAll('.nb-base');
        this.document_body          = document.querySelector('body');
        this.nav_bar                = this.editor.querySelector('.nb-editor_tab_nav_menu');
        this.temp_wrap              = this.editor.querySelector('.nb-editor_temp');
        this.tab_contents           = this.editor.querySelectorAll('.nb-editor_tab_content');
        this.all_controls_wrap      = this.editor.querySelectorAll('.nb-controls_wrap');
        this.all_controls           = this.editor.querySelectorAll('.nb_control_wrap');
        this.slide_editor           = this.editor.querySelector('.nb-editor_resize_bar');
        this.hide_editor_btn        = this.editor.querySelector('.nb-editor_hide_btn');
        this.all_picker_blocks      = this.editor.querySelectorAll('.nb-editor_blocks_picker > div');
        this.content_wrap           = this.editor.querySelector('.nb-editor_tab_content_content');
        this.style_wrap             = this.editor.querySelector('.nb-editor_tab_content_style');
        this.block_picker_btn       = this.editor.querySelector('.nb-editor_blocks_picker_btn');
        this.blocks_picker_wrap     = this.editor.querySelector('.nb-editor_blocks_picker');
        this.nav_bar_links          = this.nav_bar.querySelectorAll('a');
        this.update_post_btn        = this.editor.querySelector('.nb-editor_btn_update');

        this.upate_all_inputs_values()
        this.create_dialog_element();
        this.register_editor_slide_events();
        this.register_hide_editor_events();
        this.register_nav_bar_events();
        this.register_update_btn_events();
        this.register_preselect_banner_events();
        this.register_block_picker_btn_events();
        this.register_document_events();
        this.register_controls_events();
    }

    /**
     * Fix possible bug on Firefox.
     */
    upate_all_inputs_values() {
        Array.prototype.forEach.call(this.editor.querySelectorAll('input,select'), (input) => {
            input.value = input.getAttribute('value');
        });
    }

    responsive_set_active_btn(selected_btn) {
        let all_btns = selected_btn.closest('.nb-control_responsive_btns').querySelectorAll('.nb-control_resp_btn');

        /**
         * Remove the class active from all buttons.
         */
        Array.prototype.forEach.call(all_btns, (btn) => {
            btn.classList.remove('active');
        })

        selected_btn.classList.add('active');
    }

    responsive_set_property_value_to_control(selected_btn){
        const block_id      = selected_btn.closest('.nb-controls_wrap').dataset.blockid;
        const control_id    = selected_btn.closest('.nb_control_wrap').dataset.controlid;
        const screen        = selected_btn.dataset.screen;

        const value         = this.styles_obj.getPropertyValue( block_id, control_id, screen );

        this.set_control_value(selected_btn.closest('.nb_control_wrap'), value);
    }

    set_control_value(control_wrap, value){


        const control_type  = control_wrap.dataset.type;


        switch (control_type) {
            case 'select':
                this.set_control_value_type__select(control_wrap, value);
                break;
        
            default:
                break;
        }
    }

    set_control_value_type__select(control_wrap, value){


        let control_input = control_wrap.querySelector('select');

        control_input.value = value;

        control_input.dispatchEvent(new Event('input'));
    }

    responsive_move_selected_screen_on_top(selected_btn) {
        selected_btn.closest('.nb-control_responsive_btns').prepend(selected_btn);
    }

    responsive_btn_click_event(selected_btn){
        /**
         * Mark the selected responsive btn as active.
         */
        this.responsive_set_active_btn(selected_btn);

        this.responsive_set_property_value_to_control(selected_btn);
    }

    resposive_set_properties_to_all_controls( block_id ){
        Array.prototype.forEach.call(this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="'+ block_id +'"]'), (controls_wrap_list) => {
            Array.prototype.forEach.call(controls_wrap_list.querySelectorAll('.nb_control_wrap'), (control_wrap_list) => {
                const selected_responsive_btn = control_wrap_list.querySelector('nb-control_resp_btn.active');

                this.responsive_set_property_value_to_control(selected_btn);
            });
        })
    }

    register_document_events() {
        /**
         * Click events.
         */
        document.addEventListener('click', (e) => {
            if( !e.target.closest('.nb-dialog') ){
                this.dialog.classList.add('nb-display__none');
            }

            /**
             * If block is clicked.
             */
            if(e.target.closest('.nb-block')){
                let this_block = e.target.closest('.nb-block');
    
                /**
                 * When a block is clicked, then hide the 
                 * blocks picker and show proper content for the 
                 * block on the editor.
                 */
                if(this.content_wrap){
                    this.content_wrap.classList.remove('nb-display__none');
                }
    
                if(this.style_wrap){
                    this.style_wrap.classList.remove('nb-display__none');   
                }
    
                this.nav_bar.classList.remove('nb-display__none');
                this.blocks_picker_wrap.classList.add('nb-display__none');
    
                Array.prototype.forEach.call(this.all_controls_wrap, (control_wrap) => {
                    control_wrap.classList.remove('nb_display_block');
                })
    
                this.select_block(this_block);
                // this.resposive_set_properties_to_all_controls(this_block);
    
                let selected_controls_wrap = this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="'+ this_block.dataset.blockid +'"]');
    
                Array.prototype.forEach.call(selected_controls_wrap, (control_wrap) => {
                    control_wrap.classList.add('nb_display_block');
                });    
            }

            /**
             * Responsive Btn Option
             * 
             * */
            Array.prototype.forEach.call(this.editor.querySelectorAll('.nb-control_responsive_btns'), (reponsive_btns_wrapper) => {
                // reponsive_btns_wrapper.classList.remove('active');
            });

            // Array.prototype.forEach.call(this.editor.querySelectorAll('.nb-control_resp_btn.active'), (selected_btn) => {
            //     let btns_wrapper = selected_btn.closest('.nb-control_responsive_btns');

            //     if( 'desktop' === selected_btn.dataset.screen ){
            //         btns_wrapper.style.justifyContent = 'flex-start';
            //     }

            //     if( 'tablet' === selected_btn.dataset.screen ){
            //         btns_wrapper.style.justifyContent = 'center';
            //     }

            //     if( 'mobile' === selected_btn.dataset.screen ){
            //         btns_wrapper.style.justifyContent = 'flex-end';
            //     }
            // });

            if(e.target.closest('.nb-control_resp_btn')){
                /**
                 * Get the selected screen.
                 */
                let selected_btn = e.target.closest('.nb-control_resp_btn');

                /**
                 * Open the responsive selector with available screens.
                 */
                e.target.closest('.nb-control_responsive_btns').classList.add('active');

                /**
                 * Handle the click event.
                 */
                // this.responsive_btn_click_event(selected_btn);

                /**
                 * Select all other responsive buttons to the selected screen.
                 */
                Array.prototype.forEach.call(this.editor.querySelectorAll( '.nb-control_resp_btn[data-screen="'+ selected_btn.dataset.screen +'"]'), (btn) => {
                    this.responsive_btn_click_event(btn);

                    let btns_wrapper = btn.closest('.nb-control_responsive_btns');

                    if( 'desktop' === btn.dataset.screen ){
                        btns_wrapper.style.justifyContent = 'flex-start';
                    }
    
                    if( 'tablet' === btn.dataset.screen ){
                        btns_wrapper.style.justifyContent = 'center';
                    }
    
                    if( 'mobile' === btn.dataset.screen ){
                        btns_wrapper.style.justifyContent = 'flex-end';
                    }

                    // btns_wrapper.classList.remove('active');
                });
            }
        });

        /**
         * Right Click Event.
         */
        document.addEventListener('contextmenu', (e) => {
            if(e.target.closest('.nb-block')){
                const this_block = e.target.closest('.nb-block');

                e.preventDefault();
    
                /**
                 * Clean up dialog element.
                 */
                this.dialog.innerHTML = '';
                
                /**
                 * Create Blocks Options
                 */
                this.dialog.innerHTML = '<ul><li class="nb-blocks_options" data-option="delete">Delete</li></ul>';
    
                /**
                 * Register Options Events.
                 */
                Array.prototype.forEach.call(this.dialog.querySelectorAll('.nb-blocks_options'), (option) => {
                    option.addEventListener('click', () => {
                        this.dialog.classList.add('nb-display__none');
    
                        /**
                         * Options Switch
                         */
                        switch ( option.dataset.option) {
                            case 'delete':
                                this.delete_block(this_block.dataset.blockid);
                                break;
                        
                            default:
                                break;
                        }
                    });
                });
    
                /**
                 * Open Dialog Window.
                 */
                this.dialog.style.left = e.clientX + 'px';
                this.dialog.style.top  = e.clientY + 'px';
                this.dialog.classList.remove('nb-display__none');
            }

        }, false);

        /**
         * Mouse Move Events.
         */
         document.addEventListener('mousemove', (e) => {
            /**
             * Check if we are dragging any node.
             */
            if(this.dragging_node && this.mouse_down){
                /**
                 * Check if dragging a block to move it.
                 */
                if(this.dragging_node.classList.contains('nb-block')){
                    this.dragging_node.classList.add('nb-display__none');
                }

                this.cloned_picker.classList.remove('nb-display__none');
                this.cloned_picker.style.left = (e.clientX + 10) + 'px';
                this.cloned_picker.style.top  = (e.clientY + 10) + 'px';
                this.insert_preselect_banner(e);
            }
        });

        /**
         * Mouse Over Events.
         */
         document.addEventListener('mouseover', (e) => {
            /**
             * Check if we are over a block.
             */
            if(e.target.closest('.nb-block')){
                let this_block = e.target.closest('.nb-block');
   
                Array.prototype.forEach.call(this.blocks, (block) => {
                    block.classList.remove('nb-block_show_edit_btn');
                });
                
                /**
                * Only show the block hover border if 
                * we are not dragging a block/block-picker or 
                * the currrent block isn't in a column.
                */
                if(!this.dragging_node){
                    this.show_hover_border(this_block);
                }
            }
        });

        /**
         * Mouse Down Event.
         */
         document.addEventListener('mousedown', (e) => {
            this.mouse_down     = true;
            let dragging_picker = e.target.closest('.nb-editor_block_picker');
            let dragging_block  = e.target.closest('.nb-block');

            /**
             * Check if we are dragging a block picker.
             */
            if(dragging_picker){                   
                this.dragging_node = dragging_picker;
                this.set_cloner_picker(dragging_picker, e);
            }

            /**
             * Check if we are dragging a block.
             * 
             * Mouse Move Event on the Block's Edit Button...
             * Change Block Position (Drag a Block).
             * 
             */
            if(dragging_block){
                this.dragging_node  = dragging_block;
                this.set_cloner_picker(this.editor.querySelector('.nb-editor_block_picker[data-blocktype="'+ dragging_block.dataset.blocktype +'"]'), e);
            }
        });

        /**
         * Mouse Up Event.
         */
         document.addEventListener('mouseup', (e) => {
            this.mouse_down = false;

            if(this.dragging_node){
                /**
                 * Return select control to the body of the 
                 * document.
                 */
                this.document_body.classList.remove('nb-status__noselect');
                /**
                 * Remove the current cloned picker.
                 */
                this.cloned_picker.remove();

                /**
                 * Check if dragging a picker.
                 */
                if(this.dragging_node.classList.contains('nb-editor_block_picker')){
                    /**
                     * Create a new block.
                     * 
                     * New position have been set in this.preselect_banner 
                     * during the mousemove event.
                     */
                     this.create_new_block(this.dragging_node,  e.target.closest('.nb-base'));
                }
    
                /**
                 * Check if dragging a block.
                 */
                if(this.dragging_node.classList.contains('nb-block')){
                    /**
                     * Move the block to the new position.
                     * 
                     * New position have been set in this.preselect_banner 
                     * during the mousemove event.
                     */
                    this.move_block(this.dragging_node);

                    /**
                     * Make the block visible again.
                     */
                    this.dragging_node.classList.remove('nb-display__none');

                    /**
                     * Remove the Preselect Banner.
                     */
                    this.remove_preselect_banner();
                }
            }
    
            /**
             * When we release the click, then we are not dragging 
             * anything.
             */
            this.dragging_node = false;
        });
    }

    is_block_upper_half(hovering_element, e){
        const block_position    = hovering_element.getBoundingClientRect();
        const mouse_position    = e.clientY - block_position.top;
        const block_height      = hovering_element.offsetHeight;

        return ( mouse_position < ( block_height / 2 ) ) ? true : false;
    }

    is_close_to_edges(hovering_element, e) {
        const block_position = hovering_element.getBoundingClientRect();
        const mouse_position = e.clientY - block_position.top;
        const block_height   = hovering_element.offsetHeight;

        return (mouse_position < 20 || mouse_position > (block_height - 20)) ? true : false;
    }

    insert_preselect_banner(e){
        /**
         * If e.target it is not a valid node element
         * then just return;
         */
        if('function' !== typeof e.target.closest){
            return;
        }

        /**
         * Set either a base or a block as a hovering element.
         */
        let hovering_element = e.target.closest('.nb-block,.nb-base');

        /**
         * If any hover is selected, the return.
         */
        if(!hovering_element){
            return;
        }

        /**
         * In case we are hovering a base( the main wrapper or a column block ).
         */
        if(hovering_element.classList.contains('nb-base')){
            /**
             * In case the base contains blocks, then 
             * we are only able to either insert or move blocks
             * when we are close to the upper or the bottom edges.
             */
            if(hovering_element.querySelectorAll('.nb-block').length > 0){
                /**
                 * If we are not close to the edges then just return.
                 */
                if(!this.is_close_to_edges(hovering_element, e)){
                    return;
                }
            }

            if( this.is_block_upper_half(hovering_element, e) ){
                hovering_element.prepend(this.preselect_banner);
            }
            else {
                hovering_element.appendChild(this.preselect_banner);
            }
        }
        else {
            if( this.is_block_upper_half(hovering_element, e) ){
                hovering_element.parentNode.insertBefore(this.preselect_banner, hovering_element);
            }
            else {
                hovering_element.parentNode.insertBefore(this.preselect_banner, hovering_element.nextSibling);
            }
        }
    }

    create_dialog_element() {
        this.dialog = document.createElement('div');

        this.dialog.classList.add('nb-dialog');
        this.dialog.classList.add('nb-display__none');
        this.document_body.appendChild(this.dialog);
    }

    register_block_picker_btn_events() {
        this.block_picker_btn.addEventListener('click', () => {
            if(this.content_wrap){
                this.content_wrap.classList.add('nb-display__none');
            }
            
            if(this.style_wrap){
                this.style_wrap.classList.add('nb-display__none');
            }

            this.nav_bar.classList.add('nb-display__none');
            this.blocks_picker_wrap.classList.remove('nb-display__none');
        });
    }

    update_all_controls_list() {
        this.all_controls = this.editor.querySelectorAll('.nb_control_wrap');
    }

    update_all_controls_wrap_list() {
        this.all_controls_wrap  = this.editor.querySelectorAll('.nb-controls_wrap');
    }

    remove_preselect_banner(){
        let preselect_banners = document.querySelectorAll('.nb-preselect_banner');

        Array.prototype.forEach.call(preselect_banners, (preselect_banner) => {
            preselect_banner.remove();
        });
    }

    register_preselect_banner_events() {
        this.preselect_banner = document.createElement('div');
        this.preselect_banner.classList.add('nb-preselect_banner');
    }

    move_block(block) {
        if(typeof this.preselect_banner.parentNode === 'undefined') {
            return;
        }

        if(this.preselect_banner.parentNode === null) {
            return;
        }
        
        /**
         * Insert if the new child isn't an ancestor of the parent.
         */
        if( !block.contains(this.preselect_banner.parentNode) ){
            this.preselect_banner.parentNode.insertBefore(block, this.preselect_banner);
            this.select_block(block);
            block.click();
        }
        else {
            console.log('Error: The new child is an ancestor of the parent');
        }
    }

    set_cloner_picker(element, mousedown_event) {
        this.cloned_picker              = element.cloneNode(true);
        this.cloned_picker.style.left   = mousedown_event.clientX + 'px';
        this.cloned_picker.style.top    = mousedown_event.clientY + 'px';
        this.cloned_picker.classList.add('nb-editor_cloned_picker');
        this.cloned_picker.classList.add('nb-display__none');
        
        this.document_body.appendChild(this.cloned_picker);
        this.document_body.classList.add('nb-status__noselect');
    }

    insert_block( block_id, block_html, editor_controls_html, styles_data ) {
        console.log('Insert Block');
        console.log({block_id, block_html, editor_controls_html, styles_data});
        /**
         * Valadation before insert the block.
         */
        if(!this.preselect_banner || !block_id || !block_html){
            return;
        }

        /**
         * Store the editors controls html into a temporally element.
         * so we can select them.
         */
        this.temp_wrap.innerHTML = editor_controls_html;

        const temp_controls = this.temp_wrap.querySelectorAll('.nb-controls_wrap');
        Array.prototype.forEach.call(temp_controls, (control) => {
            if(control.classList.contains('nb_tab_content')){
                if(this.content_wrap){
                    this.content_wrap.appendChild(control);
                }
            }
            else {
                if(this.style_wrap){
                    this.style_wrap.appendChild(control);
                }
            }
        });

        /**
         * Store the block html into a temporally element.
         * so we can select it.
         */
        this.temp_wrap.innerHTML    = block_html;
        const block                 = this.temp_wrap.querySelector('.nb-block[data-blockid="'+ block_id +'"]');  
        
        this.preselect_banner.parentNode.insertBefore(block, this.preselect_banner);
        this.remove_preselect_banner();


        /**
         * Update our editor with the new Block.
         */
        this.update_all_blocks();
        this.update_all_controls_wrap_list();
        this.update_all_controls_list();
        this.register_controls_events();
        this.render_block_style(block_id);
        this.styles_obj.setControlsValues(block_id, styles_data);
    }

    create_new_block(block_picker, selected_base) {
        /**
         * Valadation before create the block.
         */
        if(!block_picker || !selected_base){
            return;
        }

        /**
         * Set arguments to send to the server.
         */
        let args = {
            action: 'create_block',
            post_id: nb_ajax_var.post_id,
            block_type: block_picker.dataset.blocktype,
            base_id: selected_base.dataset.blockid
        };

        /**
         * Ajax Call.
         */
        this.ajax_handler(args).then(data => {                
            if(data.status == 'success'){


                switch ( data.callback ) {
                    case 'insert_block':
                        this.insert_block( data.block_id, data.block_html, data.editor_controls_html, data.styles_data );
                        break;
                
                    default:
                        break;
                }
            }
            else {
                console.log('Error received from server');
            }

        }).catch( error => {
            console.log( error );
        });
    }

    register_hide_editor_events() {
        this.hide_editor_btn.addEventListener('click', () => {
            this.document_body.classList.toggle('nb-status_hide_editor');
        });
    }

    /**
     * Slide Editor bar, which allow to 
     * shirink or expand the editor.
     */
    register_editor_slide_events() {
        let is_pressed = false;

        this.slide_editor.addEventListener('mousedown', () => {
            is_pressed = true;
            this.document_body.classList.add('nb-status__noselect');
        });

        document.addEventListener('mousemove', (e) => {
            if(is_pressed && e.clientX > 200 && e.clientX < 600){
                
                this.document_body.style.marginLeft = e.clientX + 'px';
                this.editor.style.width             = e.clientX + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            if(is_pressed){
                this.document_body.classList.remove('nb-status__noselect');
                is_pressed = false;       
            }
        });
    }

    update_on_the_fly(control_wrap){
        /**
         * If the data-uof attribute isn't present, 
         * then continue;
         */
        if( 'true' != control_wrap.dataset.uof ){
            return;
        }

        /**
         * If Block type is column, then return.
         */
        if( 'nb_columns_block' == control_wrap.closest('.nb-controls_wrap').dataset.blocktype ){
            return;
        }

        switch (control_wrap.dataset.type) {
            case 'text':
                this.content_uof__text(control_wrap);
                break;
            case 'select':
                this.content_uof__select(control_wrap);
                break;
        
            default:
                break;
        }
    }

    style_uof__select(control_wrap) {
        /**
         * Get the input element.
         */
        let input = control_wrap.querySelector('select');
        
        input.addEventListener('input', () => {

            const block_id      = input.closest('.nb-controls_wrap').dataset.blockid;
            const control_id    = input.closest('.nb_control_wrap').dataset.controlid;
            const value         = input.value;
            const screen        = input.closest('.nb_control_wrap').querySelector('.nb-control_resp_btn.active').dataset.screen;

            /**
             * Update Styles Object
             */
            this.styles_obj.setPropertyValue(block_id, control_id, screen, value);

            this.check_all_blocks_conditions(control_wrap.closest('.nb-controls_wrap'));  
        });
    }

    style_uof__text(control_wrap) {
        const input = control_wrap.querySelector('input');

        input.addEventListener('input', () => {
            const block_id      = input.closest('.nb-controls_wrap').dataset.blockid;
            const control_id    = input.closest('.nb_control_wrap').dataset.controlid;
            const value         = input.value;
            const screen        = input.closest('.nb_control_wrap').querySelector('.nb-control_resp_btn.active').dataset.screen;

            /**
             * Update Styles Object
             */
            this.styles_obj.setPropertyValue(block_id, control_id, screen, value);
            
            this.check_all_blocks_conditions(control_wrap.closest('.nb-controls_wrap'));  
        });
    }

    render_block_style(block_id){
        /**
         * Remove Current Styles of the Block.
         */
        Array.prototype.forEach.call(document.querySelectorAll('style.nb-style-' + block_id), (style_tab) => {
            style_tab.remove();
        });

        /**
         * Create the Style Tab.
         */
        let style_tab = document.createElement('style');
        style_tab.classList.add('nb-style-' + block_id);

        /**
         * Iterate over all controls wrap which matach 
         * the block id.
         */
        Array.prototype.forEach.call(this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="'+ block_id +'"]'), (control_wrap) => {
            /**
             * Iterate over all selectors within the controls wraps.
             */
            Array.prototype.forEach.call(control_wrap.querySelectorAll('.nb-editor_selector'), (selector) => {
                style_tab.innerHTML += selector.dataset.renderedstyle ?? '';
            });
        });

        /**
         * Attach the generated style to the document head.
         */
        document.querySelector('head').appendChild(style_tab);
    }

    /**
     * Update Controls Selectors on Change.
     * 
     */
    update_selectors_on_the_fly(control_wrap) {
        switch (control_wrap.dataset.type) {
            case 'select':
                this.style_uof__select(control_wrap);
                break;
            case 'text':
                this.style_uof__text(control_wrap);
                break;
        
            default:
                break;
        }
    }

    /**
     * Register All Controls Events.
     */
    register_controls_events() {
        Array.prototype.forEach.call(this.all_controls, (control_wrap) => {
            console.log('Register Control');
            console.log(control_wrap);
            /**
             * Do not register the same Control Twice.
             */
            if( this.registered_controls.includes(control_wrap) ){
                return;
            }
            else {
                this.registered_controls.push(control_wrap);
            }
     
            /**
             * Update Style on the Fly (Render Stlyes).
             */
            if(control_wrap.querySelectorAll('.nb-control_resp_btn').length > 0){
                this.update_selectors_on_the_fly(control_wrap, control_wrap.querySelector('.nb-control_responsive_btns'));
            }
            else {
                /**
                 * 
                 * If Control do not have selectos, then we can update its
                 * content on the fly, if needed.
                 * 
                 * Update Content on the Fly (Ajax Call).
                 */
                if(control_wrap.dataset.uof){
                    this.update_on_the_fly(control_wrap);
                }
            }

            /**
             * Set Conditional Fields Visibility.
             */
            if(control_wrap.dataset.hasconditions){
                this.check_conditions_for_control(control_wrap);
            }
        });
    }

    check_conditions_for_control(control_wrap) {

        /**
         * If the condition isn't met, then hide the control.
         */
        const attr_names    = control_wrap.getAttributeNames();
        let display_control = true;

        for(const attr_name of attr_names) {
            if( attr_name.includes('data-cond-target-') ) {
                const target_name   = control_wrap.getAttribute(attr_name);
                const cond_value    = control_wrap.getAttribute(attr_name.replace('data-cond-target-', 'data-cond-value-'));

                /**
                 * Check if condition met.
                 */
                const target_control = control_wrap.closest('.nb-controls_wrap').querySelector('div[data-controlid="'+ target_name +'"]');

                /**
                 * If Target Controls isn't defined, then
                 * just return.
                 */
                if(!target_control){
                    return;
                }

                let target_value = '';
                switch (target_control.dataset.type) {
                    case 'select':
                        target_value = target_control.querySelector('select').value;
                        break;
                    case 'text':
                        target_value = target_control.querySelector('input').value;
                        break;
                
                    default:
                        break;
                }
                
                if( target_value != cond_value ){
                    display_control = false;
                }
            }
        }

        /**
         * If all conditions are met, then display the control.
         * Otheriwse hide it.
         */
        if( display_control ){
            control_wrap.classList.remove('nb-display__none');
        }
        else {
            control_wrap.classList.add('nb-display__none');
        }
    }

    check_all_blocks_conditions(controls_wrap){
        
        Array.prototype.forEach.call(controls_wrap.querySelectorAll('.nb_control_wrap'), (control_wrap) => {
            
            this.check_conditions_for_control(control_wrap);   
        });
    }

    update_all_blocks() {
        this.blocks = document.querySelectorAll('.nb-block');
    }

    content_uof__select(control_wrap) {
        /**
         * Get the input element.
         */
        let input = control_wrap.querySelector('select');

        input.addEventListener('input', () => {
            this.uof_ajax_caller( control_wrap );
            this.check_all_blocks_conditions(control_wrap.closest('.nb-controls_wrap'));  
        });
    }

    /**
     * Update text on the fly.
     * 
     * Every time the input gets modified, 
     * this function waits 500ms before calling 
     * ajax and request the block with the new 
     * information.
     */
    content_uof__text(control_wrap) {
        let input           = control_wrap.querySelector('input');
        let interval_set    = false;
        let key_pressed     = false;
        let self            = this;

        input.addEventListener('input', () => {
            key_pressed = true;

            if(!interval_set){
                interval_set = true;

                function set_key_pressed_to_off() {
                    key_pressed = false;
                }

                function check_if_still_pressing_keys() {
                    if( key_pressed == false ){
                        interval_set = false;
                        clearInterval(key_to_off);
                        clearInterval(check);

                        self.uof_ajax_caller( control_wrap );
                        self.check_all_blocks_conditions(control_wrap.closest('.nb-controls_wrap'));  
                    }
                    else {

                    }
                }

                const key_to_off = setInterval(set_key_pressed_to_off, 200);
                const check = setInterval(check_if_still_pressing_keys, 500);
            }
        });
    }

    collect_controls_values(controls_wrap_list) {
        let controls_values = {};

        Array.prototype.forEach.call(controls_wrap_list, (controls_wrap) => {
            /**
             * Get all controls inside the wrapper.
             */
            let controls = controls_wrap.querySelectorAll('.nb_control_wrap');

            /**
             * Create an object on the first iteration.
             */
            Array.prototype.forEach.call(controls, (control) => {   
                let value;             
                const control_type = control.dataset.type,
                        control_id = control.dataset.controlid;

                switch ( control_type ) {
                    case 'text':
                        value = this.collect_data_from_control__text(control); 
                        break;

                    case 'select':
                        value = this.collect_data_from_control__select(control); 
                        break;
                
                    default:
                        break;
                }

                controls_values[control_id] = value;
                
            }); 
        });

        return controls_values;
    }

    collect_controls_data(controls_wrap_list) {
  
        let blocks = {};

        Array.prototype.forEach.call(controls_wrap_list, (controls_wrap) => {
            const block_id = controls_wrap.dataset.blockid;

            /**
             * Create an object on the first iteration.
             */
            if ( typeof blocks[block_id] === 'undefined' ){
                blocks[block_id] = {};
            }

            /**
             * Set the Block's Type.
             */
            blocks[block_id]['block_type'] = controls_wrap.dataset.blocktype;

            /**
             * Create an object on the first iteration.
             */
            if ( typeof blocks[block_id]['controls_values'] === 'undefined' ){
                blocks[block_id]['controls_values'] = {};
            }

            blocks[block_id]['controls_values'] = this.collect_controls_values(controls_wrap_list);
        });

        return blocks;
    }

    uof_ajax_caller(control_wrap) {
        const block_id              = control_wrap.closest('.nb-controls_wrap').dataset.blockid;
        const block_type            = control_wrap.closest('.nb-controls_wrap').dataset.blocktype;
        const block_controls_wrap   = this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="' + block_id + '"]');
        const block_data_object     = this.collect_controls_data(block_controls_wrap);        
        const block_data_string     = JSON.stringify(block_data_object);
        
        let args = {
            action: 'uof_save_block',
            block_id: block_id,
            block_data: block_data_string,
            block_type: block_type,
        };



        this.ajax_handler(args).then(data => {                
            if(data.status == 'success'){
                if(typeof data.callback != 'undefined'){
                    switch ( data.callback ) {
                        case 'update_block':
                            this.update_block( data.block_id, data.html_content );
                            break;
                    
                        default:
                            break;
                    }
                }
            }
            else {
                console.log('Error received from server');
            }

        }).catch( error => {
            console.log( error );
        });
    }

    update_block( block_id, html_content ) {  
        let block       = document.querySelector('.nb-block[data-blockid="'+ block_id +'"]');
        block.outerHTML = html_content;
        block           = document.querySelector('.nb-block[data-blockid="'+ block_id +'"]');

        this.update_all_blocks();
    }

    collect_data_from_control__text(control){
        const input = control.querySelector('input');

        return input.value;
    }

    collect_data_from_control__select(control){
        const select = control.querySelector('select');

        return select.value;
    }

    /**
     * Collect Blocks Data.
     */
    collect_block_data(blocks_list) {
        let all_blocks_controls_data = [];

        /**
         * Loop over all the blocks.
         */
        Array.prototype.forEach.call(blocks_list, (block) => {
            if(!block.classList.contains('nb-block')){
                return;
            }

            let controls_data           = {};
            const controls_wrap_list    = this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="'+ block.dataset.blockid +'"]');
            // const controls_values       = this.collect_controls_values(controls_wrap_list);

            const controls_values           = this.styles_obj.getControlsValues(block.dataset.blockid);

            controls_data['block_id']           = block.dataset.blockid;
            controls_data['block_type']         = block.dataset.blocktype;
            controls_data['controls_values']    = controls_values;
            
            if(block.children.length > 0){
                controls_data['children'] = this.collect_block_data(block.children);
            }

            all_blocks_controls_data.push(controls_data);
        });

        return all_blocks_controls_data;
    }

    collect_wrappers_data(noder_wrap) {
        return this.collect_block_data(noder_wrap.children);;
    }

    collect_node_wraps_data(){
        let noder_wraps_data    = {};
        const noder_wraps_list  = document.querySelectorAll('.nb-main_wrap');

        Array.prototype.forEach.call(noder_wraps_list, (noder_wrap) => {
            const base_id       = noder_wrap.dataset.blockid;
            const controls_data = this.collect_wrappers_data(noder_wrap);

            noder_wraps_data[base_id] = controls_data;
        });

        return noder_wraps_data;
    }

    create_styles_object() {
        const controls_wrap_list    = this.editor.querySelectorAll('.nb-controls_wrap');
        let styles_object           = {};

        Array.prototype.forEach.call(controls_wrap_list, (controls_wrap) => {
            const selectors = controls_wrap.querySelectorAll('.nb-editor_selector');
            let iterator    = 0;

            if(selectors.length < 1){
                return;
            }

            if(typeof styles_object[controls_wrap.dataset.blockid] === 'undefined'){
                styles_object[controls_wrap.dataset.blockid] = {};
                styles_object[controls_wrap.dataset.blockid]['selectors'] = {};
            }

            Array.prototype.forEach.call(selectors, (selector) => {
                const data_selector = selector.dataset.selector;
                let nail_selector   = selector.dataset.selector.replace('.nb-base div.nb-block.' + controls_wrap.dataset.blockid, '');
                let rendered_style  = selector.dataset.renderedstyle;

                nail_selector   = nail_selector ? nail_selector : iterator;
                rendered_style  = rendered_style.replace(data_selector + '{', '');
                // rendered_style  = rendered_style.slice(0, -1);
                // rendered_style  = rendered_style.replace('}', '');
                rendered_style  = rendered_style.substring(0, rendered_style.length - 1);
                styles_object[controls_wrap.dataset.blockid]['selectors'][nail_selector] = rendered_style;
                iterator++;
            });
        } );

        return styles_object;
    }

    /**
     * Update Current Post Button.
     * (This updates all the content of the bases in the current post)
     */
    register_update_btn_events() {
        this.update_post_btn.addEventListener('click', () => {
            const noder_wraps_data      = this.collect_node_wraps_data();
            const styles_object         = this.styles_obj.getStylesObject();
            const stringfy_data         = JSON.stringify( noder_wraps_data );
            const stringfy_styles       = JSON.stringify( styles_object );

            let args = {
                action: 'save_post',
                post_id: nb_ajax_var.post_id,
                noder_data: stringfy_data,
                styles_data: stringfy_styles,
            };

            this.ajax_handler(args).then(data => {                
                if(data.status == 'success'){
                    console.log('Success');
                }
                else {
                    console.log('Error received from server');
                }

            }).catch( error => {
                console.log( error );
            });
        })
    }

    /**
     * Remove Block's Styles from the Current Head.
     */
    remove_block_style(block_id){
        Array.prototype.forEach.call(document.querySelectorAll('style.nb-style-' + block_id), (style_tab) => {
            style_tab.remove();
        });
    }

    delete_block(block_id){
        let block = document.querySelector('.nb-block[data-blockid="'+ block_id +'"]');

        /**
         * Before remove all this block's childrens.
         * 
         */
        Array.prototype.forEach.call(block.children, (descendent) => {
            if(descendent.classList.contains('nb-block')){
                this.delete_block(descendent.dataset.blockid);
            }
        });

        /**
         * Remove the Block's Controls.
         */
        let block_controls = this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="'+ block_id +'"]');
        Array.prototype.forEach.call(block_controls, (block_control) => {
            block_control.remove();
        });

        /**
         * Remove the Block's Styles.
         */
        this.remove_block_style(block_id);

        /**
         * Remove the Block Itself.
         */
         block.remove();
    }

    show_hover_border(block) {
        /**
         * Show hover border for currrent block.
         */
         block.classList.add('nb-block_show_edit_btn');

        /**
         * Show hover border for any wrapper block.
         */
        let wrapper_block = block.parentNode.closest('.nb-block');

        while (wrapper_block) {
            wrapper_block.classList.add('nb-block_show_edit_btn');
            wrapper_block = wrapper_block.parentNode.closest('.nb-block');
        }
    }

    remove_hover_border(block) {
        /**
         * Show hover border for currrent block.
         */
         block.classList.remove('nb-block_show_edit_btn');

        /**
         * Show hover border for any wrapper block.
         */
        let wrapper_block = block.parentNode.closest('.nb-block');

        while (wrapper_block) {
            wrapper_block.classList.remove('nb-block_show_edit_btn');
            wrapper_block = wrapper_block.parentNode.closest('.nb-block');
        }
    }

    select_block(block) {
        /**
         * Remove selected from all blocks.
         */
        Array.prototype.forEach.call(this.blocks, (block) => {
            block.classList.remove('nb-block_selected');
        })

        /**
         * Add selected to this block.
         */
        block.classList.add('nb-block_selected');
    }

    register_nav_bar_events() {
        Array.prototype.forEach.call(this.nav_bar_links, (link) => {
            link.addEventListener('click', () => {
                /**
                 * Hide all the tab contents.
                 */
                Array.prototype.forEach.call( this.tab_contents, (content) => {
                    content.classList.remove('nb_display_block');
                });

                /**
                 * Remove selected from the links.
                 */
                Array.prototype.forEach.call( this.nav_bar_links, (this_link) => {
                    this_link.classList.remove('nb-editor_selected');
                });

                /**
                 * Add selected to the clicked link.
                 */
                link.classList.add('nb-editor_selected');

                /**
                 * Show the content of the clicked tab
                 */
                this.editor.querySelector('.nb-editor_tab_content_' + link.dataset.tab).classList.add('nb_display_block');

                
            } );
        } );
    }

    async ajax_handler(data = false, nonce = '') {
        if(typeof nb_ajax_var == 'undefined' || !data){
            return;
        }
    
        let request = new XMLHttpRequest(),
            url     = new URL(nb_ajax_var.url);
    
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
}

new NbEditor();