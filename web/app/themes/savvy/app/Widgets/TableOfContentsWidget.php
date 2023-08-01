<?php

namespace SavvyTheme\Widgets;

use SavvyTheme\Resources\Utilities;

class TableOfContentsWidget extends \WP_Widget {
    const widget_name = 'ps_widget_table_of_contents';

    public function __construct() {
        parent::__construct(self::widget_name, 'Table of Contents', [
            'classname'                     => 'backThumb ps-widget ps-widget--table-of-contents',
            'test'                          => 'test',
            'description'                   => 'Table of Contents widget.',
            'customize_selective_refresh'   => true,
        ]);
    }
    
    public function get_page_headings( $post_id ){
        $page_content   = apply_filters( 'the_content', get_the_content( null, false, $post_id ) );
        $page_headings  = $this->getHeadingsFromContent( $page_content );

        return $page_headings;
    }

    public function update($new_instance, $old_instance) {
        $instance                       = $old_instance;
        $instance['title']              = sanitize_text_field($new_instance['title']);
        $instance['tags']               = $new_instance['tags'];
        $instance['is_sticky']          = $new_instance['is_sticky'] ?? false;
        $instance['has_article_score']  = $new_instance['has_article_score'] ?? false;

        return $instance;
    }

    public function form($instance) {
        $title              = isset($instance['title']) ? esc_attr($instance['title']) : '';
        $is_sticky          = $instance['is_sticky'] ?? false;
        $has_article_score  = $instance['has_article_score'] ?? false;

        // Is Sticky
        ?>
            <p>
                <input class="" id="<?php echo $this->get_field_id('is_sticky'); ?>" name="<?php echo $this->get_field_name('is_sticky'); ?>" type="checkbox" <?php if ($is_sticky) : ?> checked="checked" <?php endif; ?> />
                <label for="<?php echo $this->get_field_id('is_sticky'); ?>"><?php _e('Is Sticky'); ?></label>
            </p>
            <p>
                <input class="" id="<?php echo $this->get_field_id('has_article_score'); ?>" name="<?php echo $this->get_field_name('has_article_score'); ?>" type="checkbox" <?php if ($has_article_score) : ?> checked="checked" <?php endif; ?> />
                <label for="<?php echo $this->get_field_id('has_article_score'); ?>"><?php _e('Include Article Score'); ?></label>
            </p>
        <?php

        ?>
            <p>
                <label for="<?php echo $this->get_field_id('title'); ?>">Title:</label>
                <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
            </p>
        <?php
    }

    public function widget($args, $instance) {
        global $post;

        if ( ! $post ) {
            return;
        }

        $page_headings = false;

        if( !$page_headings ) {
            $page_headings  = $this->get_page_headings( $post->ID );
        }

        $twig_args = [
            'args'              => $args,
            'instance'          => $instance,
            'page_headings'     => $page_headings,
            'is_sticky'         => $instance['is_sticky'] ?? false,
            'has_article_score' => $instance['has_article_score'] ?? false,
        ];

        if( $twig_args['has_article_score'] ) {
            $twig_args['article_score_data'] = Utilities::set_article_score_data();
        }

        $path_to_widget_template = get_stylesheet_directory() . '/templates/widgets/table-of-contents.twig';
        
        \Timber::render( $path_to_widget_template, $twig_args );
    }

    public function getHeadingsFromContent($content) {
        $nested_headings = [];

        preg_match_all('/<h(?<depth>[2-3]) id="(?<id>.*)"[^>]*?>(?<title>.*?)<\/h[2-3]>/i', $content, $matches);

        $current_depth = 2;

        foreach ($matches[0] as $index => $title) {
            $id = $matches['id'][$index];

            // fix id when heading is linked
            if (strpos($id, '"')) {
                $id = substr($id, 0, strpos($id, '"'));
            }

            $item = [
                'id' => $id,
                'title' => strip_tags($matches['title'][$index]),
                'depth' => (int) $matches['depth'][$index],
                'children' => [],
            ];

            if ($item['depth'] > $current_depth) {
                $nested_headings[count($nested_headings) - 1]['children'][] = $item;
            } else {
                $nested_headings[] = $item;
            }
        }

        return $nested_headings;
    }
}
