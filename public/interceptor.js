window.addEventListener('message', function (e) {
  if (e.data.type === '__canyon__event_get_coverage_and_canyon_data_request') {
    window.postMessage(
      {
        type: '__canyon__event_get_coverage_and_canyon_data_response',
        payload: {
          canyon: window.__canyon__,
          coverage: window.__coverage__,
        },
      },
      '*',
    );
  }
});
