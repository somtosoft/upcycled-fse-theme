<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div class="flex  items-center justify-center gap-6 w-full flex-wrap ">
	<?php
	$args =
		array(
			'post_type' => 'partner',

		);
	$partner = new WP_Query($args);


	while ($partner->have_posts()) {
		$partner->the_post();
		$image = get_field('logo');

	?>

		<a class="hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer max-w-xs"
			href="<?php the_field('website'); ?>"
			target="_blank"
			rel="noopener noreferrer">



			<img src="<?php echo $image['url']; ?>" alt="">
		</a>




<?php
	}
?>
</div>
