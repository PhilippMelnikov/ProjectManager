import app from './modules/main'

app.service('loadingImageService', function() {
		var showLoadingScreen = function () {
			$('body').addClass('unscrollable');
			$('.loading-screen').removeClass('hidden');
		};

		var hideLoadingScreen = function () {
			$('body').removeClass('unscrollable');
			$('.loading-screen').addClass('hidden');
		};
		var showProjectLoad = function () {
			$('.loading-project').removeClass('hidden');
		    $('.project-list').animate({
		      scrollTop: 0
		    }, 100);
		};


		var hideProjectLoad = function () {
			$('.loading-project').addClass('hidden');
		};

		var showTaskLoad = function () {

			$('.loading-task').removeClass('hidden');

				$('.task-list-content').animate({
		        	scrollTop: 0
		    	 }, 100);
			

		};

		var hideTaskLoad = function () {
			$('.loading-task').addClass('hidden');
		};

		var scrollTopOnDeleteProject = function () {
		    $('.project-list').animate({
		      scrollTop: 0
		    }, 100);
		};

		return {
			showLoadingScreen: showLoadingScreen,
			hideLoadingScreen: hideLoadingScreen,
			showProjectLoad: showProjectLoad,
			hideProjectLoad: hideProjectLoad,
			showTaskLoad: showTaskLoad,
			hideTaskLoad: hideTaskLoad,
			scrollTopOnDeleteProject: scrollTopOnDeleteProject

		}
	}
)