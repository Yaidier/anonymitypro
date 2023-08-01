<?php

use NBuilder\App;

// App::instance()->editor->load_editor();
$base_id = $block->attributes['block_id'];

?>

<div class="nb-main_wrap nb-base" data-blockid="<?php echo $block->attributes['block_id']; ?>">
	<div class="nb-main_wrap_tag">Base</div>
	<?php App::instance()->render_noder_structure( $base_id );	?>
</div>