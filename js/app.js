
var showResults = function(resultItem) {

	// clone our result template code
	var etsyResult = $('.template .result').clone();

	var imageThumb = etsyResult.children('img.resultImg');
	imageThumb.attr('src', resultItem.Images[0].url_170x135);

	var listingName = etsyResult.children('p.resultTitle');
	listingName.html(resultItem.title);

	var detailImage = etsyResult.find('.detailImg');
	detailImage.attr('src', resultItem.Images[0].url_170x135);

	var detailTitle = etsyResult.find('p.detailTitle');
	detailTitle.html(resultItem.title);

	var price = etsyResult.find('p.price');
	price.text(resultItem.price + ' ' + resultItem.currency_code);

	var desc = etsyResult.find('p.description');
	desc.html(resultItem.description);

	var purchase = etsyResult.find('.purchase');
	purchase.attr('href', resultItem.url);

	var tags = etsyResult.find('.tags');
	tags.attr('data-tags', resultItem.tags);
	var tagButtons;
	if (resultItem.tags && resultItem.tags.length) {
		tagButtons = $.map(resultItem.tags, function(item, i) {
			return '<span class="word" data-word="' + item + '">' + item + '</span>'
		});
	}
	else {
		tagButtons = 'There are no tags associated with this Etsy listing.'
	}
	tags.append(tagButtons);

	return etsyResult;
};


var videos = function(ytVideo) {

	var ytResult = $('.youtube>.youtubeResult').clone();

	var youtubeImg = ytResult.find('img.imageYT');
	youtubeImg.attr('src', ytVideo.snippet.thumbnails.high.url);

	var youtubeURL = "https://www.youtube.com/watch?v=" + ytVideo.id.videoId;
	var youtubeLink  = ytResult.children('a.urlYT');
	youtubeLink.attr('href', youtubeURL);
	youtubeLink.attr('target', '_blank');

	var youtubeTitle = ytResult.find('p.titleYT');
	youtubeTitle.text(ytVideo.snippet.title);

	return ytResult;
};

var findCrafts = function(createitem) {
	
	var request = { 
		api_key: 'mzuqxoiomej58vknkm90fssa',
		limit: 12,
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

var learnCrafts = function(createitem, tags) {
	var query = howto + createitem + ' ' + tags;
	var request = {
		part: 'snippet',
		key: 'AIzaSyDnahmSz7sdcFj_jMe6pb-P5vPxdO9Me2A',
		q: query,
		r: 'json',
	};
	
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: request,
		type: "GET"
	})
	.done(function(result){
		$('.youtubeResults').html('');
		$.each(result.items, function(i, item) {
			var ytVideo = videos(item);
			$('.youtubeResults').append(ytVideo);
		});
	});
};

var createitem;
var tagsArr = [];
var resultTags;
var howto = "how to make a ";

$(document).ready(function() {
    if (window.Appcues) {
        window.Appcues.on("step_interacted", (data) => {
            console.log('STEP INTERACTED', data);
        })
    }

	// Front page search input submission
	$('#create').submit(function(e){

		// Clear previous results' listings
		$('#create').siblings('#create-results').empty();

		// Prevent page reload	
		e.preventDefault();

		// Get the value of the Create search word
		createitem = $(this).find('#create-input').val();

		findCrafts(createitem);

		//clear Create search field
		$('#create-input').val('');
	});
	
	/*--- Display pop up with details ---*/
  	$("#create-results").on( "click", "img.resultImg", function() {
    	learnCrafts(createitem, '');

    	$(this).siblings(".overlay").fadeIn(300);
    	$(".grey-out").fadeIn(300);
  	});

  	// View tags on Etsy listing
	$(document).on("click", "p.refine-text", function() {
    	$(this).siblings('div.refine').toggleClass('hidden');
    });

	// Click on tag to add to search string
  	$(document).on("click", "span.word", function() {
		$(this).toggleClass('selected');

		// If word is highlighted, add it to array of new search words
		if ($(this).attr("class") == "word selected") {
			tagsArr.push($(this).attr("data-word"));
			resultTags = tagsArr.join(', ');
		}
		// If word is not highlighted, remove from array
		else if ($(this).attr("class") == "word") {
			var word = $(this).attr('data-word');
			var index = tagsArr.indexOf(word);
			if (index > -1) {
				tagsArr.splice(index, 1);
			}
			resultTags = tagsArr.join(', ');
		}	
	})

  	// Generate new Youtube tutorial search to include selected tags
	$(document).on("submit", "form.refine-search-form", function(event) {
		event.preventDefault();
		var tagsInput = $(this).children('input.tags-input');
		resultTags = resultTags || '';
		resultTags += (tagsInput.val() ? ' ' + tagsInput.val() : '');
		learnCrafts(createitem, resultTags);
		tagsInput.val('');
	})

  	/*--- Close out of detail box with corner icon --*/
  	$(document).on( "click", "a.close", function() {
  		tagsArr = [];
  		resultTags = '';
  		$(".overlay").fadeOut(300);
  		$(".grey-out").fadeOut(300);
  	});

  	/*--- Press ESC to close detail box ---*/
	$(document).bind('keydown',function(e){
		if ( e.which == 27 ) {
			tagsArr = [];
			resultTags = '';
		    $(".overlay").fadeOut(300);
		    $(".grey-out").fadeOut(300);
		};
	});

  	$('.grey-out').click(function() {
  		tagsArr = [];
  		resultTags = '';
  		$('.overlay').fadeOut(300);
	    $('.grey-out').fadeOut(300);
	    $('.youtubeResults').html('');
  	});

})