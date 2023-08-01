<?php

namespace NBuilder\Blocks;



class HeadingBlock extends BaseBlock {

    public function get_name(): string {
		return 'test_one_heading';
	}

    public function get_title(): string {
		return 'Heading Block';
	}

	protected function register_controls( $options = [] ) {
		$this->start_controls_section(
			'main_section',
			[
				'label' => 'Settings',
			]
		);

		$this->add_control(
			'heading_title',
			[
				'label' 	=> 'Title',
				'type' 		=> \NBuilder\Controls\Controls::TEXT,
				'default'	=> 'Some Heading Title Here...'
			]
		);


		$this->add_control(
			'heading_tag',
			[
				'label' => 'Tag',
				'type' => \NBuilder\Controls\Controls::SELECT,
				'options' => [
					'h1' 	=> 'H1',
					'h2' 	=> 'H2',
					'h3' 	=> 'H3',
					'h4' 	=> 'H4',
					'h5' 	=> 'H5',
					'h6' 	=> 'H6',
					'div' 	=> 'div',
					'span' 	=> 'span',
					'p' 	=> 'p',
				],
				'default' => 'h2',
			]
		);

		// $this->add_control(
		// 	'heading_color',
		// 	[
		// 		'label' => 'Heading Text Color',
		// 		'type' => \NBuilder\Controls\Controls::TEXT,
		// 		'selectors' => [
		// 			'{{WRAPPER}} h2' => 'color: {{VALUE}};',
		// 			'{{WRAPPER}} span' => 'background-color: {{VALUE}};',
		// 		],
		// 	]
		// );

		$this->end_controls_section();

		$this->start_controls_section(
			'style_section',
			[
				'label' => 'Settings',
				'type' => \NBuilder\Controls\Controls::STYLE,
			]
		);

		$this->add_control(
			'widget_color_text',
			[
				'label' => 'Style Headging',
				'type' => \NBuilder\Controls\Controls::TEXT,
			]
		);

		$this->end_controls_section();
	}

	protected function render(): string {
		$settings 	= $this->get_settings_for_display();
		$tag 		= $settings['heading_tag'] 		?? 'h2';
		$title 		= $settings['heading_title'] 	?? 'Some Heading Title Here...';

		echo "<$tag>$title</$tag>";	
		return '';
	}
}