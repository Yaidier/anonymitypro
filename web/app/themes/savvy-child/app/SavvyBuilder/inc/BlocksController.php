<?php

namespace NBuilder;

use NBuilder\Blocks\HeadingBlock;
use NBuilder\Blocks\ColumnsBlock;
use NBuilder\Blocks\BaseBlock;
use NBuilder\Blocks\SwCategoriesListBlock;

class BlocksController {
    public $built_in_blocks = [];
    public $noder_blocks    = [];

    public function __construct(){
        /**
         * Add built-in blocks.
         */
        $this->built_in_blocks[] = HeadingBlock::class;
        $this->built_in_blocks[] = ColumnsBlock::class;
        $this->built_in_blocks[] = SwCategoriesListBlock::class;

        /**
         * Register built-in blocks.
         */
        $this->register_all_blocks();

        /**
         * Register external blocks.
         */
        add_action( 'init', function() {
            do_action( 'nbuilder/register_block', $this );
        } );
    }

	protected function register_all_blocks(){
		foreach ( $this->built_in_blocks as $built_in_block ) {
			$this->register( new $built_in_block );
		}
    }

    // public function register_single_block( $block_type ){

    // }

    public function register( BaseBlock $block ){
        $this->noder_blocks[$block->get_name()] = $block;

        /**
         * register shortcode
         */
        add_shortcode( $block->get_name(), [ $block, 'render_shortcode' ] );
    }
}