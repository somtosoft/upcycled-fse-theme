<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
// get the block attributes
$block_attributes = $attributes;
?>
<div class="relative overflow-hidden w-full px-">

	<div class="flex gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory" style="scrollbar-width: none;" id="testimonial-list">

		<?php
		$testimonies = new WP_Query(array(
			'post_type' => 'testimony',

		));
		while ($testimonies->have_posts()) {
			$testimonies->the_post(); ?>
			<div class="flex flex-col gap-2 min-w-[300px]   ">
				<div class="flex gap-2 items-center">
					<div class="w-12 h-12 bg-secondary text-on-secondary font-bold font-h5 rounded-full flex items-center justify-center">
						<!-- show only first letter of the title -->
						<?php echo substr(get_the_title(), 0, 1); ?>
					</div>
					<h6 class="font-bold"> <?php the_title(); ?></h6>
				</div>
				<p class="text-small">
					<?php the_field('comment'); ?>
				</p>
			</div>
		<?php
		}
		?>
	</div>
	<!-- left and right controls for desktop -->
	<div class="flex justify-end w-full gap-4 mt-8">
		<div onclick="moveLeft()" class="hidden  left-0 top-0 bottom-0 md:flex items-center justify-center h-12 w-12 text-on-surface-variant cursor-pointer  bg-surface-variant/50 ">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</div>
		<div onclick="moveRight()" class="hidden  right-0 top-0 bottom-0 md:flex items-center justify-center h-12 w-12 bg-surface-variant/50  text-on-surface-variant cursor-pointer">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</div>
	</div>
</div>
<script>
	const scrollContainer = document.querySelector('#testimonial-list');

	function moveRight() {
		scrollContainer.scrollBy({
			left: 300,
			behavior: 'smooth'
		});
	}

	function moveLeft() {
		scrollContainer.scrollBy({
			left: -300,
			behavior: 'smooth'
		});
	}
</script>
