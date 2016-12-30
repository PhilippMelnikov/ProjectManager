import app from './modules/main'

app.service('loadingScreenService', function() {
		var show = function () {
			$('body').addClass('unscrollable');
			$('.loading-screen').removeClass('hidden');
		};

		var hide = function () {
			$('body').removeClass('unscrollable');
			$('.loading-screen').addClass('hidden');
		};

		return {
			show: show,
			hide: hide
		}
	}
)