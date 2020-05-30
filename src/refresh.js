const $ = require('jquery');

$(() => {
  // Listen for the refresh button click event.
  $('#refresh').on('click', function (event) {
    event.preventDefault();
    const podId = $(this).attr('data-podId');

    $.get(`/api/podcast/${podId}/refresh`)
      .then(() => {
        location.reload();
      });
  });
});
