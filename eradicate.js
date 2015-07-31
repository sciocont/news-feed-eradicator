var quoteList = [ 
	{
		quote: " There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one; and that, whilst this planet has gone cycling on according to the fixed law of gravity, from so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved.",
		source: "Darwin"
	
];


var selectedQuote = quoteList[Math.floor(Math.random() * quoteList.length)];

var quoteDiv, quoteText, quoteSource, fbLink, infoPanel, taikoPic;

quoteDiv = $("<div class='nfe-quote'/>");

// Info panel, hidden by default
infoPanel = $("<div class='nfe-info-panel'></div>")
    .hide()
    .appendTo(quoteDiv);

quoteText = $("<p>“"+selectedQuote.quote+"”</p>")
    .addClass('nfe-quote-text')
    .appendTo(quoteDiv);

quoteSource = $("<p>~ "+selectedQuote.source+"</p>")
    .addClass('nfe-quote-source')
    .appendTo(quoteDiv);

var hideInfoPanel = function(){
    $('div.nfe-info-panel').hide();
}

var extensionURL = function(relativeURL){
    if(window.chrome !== undefined){
        // Chrome extension
        return chrome.extension.getURL(relativeURL);
    }else{
        // Firefox extension
        return self.options.urls[relativeURL];
    }
}

fbLink = $("<a href='javascript:;'>News Feed Eradicator :)</a>")
    .addClass('nfe-info-link')
    .on('click', function(){
      var handleClose = function() {
        $('.nfe-close-button').on('click', hideInfoPanel);
      };
      var url = 'info-panel.html';

      if (window.chrome !== undefined) {
        // Chrome extension
        infoPanel.load(chrome.extension.getURL(url),
                       handleClose);
      } else {
        // Firefox extension
        self.port.emit('requestUrl', url);
        self.port.once(url, function(data) {
          console.log("Received data for ", url);
          infoPanel.html(data);
          handleClose();
        });
      }
      infoPanel.show();
    })
	.appendTo(quoteDiv);

// This delay ensures that the elements have been created by Facebook's
// scripts before we attempt to replace them
setInterval(function(){
    // Replace the news feed
	$("div#pagelet_home_stream").replaceWith(quoteDiv);
	$("div[id^='topnews_main_stream']").replaceWith(quoteDiv);

    // Delete the ticker
    $("div#pagelet_ticker").remove();

    // Delete the trending box
    $("div#pagelet_trending_tags_and_topics").remove();
}, 1000);


