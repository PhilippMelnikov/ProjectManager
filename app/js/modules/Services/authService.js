import app from './modules/main'

app.service('authService', function($http, $cookies) {

	var session = "";

	var getCurrentSession = function () {
		return session;
	};

	
	var getSession = function () {
		return new Promise(function(resolve, reject) {
			session = $cookies.get('session');
			if(session)
			{
				console.log('Nice Cookies!');
				console.log(session);
				resolve(session);
			}
			else
			{
				$http.post('https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/signup')
					.then(function(response) {
		        	$cookies.put('session', response.data.session);
		        	session = response.data.session;
		        	resolve(session);
		    		})
		    		.then(function(){
		    			console.log('Failed to get session');
		    			reject('Failed to get session');
		    		});
			}
				
		});

	};

	var checkSession = function (session) {

		return new Promise(function(resolve, reject){
			var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/session';
			$http({
				url: string,
				method: "GET",
				withCredentials: false,
				params: {session: session}
			})				
			.then(function(response){
				console.log('check result', response)
				if (response.status == 200) 
				{
					console.log('Session passed Checking');
					resolve(session);
				}
				else 
				{
					console.log('Session check failed');
					reject('Session check failed');
				}
			});
		});
	};

	var fetchAccount = function(session) {
		return new Promise(function(resolve, reject){
			console.log('session', session)
			var account = {};
			var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/account';
			$http({
				url: string,
				method: 'GET',
				params: {session: session}
			}).then(function(response){
				account = response.data.Account;
				resolve(account);
			},function(err){
				console.log("Failed to fetch an account")
				reject(err);
			});
		});

	};  
	

	return {
		getSession: getSession,
		getCurrentSession: getCurrentSession,
		checkSession: checkSession,
		fetchAccount: fetchAccount

	};
});