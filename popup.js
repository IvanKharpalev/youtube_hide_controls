document.getElementById('enable').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.executeScript(tabs[0].id, {
            code: `
                console.log('No controls over the vide when mouse is out of the page.');

                function set_youtube_video_controls_hidden(value) {
                    console.log("called value=", value);
                    document.querySelector('.ytp-title-text').hidden=value;
                    document.querySelector('.ytp-chrome-bottom').hidden=value;
                }
                function mouseenter_cb() {
                    set_youtube_video_controls_hidden(false);
                }
                function mouseleave_cb() {
                    set_youtube_video_controls_hidden(true);
                }

                function get_video() {}
                document.body.addEventListener('mouseenter', mouseenter_cb);
                document.body.addEventListener('mouseleave', mouseleave_cb);
                window.remove_youtube_event_listeners = function() {
                    document.body.removeEventListener('mouseenter', mouseenter_cb);
                    document.body.removeEventListener('mouseleave', mouseleave_cb);
                    set_youtube_video_controls_hidden(false);
                    delete window.remove_youtube_event_listeners;
                }
            `
        });
    });
});


document.getElementById('disable').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.executeScript(tabs[0].id, {
            code: `
            if (window.remove_youtube_event_listeners) {
                window.remove_youtube_event_listeners();
            } else {
                console.log('No event listeners to remove');
            }`
              
        });
    });
});
