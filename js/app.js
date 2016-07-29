var createCrafts = function(createitem) {
	
	// the parameters we need to pass in our request to StackOverflow's API
	var request = { 
		api_key: 'mzuqxoiomej58vknkm90fssa',
		limit: 10,
		keywords: createitem,
		includes: ['Images:1'],
	};
	
	$.ajax({
		url: "https://openapi.etsy.com/v2/listings/active.js",
		data: request,
		dataType: "jsonp",
		type: "GET",
	})
	.done(function(){ //this waits for the ajax to return with a succesful promise object
		console.log(result);
		$.each(result.items, function(i, item) {
			$('.create-results').append(result);
		});
	});

};



$(document).ready( function() {
	$('#create').submit( function(e){
		e.preventDefault();
		// zero out results if previous search has run
		$('.create-results').html('');
		// get the value of the tags the user submitted
		var createitem = $(this).find("input[name='create-input']").val();
		createCrafts(createitem);
	});
})