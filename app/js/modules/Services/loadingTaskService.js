import app from './modules/main'

app.service('loadingTaskService', function() {
		var show = function () {
			$('.loading-circle').removeClass('hidden');
		};

		var hide = function () {
			$('.loading-circle').addClass('hidden');
		};

		return {
			show: show,
			hide: hide
		}
	}
)