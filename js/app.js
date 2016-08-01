
var showResults = function(resultItem) {

	// clone our result template code
	var etsyResult = $('.template .result').clone();

	var imageThumb = etsyResult.children('img.resultImg');
	imageThumb.attr('src', resultItem.Images[0].url_170x135);

	var listingName = etsyResult.children('p.resultTitle');
	listingName.html(resultItem.title);

	var detailImage = etsyResult.find('.detailImg');
	detailImage.attr('src', resultItem.Images[0].url_170x135);

	var detailTitle = etsyResult.find('span.detailTitle');
	detailTitle.html(resultItem.title);

	var category = etsyResult.find('span.category');
	category.html(resultItem.category_path);

	var tags = etsyResult.find('span.tags');
	tags.html(resultItem.tags);

	var mat = etsyResult.find('span.materials')
	mat.html(resultItem.materials);

	var price = etsyResult.find('p.price');
	price.text(resultItem.price + ' ' + resultItem.currency_code);

	var desc = etsyResult.find('span.description');
	desc.html(resultItem.description);

	var purchase = etsyResult.find('.purchase');
	purchase.attr('href', resultItem.url);

	return etsyResult;
};


var videos = function(ytVideo) {

	var ytResult = $('#youtube .youtubeResult').clone();

	var youtubeImg = ytResult.children('img.imageYT');
	youtubeImg.attr('src', ytVideo.snippet.thumbnails.default.url);

	var youtubeURL = "https://www.youtube.com/watch?v=" + ytVideo.id.videoId;
	var youtubeLink  = ytResult.children('a.urlYT');
	youtubeLink.attr('href', youtubeURL);

	var youtubeTitle = ytResult.find('p.titleYT');
	youtubeTitle.text(ytVideo.snippet.title);

	var youtubeDesc = ytResult.find('span.descYT');
	youtubeDesc.text(ytVideo.snippet.description);

	return ytResult;
};

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
				var resultItem = showResults(item);
				$('#create-results').append(resultItem);
				
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
			var ytVideo = videos(item)
			$('#youtube').append(ytVideo);
		});
	});

};



$(document).ready(function() {
	$('#create').submit(function(e){

		// Clear previous results' listings
		$(this).siblings('#create-results').empty();
		
		// Prevent page reload	
		e.preventDefault();

		// Get the value of the Create search word
		var createitem = $(this).find('#create-input').val();

		createCrafts(createitem);
		learnCrafts(createitem);

		//clear Create search field
		$('#create-input').val('');
	});
	
	/*--- Display overlay for details ---*/
  	$("#create-results").on( "click", "img.resultImg", function() {
    	$(this).siblings(".overlay").fadeIn(1000);
  	});

  	$("#create-results").on( "click", "a.close", function() {
  		$(".overlay").fadeOut(1000);
  	});

  	$('#create-results').on('click', 'button.panel', function(createitem) {
  		$(this).siblings('#youtube').slideToggle();
  	});

})