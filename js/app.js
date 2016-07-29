var createCrafts = function(createitem) {
	
	var request = { 
		api_key: 'mzuqxoiomej58vknkm90fssa',
		limit: 10,
		keywords: createitem,
		sort_on: 'score',
		sort_order: 'down',
	};
	
	$.ajax({
		url: "https://openapi.etsy.com/v2/listings/active.js?includes=Images:1",
		data: request,
		dataType: "jsonp",
		type: "GET",
		success: (function(data){ 
			$.each(data.results, function(i, item) {
				var image = '<a href="' + item.url + '"><img src="' + item.Images[0].url_170x135 + '"></a>'
				$('#create-results').append('<li>' + image + '<p>' + item.title + '</p>'  +  '</li>');
			});
		})
	});
};



$(document).ready(function() {
	$('#create').submit( function(e){

		// Clear previous results' listings
		$(this).siblings().find('li').remove();

		// Prevent page reload
		e.preventDefault();

		// Get the value of the Create search word
		var createitem = $(this).find('#create-input').val();

		createCrafts(createitem);

		//clear Create search field
		$('#create-input').val('');
	});
})