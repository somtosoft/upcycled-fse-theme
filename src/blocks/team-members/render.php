<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div class="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
    <?php
    $teamMembers = new WP_Query(array(
        'post_type' => 'team',

    ));
    while ($teamMembers->have_posts()) {
        $teamMembers->the_post(); ?>

        <div class="flex flex-col space-y-4 w-full md:max-w-sm  ">
            <?php
            $image = get_field('image');
            if (!empty($image)) : ?>
                <img class="w-full   rounded-2xl object-cover" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
            <?php endif; ?>

            <div class="flex-col justify-center items-center gap-26 flex">
                <div class="text-primary text-xl font-bold  leading-9">
                    <?php the_title() ?>
                </div>
                <div class=" text-on-surface text-xl font-normal  leading-tight tracking-tight">
                    <?php the_field('position') ?>
                </div>
            </div>
            <div class="flex justify-center gap-2">
                <?php if(get_field('linkedin')): ?>
                    <a href="<?php the_field('linkedin') ?>"
                    class="  p-2 hover:-translate-y-1 transform transition-all duration-300 ease-in-out bg-secondary text-on-secondary rounded-full"
                    target="_blank" rel="noopener noreferrer">
                    <svg aria-hidden="true" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-6 w-6"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" class=""></path></svg>
                    </a>
                <?php endif; ?>


            </div>
        </div>
    <?php
    }
    ?>
</div>
