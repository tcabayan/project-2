const $ = require('jquery');

$(() => {
  function addPodcast () {
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
        console.log(`response = ${JSON.stringify(response)}`);

        location.reload();
      });
    });
  }

  // Listen for the Add (podcast) button to be clicked.
  $('#addPodcast').on('click', (event) => {
    event.preventDefault();

    addPodcast();
  });

  // Listen for the Add (podcast) text input to change.
  $('#podcastName').on('change', (event) => {
    event.preventDefault();

    addPodcast();
  });

  // Listen for the user to click on Subscriptions.
/*   $('.subscriptions').on('click', (event) => {
    event.preventDefault();

    console.log(event.target.id);

    $.post(`/api/subscriptions/${event.target.id}`, {}, async (response) => {
      // DEBUG:
      console.log(`response = ${JSON.stringify(response)}`);

/*         if (response.subscribed) {
          // $(`[data-podcast-id="${podId}"]`).empty().addClass('text-muted').append('Subscribed');
          $(this).removeClass('btn-outline-dark').addClass(['btn-outline-light', 'text-dark']).attr({ disabled: true }).text('Subscribed');
        }
*/
      // location.reload();
    //});
  //}); 

/*   $(document).on('click', '.listen', function (event) {
    event.preventDefault();

    const podId = event.target.id;

    $.post()

  }); */

  // Listen for a Subscribe button to be clicked.
  $(document).on('click', '.subscribe', function (event) {
    event.preventDefault();

    const podId = event.target.id;
    const userId = $(this).data('user-id');

    // DEBUG:
    // console.log(`User ${userId} subscribed to Podcast ${podId}!`);

    $.post(`/api/podcast/${podId}`,
      { userId: userId, podcastId: podId, subscribe: true },
      async (response) => {
        // DEBUG:
        // console.log(`response = ${JSON.stringify(response.subscribed)}`);

        if (response.subscribed) {
          // $(`[data-podcast-id="${podId}"]`).empty().addClass('text-muted').append('Subscribed');
          $(this).removeClass('btn-outline-dark').addClass(['btn-outline-light', 'text-dark']).attr({ disabled: true }).text('Subscribed');
        }

        // location.reload();
      });
  });
});
