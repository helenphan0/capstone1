

var createCrafts = function(createitem) {
	
	var request = { 
		api_key: 'mzuqxoiomej58vknkm90fssa',
		limit: 10,
		keywords: createitem,
		sort_on: 'score',
		sort_order: 'down'
	};
	
	$.ajax({
		url: "https://openapi.etsy.com/v2/listings/active.js?includes=Images",
		data: request,
		dataType: "jsonp",
		type: "GET",
		success: (function(data){ 
			$.each(data.results, function(i, item) {
				var image = '<img src="' + item.Images[0].url_170x135 + '">';
				var title = item.title;
				$('#create-results').append('<div class="etsy result">' + image + '<p>' + title + '</p>'  +  '</div>');
			});
		})
	});
};

var learnCrafts = function(createitem) {
	var request = {
		part: 'snippet',
		key: 'AIzaSyDnahmSz7sdcFj_jMe6pb-P5vPxdO9Me2A',
		q: 'how to make a ' + createitem,
		r: 'json',
	};
	
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: request,
		type: "GET"
	})
	.done(function(result){
		$.each(result.items, function(i, item) {
			var image = '<img src="' + item.snippet.thumbnails.medium.url + '">';
			var title = item.snippet.title;
			var divclass = "youtube";
			$('#create-results').append('<div class="youtube result">' + image + '<p>' + title + '</p>'  +  '</div>');
		});
	});

};



$(document).ready(function() {
	$('#create').submit( function(e){

		// Clear previous results' listings
		$(this).siblings('div.resultbox').children('').remove();
		
		// Prevent page reload	
		e.preventDefault();

		// Get the value of the Create search word
		var createitem = $(this).find('#create-input').val();

		createCrafts(createitem);

		//clear Create search field
		$('#create-input').val('');
	});
	$('#learn').submit( function(e){

		// Clear previous results' listings
		$(this).siblings('div.resultbox').children('').remove();

		// Prevent page reload
		e.preventDefault();

		// Get the value of the Create search word
		var createitem = $(this).find('#learn-input').val();

		learnCrafts(createitem);

		//clear Create search field
		$('#learn-input').val('');
	});

	/*--- Display information modal box ---*/
  	$(".resultbox").on( "click", "div.result", function() {
    	$(this).toggleClass('zoomhance');
  	});

  	/*--- Hide information modal box ---*/
 // 	$("a.close").click(function(){
 // 		$(".overlay").fadeOut(1000);
 // 	});
})