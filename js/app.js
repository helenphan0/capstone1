var createCrafts = function(createitem) {
	
	// the parameters we need to pass in our request to StackOverflow's API
	var request = { 
		api_key: 'mzuqxoiomej58vknkm90fssa',
		limit: 10,
		keywords: createitem,
		sort_on: 'score',
		sort_order: 'down',
		includes: ['Images'],
	};
	
	$.ajax({
		url: "https://openapi.etsy.com/v2/listings/active.js",
		data: request,
		dataType: "jsonp",
		type: "GET",
		success: (function(data){ //this waits for the ajax to return with a succesful promise object
			console.log(data);
			$.each(data.results, function(i, item) {
				$('#create-results').append('<li>' + item.title + ' ' +  '</li>');
			});
		})
	});
};



$(document).ready(function() {
	$('#create').submit( function(e){
		e.preventDefault();
		$(this).siblings().find('#create-results').remove('li');
		
		// zero out results if previous search has run
		$('.create-results').html('');
		
		// get the value of the Create search word
		var createitem = $(this).find('#create-input').val();

		createCrafts(createitem);

		//clear Create search field
		$('#create-input').val('');
	});
})