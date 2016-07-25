$(document).ready(function() {
//	/* Check on load page if localStorage is set, if true, redirect to "Practice Lingua" page */
//	if(localStorage.getItem("practicePage")) {
//		document.getElementById("practice-reload").click();
//		localStorage.clear();
//	}

	/* Select category */
	$(".select-category li > a").click(function() {
		$(".category").text(this.innerHTML);
		$(".selected-category").val($(this).attr("id"));
	});

	// get ID value of active class
	var urlRequest = $('.li.active').attr('id');;

	window.page = 0;
	window.totalPages = "";

	var selectedLanguage = "English";

//	/* 
//	 * When user is logged in, populate page with all tickets by default 
//	 */
//	if(urlRequest === "user-tickets-disliked") {
//		$("#preloader").show();
//		window.page = 0;
//		loadTicketsInitially(window.page);
//		window.page++;
//	}
	
	// When user clicked on moderate tab in navigation menu load default disliked users tickets
	
	$("#moderage-lingua-tab").click(function() {
		$("#preloader").show();
		window.page = 0;
		loadTicketsInitially(window.page);
		window.page++;
	}); // end click #moderate-lingua

	/* Load tickets to the tickets-content selector, triggered by click on the nav bar menu */
	$(".li-tickets").click(function() {
		$("#preloader").show();
		$(this).addClass('active').siblings().removeClass('active');
		urlRequest = $('.li.active').attr('id');
		window.page = 0;
		loadTicketsInitially(window.page);
		window.page++;
	});

	/* Invoke this function every time user scrolls (Infinite Scroll) */
	$(".tickets-content").scroll(function() {
		var scrollTop = $(this).scrollTop();
		var innerHeight = $(this).innerHeight();
		var scrollHeight = $(this)[0].scrollHeight;

		/* If end of the document is reached... */
		if(scrollTop === scrollHeight - innerHeight && window.page < window.totalPages) {
			$("#preloader").show();
			loadTicketsWithScroll(window.page);
			window.page++;
		}
	});
	

	/* Function for loading tickets initially without scrolling */
	function loadTicketsInitially(page) {
		$(".tickets-content").load("fragments/get-tickets-admin", { 
			"urlData" : urlRequest,
			"page" : page,
			"learningLanguage" : selectedLanguage
		},
		function(response, status, xhr) {
			if(status == "error") {
				console.log("Error occurred.");
			}
			/* Retrieve number of pages from the model */
			window.totalPages = $("#total-pages").val();
			$("#preloader").hide();
		});
	}

	/* Function for loading tickets while scrolling */
	function loadTicketsWithScroll(page) {
		/* Avoid replacing the same content all over again */
		$(".tickets-wrapper").append($("<div>").load("fragments/get-tickets-admin .ticket-container", { 
			"urlData" : urlRequest,
			"page" : page
		},
		function(response, status, xhr) {
			if(status == "error") {
				console.log("Error occurred.");
			}
			$("#preloader").hide();
		}));
	}
	
}); // end ready
