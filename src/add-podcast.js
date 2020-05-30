const $ = require('jquery');

$(() => {
  function addPodcast (event) {
    event.preventDefault();

    const podcastSearchTerm = $('#podcastName').val().trim();

    $('#podcastName').val('');

    // DEBUG:
    // console.log(`podcastSearchTerm = ${podcastSearchTerm}`);

    $.ajax({
      url: 'https://itunes.apple.com/search',
      data: {
        term: podcastSearchTerm.toLowerCase(),
        entity: 'podcast',
        limit: '1'
      },
      type: 'GET',
      dataType: 'jsonp'
    }).then((response) => {
      const result = response.results;

      // DEBUG:
      // console.log(result[0].feedUrl);

      $.post('/api/podcast', { rssUrl: result[0].feedUrl }, async (response) => {
        // DEBUG:
        // console.log(`response = ${JSON.stringify(response)}`);

        location.reload();
      });
    });
  }

  // Listen for the Add (podcast) button to be clicked.
  $('#addPodcast').on('click', addPodcast);

  // Listen for the Add (podcast) text input to change.
  $('#podcastName').on('change', addPodcast);

  // Listen for a Subscribe button to be clicked.
  $(document).on('click', '.subscribe', function (event) {
    event.preventDefault();

    const podId = event.target.id;

    // DEBUG:
    // console.log(`User ${userId} subscribed to Podcast ${podId}!`);

    $.post(`/api/podcast/${podId}`,
      { podcastId: podId, subscribe: true },
      async (response) => {
        // DEBUG:
        // console.log(`response = ${JSON.stringify(response.subscribed)}`);

        if (response.subscribed) {
          // $(`[data-podcast-id="${podId}"]`).empty().addClass('text-muted').append('Subscribed');
          $(this).removeClass('btn-outline-dark').addClass(['btn-outline-light', 'text-dark']).attr({ disabled: true }).text('Subscribed');
        }
      });
  });
});
