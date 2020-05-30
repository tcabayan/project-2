const $ = require('jquery');

$(() => {
  // Listen for a Subscribe button to be clicked.
  $(document).on('click', '.subscribe', function (event) {
    event.preventDefault();

    const podId = $(this).attr('data-podId');

    // DEBUG:
    // console.log(`User ${userId} subscribed to Podcast ${podId}!`);

    $.post(`/api/podcast/${podId}`, { podcastId: podId, subscribe: true })
      .then(async (response) => {
        // DEBUG:
        // console.log(`response = ${JSON.stringify(response.subscribed)}`);

        if (response.subscribed) {
          // $(`[data-podcast-id="${podId}"]`).empty().addClass('text-muted').append('Subscribed');
          $(this).removeClass('btn-outline-dark').addClass(['btn-outline-light', 'text-dark']).attr({ disabled: true }).text('Subscribed');
        }
      });
  });
});
