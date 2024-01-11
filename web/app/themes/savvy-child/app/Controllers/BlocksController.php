<?php

namespace ScTheme\Controllers;

use Phospr\Fraction;
use ScTheme\Blocks\AbstractBlock;
use ScTheme\Blocks\ImageAndContentBlock;
use ScTheme\Blocks\ButtonBlock;
use ScTheme\Blocks\HeaderBlock;
use ScTheme\Blocks\NewsCardsBlock;
use ScTheme\Blocks\ArticlesCardsBlock;
use ScTheme\Blocks\VpnOverviewBlock;
use ScTheme\Blocks\VpnProvidersBlock;
use ScTheme\Blocks\FooterBlock;
use ScTheme\Blocks\PopupBlock;

/**
 * The Blocks Controller Class
 *
 * @author Yaidier Perez & Daymit Crego 
 * */

class BlocksController {

    public static $blocks = [];

    public static function init() {
        self::add_blocks();
        self::add_hooks();
    }

    public static function add_blocks(){
        self::add_block( new ImageAndContentBlock() );
        self::add_block( new ButtonBlock() );
        self::add_block( new HeaderBlock() );
        self::add_block( new NewsCardsBlock() );
        self::add_block( new ArticlesCardsBlock() );
        self::add_block( new VpnOverviewBlock() );
        self::add_block( new VpnProvidersBlock() );
        self::add_block( new FooterBlock() );
        self::add_block( new PopupBlock() );
    }

    public static function add_hooks(){
        add_action( 'acf/init',                 [ self::class, 'register_blocks' ] );
        add_filter( 'block_categories_all',     [ self::class, 'register_categories' ] );
        add_filter( 'render_block',             [ self::class, 'render_block' ], 10, 2 );
    }

    public static function add_block( AbstractBlock $block ) {
        array_push( self::$blocks, $block );
    }

    public static function register_categories( $categories ) {
        $categories = array_merge( $categories, [['slug' => 'ps-blocks', 'title' => 'Savvy Child - Blocks']] );

        return $categories;
    }

    public static function register_blocks() {
        foreach ( self::$blocks as $block ) {
            $block->register();
        }
    }

    public static function render_block( $blockContent, $block = null ) {
        if ( $block['blockName'] === 'core/columns' ) {
            $columnCount = substr_count( $blockContent, 'class="wp-block-column"' );
            $columnCount = ( $columnCount == 0 ) ? 1 : $columnCount;
            $equalLgSize = 12 / $columnCount;

            if ( !is_integer( $equalLgSize ) ) {
                $equalLgSize = 12;
            }

            $equalLgSize = Fraction::fromString( $equalLgSize . '/12' );

            // Add tailwind wrapper
            $blockContent = str_replace( 'wp-block-columns', 'ps-columns flex flex-wrap -mx-2', $blockContent );

            // Add tailwind support for equal sizes
            $blockContent = str_replace( 
                '<div class="wp-block-column">',
                '<div class="w-full lg:w-' . $equalLgSize . ' px-2">',
                $blockContent
             );

            // Add tailwind support for fractional sizes
            $blockContent = str_replace( 
                '<div class="wp-block-column" style="flex-basis:66.66%">',
                '<div class="w-full lg:w-2/3 px-2">',
                $blockContent
             );
            $blockContent = str_replace( 
                '<div class="wp-block-column" style="flex-basis:33.33%">',
                '<div class="w-full lg:w-1/3 px-2">',
                $blockContent
             );
            $blockContent = str_replace( 
                '<div class="wp-block-column" style="flex-basis:50%">',
                '<div class="w-full lg:w-1/2 px-2">',
                $blockContent
             );
            $blockContent = str_replace( 
                '<div class="wp-block-column" style="flex-basis:25%">',
                '<div class="w-full lg:w-1/4 px-2">',
                $blockContent
             );

            // Remove any remaining inline style 
            $blockContent = preg_replace( '/( class="wp-block-column" style=".*" )/', 'class="w-full px-2"', $blockContent );
        }

        if ( $block['blockName'] === 'core/heading' ) {
            $level = $block['attrs']['level'] ?? 2;
            $align = $block['attrs']['align'] ?? 'left';

            if ( ( int ) $level === 2 && $align === 'center' ) {
                $blockContent = '<div class="flex justify-center t33">' . $blockContent . '</div>';
            }
        }

        if ( $block['blockName'] === 'yoast/faq-block' ) {
            $blockContent = \Timber::compile( 'blocks/yoast-faq-block.twig', ['block' => $block] );
        }

        return $blockContent;
    }
}
