<?php

namespace ScTheme\Taxonomies;

class StreamingCategoryTaxonomy extends AbstractTaxonomy {
    const taxonomy_name         = 'streaming-cat';
    const object_type           = 'sc-streaming';
    const singular_name         = 'Streaming Category';
    const plural_name           = 'Streaming Categories';
    const is_public             = true;
    const is_hierarchical       = true;
    const is_in_nav_menus       = true;
}