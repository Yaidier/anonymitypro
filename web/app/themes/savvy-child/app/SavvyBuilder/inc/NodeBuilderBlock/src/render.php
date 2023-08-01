<?php

// namespace NBuilder\NodeBuilderBlock\build;

use NBuilder\App;

$dumm = 1;

App::instance()->editor->load_editor();

$noder_structure = get_option( 'nb_data_' . $block->attributes['block_id'] );

?>
<div class="nb-main_wrap nb-base" data-baseid="<?php echo $block->attributes['block_id']; ?>">
	
	<?php echo $block->attributes['block_id']; ?>
	Some text
</div>