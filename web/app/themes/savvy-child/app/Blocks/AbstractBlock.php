<?php

namespace ScTheme\Blocks;

use Timber\Timber;

abstract class AbstractBlock {
    const block_name    = '';
    const title         = null;
    const icon          = null;

    public function register() {
        acf_register_block_type([
            'name'      => static::block_name,
            'title'     => static::title,
            'icon'      => static::icon,
            'category'  => 'ps-blocks',
            'render_callback' => [$this, 'render'],
            'supports'  => ['align' => false],
            'mode'      => 'edit',
        ]);

        $this->afterRegister();
    }

    public function afterRegister() {
    }

    public function getBlockName() {
        return static::block_name;
    }

    public function render($block, $content = '', $is_preview = false) {
        $context                = Timber::context();
        $context['block']       = $block;
        $context['fields']      = get_fields();
        $context['is_preview']  = $is_preview;

        $context = apply_filters( 'vv_block_render_context__' . static::block_name, $context );

        Timber::render(
            'blocks/' . preg_replace( '/^' . preg_quote('vv-', '/') . '/', '', static::block_name ) . '.twig',
            $context
        );
    }

    public function getPosts($queryArgs = []) {
        $posts = Timber::get_posts($queryArgs);

        foreach ($posts as $post) {
            $GLOBALS['posts_in_page'][] = $post->id;
        }

        return $posts;
    }
}

