<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<!-- <p <?php echo get_block_wrapper_attributes(); ?>> -->
<div class="rounded-lg overflow-hidden">
    <iframe 
    title="<?php echo $attributes['title'] ?>"
    src="<?php echo $attributes['embedSource'] ?>" width="<?php echo $attributes['width'];?>" height="<?php echo $attributes['height'];?>" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
</div>

 