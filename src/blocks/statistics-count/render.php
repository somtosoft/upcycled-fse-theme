<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div class="flex  items-center justify-center gap-4 w-full">
	<?php
	$args =
		array(
			'post_type' => 'statistic',

		);
	$statistic = new WP_Query($args);


	while ($statistic->have_posts()) {
		$statistic->the_post();

	?>
		<?php
		if (get_field('visible')) { ?>
			<div class="flex flex-col items-center justify-center p-4 rounded-lg bg-primary text-on-primary w-full">

				<div class="text-h3 font-bold text-center"><?php the_field('count'); ?></div>
				<div class="text-small text-center whitespace-nowrap"><?php the_field('category'); ?></div>
			</div>
		<?php } ?>
	<?php
	}
	?>
</div>
