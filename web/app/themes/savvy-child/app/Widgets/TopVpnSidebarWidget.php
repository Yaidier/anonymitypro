<?php

namespace ScTheme\Widgets;

/**
 * A custom ACF widget.
 */
class TopVpnSidebarWidget extends \WP_Widget {

    /**
    * Register widget with WordPress.
    */
    function __construct() {
        parent::__construct(
            'top_vpn_sidebar_widget', // Base ID
            __('Top VPN Sidebar', 'text_domain'), // Name
            array( 'description' => __( 'Top VPN Sidebar', 'text_domain' ) )
        );
    }

    // Creating widget front-end
    public function widget( $args, $instance ) {
        global $post;

        if (!$post) {
            return;
        }

        $context = \Timber::context();

        if( ! $instance['fields'] ) {
            return;
        }

        $reviews = [];
        for( $i = 0; $i < $instance['fields']; $i++ ){
            $review_id = $instance[ "review_id_$i" ] ?? 0;

            if( $review_id ) {
                $wp_post = get_post( $review_id );
                if( $wp_post ) {
                    $reviews[ $review_id ] = new \Timber\Post( $wp_post );
                }
            }
        }

        $context['reviews']     = $reviews;
        $context['title']       = $instance['title'] ?? 'Top VPNs';
        $context['is_sticky']   = $instance['is_sticky'] ?? false;

        \Timber::render( 'widgets/top-vpn-sidebar.twig', $context );

    }
    
    // Creating widget Backend
    public function form( $instance ) {
        $fields     = isset( $instance['fields'] ) ? $instance['fields'] : 3;
        $title      = $instance['title'] ?? 'Top ' . $fields . ' VPNs';
        $is_sticky  = $instance['is_sticky'] ?? false;

        // Is Sticky
        ?>
            <p>
                <label for="<?php echo $this->get_field_id( 'is_sticky' ); ?>"><?php _e( 'Is Sticky:' ); ?></label>
                <input class="" id="<?php echo $this->get_field_id( 'is_sticky' ); ?>" name="<?php echo $this->get_field_name( 'is_sticky' ); ?>" type="checkbox" <?php if( $is_sticky ) : ?> checked="checked" <?php endif; ?> />
            </p>
        <?php

        // Title
        ?>
            <p>
                <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
                <input class="" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
            </p>
        <?php

        // Number of fields
        ?>
            <p>
                <label for="<?php echo $this->get_field_id( 'fields' ); ?>"><?php _e( 'Number of Fields:' ); ?></label>
                <input class="" id="<?php echo $this->get_field_id( 'fields' ); ?>" name="<?php echo $this->get_field_name( 'fields' ); ?>" type="number" value="<?php echo esc_attr( $fields ); ?>" />
            </p>
        <?php

        for( $i = 0; $i < $fields; $i++ ){
            $value = isset( $instance[ "review_id_$i" ] ) ? $instance[ "review_id_$i" ] : $this->get_dafault_value( $i );
            ?>
                <p>
                    <label for="<?php echo $this->get_field_id( "review_id_$i" ); ?>"><?php _e( 'Review ID:' ); ?></label>
                    <input class="widefat" id="<?php echo $this->get_field_id( "review_id_$i" ); ?>" name="<?php echo $this->get_field_name( "review_id_$i" ); ?>" type="number" value="<?php echo esc_attr( $value ); ?>" />
                </p>
            <?php
        }
    
    }

    public function get_dafault_value( $i ) {
        switch ( $i ) {
            case 0:
                $default_review_id = 5653;
                break;
            case 1:
                $default_review_id = 5651;
                break;
            case 2:
                $default_review_id = 5652;
                break;
            default:
                $default_review_id = 0;
                break;
        }

        return $default_review_id;
    }
    
    // Updating widget replacing old instances with new
    public function update( $new_instance, $old_instance ) {
        $instance = array();
        $instance['fields']     = ( ! empty( $new_instance['fields'] ) ) ? strip_tags( $new_instance['fields'] ) : '';
        $instance['title']      = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
        $instance['is_sticky']  = $new_instance['is_sticky'] ?? false ;

        for( $i = 0; $i < $instance['fields']; $i++ ){
            $instance["review_id_$i"] = ( ! empty( $new_instance["review_id_$i"] ) ) ? strip_tags( $new_instance["review_id_$i"] ) : '';
        }

        return $instance;
    }   
}