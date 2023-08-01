<?php

namespace NBuilder\Blocks;

class ColumnsBlock extends BaseBlock {

    public function get_name(): string {
		return 'nb_columns_block';
	}

    public function get_title(): string {
		return 'Columns';
	}

	protected function register_controls( $options = [] ) {
		$this->start_controls_section(
			'main_section',
			[
				'label' => 'Settings',
			]
		);

		// $this->add_control(
		// 	'column_width',
		// 	[
		// 		'label' 	=> 'Column Width',
		// 		'type' 		=> \NBuilder\Controls\Controls::TEXT,
		// 		'default' 	=> '100%',
		// 		'selectors' => [
		// 			'{{WRAPPER}}' => 'width: {{VALUE}};',
		// 		],
		// 	],
		// );





		$this->add_control(
			'separator_panel_style',
			[
				'type' => \NBuilder\Controls\Controls::DIVIDER,
				'style' => 'thick',
			]
		);

		// $this->add_control(
		// 	'display_property',
		// 	[
		// 		'label' => 'Display Property',
		// 		'type' => \NBuilder\Controls\Controls::SELECT,
		// 		'options' => [
		// 			'block' => 'Block',
		// 			'flex' 	=> 'Flex',
		// 			'grid' 	=> 'Grid',
		// 		],
		// 		'default' => 'block',
		// 		'selectors' => [
		// 			'{{WRAPPER}}' => 'display: {{VALUE}};',
		// 		],
		// 	]
		// );

		$this->add_responsive_control(
			'display_property',
			[
				'label' => 'Display Property',
				'type' => \NBuilder\Controls\Controls::SELECT,
				'options' => [
					'block' => 'Block',
					'flex' 	=> 'Flex',
					'grid' 	=> 'Grid',
				],
				'default' => 'block',

				'tablet_default' => 'grid',
				'mobile_default' => 'grid',
				'selectors' => [
					'{{WRAPPER}}' => 'display: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'bg',
			[
				'label' => 'Background Property',
				'type' => \NBuilder\Controls\Controls::SELECT,
				'options' => [
					'white' => 'White',
					'red' 	=> 'Red',
					'blue' 	=> 'Blue',
					'green' => 'Green',
					'grey' 	=> 'Grey',
				],
				'default' => 'white',
				'tablet_default' => 'red',
				'mobile_default' => 'green',
				'selectors' => [
					'{{WRAPPER}}' => 'background-color: {{VALUE}};',
				],
			]
		);

		// $this->add_control(
		// 	'flex_direction',
		// 	[
		// 		'label' => 'Flex Direction',
		// 		'type' => \NBuilder\Controls\Controls::SELECT,
		// 		'options' => [
		// 			'row' 		=> 'Row',
		// 			'column' 	=> 'Column',
		// 		],
		// 		'default' => 'row',
		// 		'selectors' => [
		// 			'{{WRAPPER}}' => 'flex-direction: {{VALUE}};',
		// 		],
		// 		'condition' => [
		// 			'display_property' => 'flex',
		// 		],
		// 	]
		// );

		// $this->add_control(
		// 	'justify_content',
		// 	[
		// 		'label' => 'Justify Content',
		// 		'type' => \NBuilder\Controls\Controls::SELECT,
		// 		'options' => [
		// 			'flex-start' 	=> 'Start',
		// 			'center' 		=> 'Center',
		// 			'flex-end' 		=> 'End',
		// 			'space-between' => 'Space Between',
		// 		],
		// 		'default' => 'center',
		// 		'selectors' => [
		// 			'{{WRAPPER}}' => 'justify-content: {{VALUE}};',
		// 		],
		// 		'condition' => [
		// 			'display_property' => 'flex',
		// 		],
		// 	]
		// );

		// $this->add_control(
		// 	'align_items',
		// 	[
		// 		'label' => 'Align Items',
		// 		'type' => \NBuilder\Controls\Controls::SELECT,
		// 		'options' => [
		// 			'flex-start'    => 'Flex Start',
		// 			'center' 		=> 'Center',
		// 			'flex-end' 		=> 'Flex End',
		// 			'stretch' 		=> 'Stretch',
 		// 			'baseline' 		=> 'Baseline',
 		// 			'initial' 		=> 'Initial',
 		// 			'inherit' 		=> 'Inherit',
		// 		],
		// 		'default' => 'center',
		// 		'selectors' => [
		// 			'{{WRAPPER}}' => 'align-items: {{VALUE}};',
		// 		],
		// 		'condition' => [
		// 			'display_property' => 'flex',
		// 		],
		// 	]
		// );

		// $this->add_control(
		// 	'gap',
		// 	[
		// 		'label' => 'Gap',
		// 		'type' => \NBuilder\Controls\Controls::TEXT,
		// 		'default' => '10px',
		// 		'selectors' => [
		// 			'{{WRAPPER}}' => 'gap: {{VALUE}};',
		// 		],
		// 		'condition' => [
		// 			'display_property' => 'flex',
		// 		],
		// 	]
		// );

		// $this->add_control(
		// 	'grid_cols',
		// 	[
		// 		'label' => 'Grid Columns',
		// 		'type' => \NBuilder\Controls\Controls::TEXT,
		// 		'default' => '3',
		// 		'selectors' => [
		// 			'{{WRAPPER}}' => 'grid-template-columns: repeat({{VALUE}}, minmax(0, 1fr));',
		// 		],
		// 		'condition' => [
		// 			'display_property' => 'grid',
		// 		],
		// 	]
		// );

		// $this->add_control(
		// 	'grid_cols_tablet',
		// 	[
		// 		'label' => 'Grid Columns (Tablet)',
		// 		'type' => \NBuilder\Controls\Controls::TEXT,
		// 		'default' => '3',
		// 		'selectors' => [
		// 			'@media screen and (max-width: 1024px){ {{WRAPPER}}' => 'grid-template-columns: repeat({{VALUE}}, minmax(0, 1fr)) };',
		// 		],
		// 		'condition' => [
		// 			'display_property' => 'grid',
		// 		],
		// 	]
		// );
 
		// $this->add_control(
		// 	'grid_gap',
		// 	[
		// 		'label' => 'Gap',
		// 		'type' => \NBuilder\Controls\Controls::TEXT,
		// 		'default' => '10px',
		// 		'selectors' => [
		// 			'{{WRAPPER}}' => 'gap: {{VALUE}};',
		// 		],
		// 		'condition' => [
		// 			'display_property' => 'grid',
		// 		],
		// 	]
		// );

		$this->end_controls_section();
	}

	protected function render(): string {
		$settings = $this->get_settings_for_display();


			
		return '';
	}
}