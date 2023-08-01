<?php

namespace NBuilder\Blocks;


class SwCategoriesListBlock extends BaseBlock {

    public function get_name(): string {
		return 'categories-list';
	}

    public function get_title(): string {
		return 'Categories List';
	}

	protected function register_controls( $options = [] ) {
		$args = array(
			'taxonomy' 		=> 'streaming-cat',
			'orderby' 		=> 'name',
			'order'   		=> 'ASC',
			'hide_empty' 	=> false,
		);

		$categories = get_terms( $args );
		$options 	= [];

		foreach( $categories as $category ) {
			$options[$category->term_id] = $category->name;
		}

		reset( $options );
		$default_category = key( $options ) ?? '';

		$this->start_controls_section(
			'main_section',
			[
				'label' => 'Settings',
			]
		);

		$this->add_control(
			'category_list',
			[
				'label' => 'Category',
				'type' => \NBuilder\Controls\Controls::SELECT,
				'options' => $options,
				'default' => $default_category,
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'style_section',
			[
				'label' => 'Settings',
				'type' => \NBuilder\Controls\Controls::STYLE,
			]
		);

		$this->end_controls_section();
	}

	public function get_initials( string $title ) {
		$words = explode( ' ', $title );

		/**
		 * Open Tag.
		 */
		$initials = '<span class="{{tailwind_classes}}">';

		for ( $i = 0;  $i < 2; $i++ ) { 
			if( isset( $words[$i] ) ){
				$initials .= strtoupper( substr( $words[$i], 0, 1 ) );
			}
		}

		/**
		 * Close Tag.
		 */
		$initials .= '</span>';

		return $initials;
	}

	protected function render(): string {
		$posts_to_show 	= 3;
		$context 		= [];
		$posts			= [];
		$upcoming_posts = [];
		$iterator		= 0;
		$settings 		= $this->get_settings_for_display();
		$term_id 		= $settings['category_list'] ?? '';
		$term 			= get_term( $term_id);
		$term_imge_id 	= get_term_meta( $term_id, 'cat_featured_img_id', true );
		$short_desc 	= get_term_meta( $term_id, 'short_description', true );
		$term_img  		= wp_get_attachment_image( $term_imge_id, 'post-thumbnail', true, [ 'class' => '{{tailwind_classes}}' ] ) ?: $this->get_initials( $term->name );
		$wp_posts 		= get_posts(array(
			'post_type' 	=> 'sc-streaming',
			'numberposts' 	=> -1,
			'tax_query' 	=> array(
				array(
					'taxonomy'	=> 'streaming-cat',
					'field' 	=> 'term_id', 
					'terms' 	=> $term_id, 
					'include_children' => false
				)
			)
		));

		/**
		 * Prepare posts for context.
		 */
		foreach( $wp_posts as $wp_post ){
			$initials 		= '';
			$title 			= $wp_post->post_title;
			$featured_img 	= get_the_post_thumbnail( $wp_post, 'post-thumbnail', [ 'class' => '{{tailwind_classes}}' ] );
			$link 			= get_permalink( $wp_post );
			$official_link 	= get_post_meta( $wp_post->ID, 'official_link', true );
			$affiliate_link = get_post_meta( $wp_post->ID, 'external_link', true ) ?: $official_link;

			/**
			 * If there is no featured image,
			 * then generate Initials
			 */
			if( !$featured_img ){
				$initials = $this->get_initials( $title );
			}

			if( $iterator < $posts_to_show ){
				$posts[] = [
					'title' 			=> $title,
					'featured_img' 		=> $featured_img ?: $this->get_initials( $title ),
					'link'				=> $link,
					'official_link' 	=> $official_link,
					'affiliate_link' 	=> $affiliate_link,
					'initials'			=> $initials,
				];
			}
			else {
				$upcoming_posts[] = [
					'featured_img' => $featured_img,
				];
			}

			if( $iterator > $posts_to_show + 3 ){
				break;
			}

			$iterator++;
		}

		/**
		 * If upcoming is empty, then fill it with the first
		 * three images.
		 */
		if( empty( $upcoming_posts ) ){
			for( $i = 0; $i < 3;   $i++) { 
				$upcoming_posts[] = [
					'featured_img' => $posts[$i]['featured_img'],
				];
			}
		}

		$context['term_name'] 	= $term->name;
		$context['posts'] 		= $posts;
		$context['term_img'] 	= $term_img;
		$context['short_desc'] 	= $short_desc;
		$context['total_sites'] = count( $wp_posts );
		$context['upcoming'] 	= $upcoming_posts;

		return $this->render_template( $context );
	}
}