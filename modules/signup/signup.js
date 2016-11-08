app.controller("signupControler", function ($scope, $http) {
    $scope.msg = "Signup contoler";
	$scope.showimage = false;
	
	$scope.uploadagain =  function (){
		$scope.imagepath = "";
		$scope.showimage = false;
		
	}
	
	$scope.passMatch = function(){
		if($scope.form_signup.pass.$modelValue == $scope.form_signup.re_pass.$modelValue){
			return true;
		}else{
			return false;
		}
		
	}
	
	$scope.isValidForm = function(){
		if($scope.form_signup.name.$valid && $scope.form_signup.email.$valid && $scope.showimage && $scope.form_signup.pass.$valid && $scope.passMatch() ){
			return true;
		}else{
			return false;
		}
		
	}
	
	$scope.submit = function(){
		if( $scope.isValidForm() ){
			
			var data = new FormData();
			data.append("name", $scope.form_signup.name.$modelValue);
			data.append("email", $scope.form_signup.email.$modelValue);
			data.append("imagepath", $scope.form_signup.imagepath.$modelValue);
			data.append("pass", $scope.form_signup.pass.$modelValue);
			data.append("insert", 1);
			
			$http({
			  url: 'server/signup.php',
			  method: "POST",
			  data: data,
			  headers: {
				'Content-Type': undefined
			  }
			}).success(function(response) {
			  //alert(response);
			});
			
			
		}
		
	}
});


app.directive('myDirective', function(httpPostFactory) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      element.bind('change', function() {
        var formData = new FormData();
        formData.append('file', element[0].files[0]);

		/*
        // optional front-end logging 
        var fileObject = element[0].files[0];
        scope.fileLog = {
          'lastModified': fileObject.lastModified,
          'lastModifiedDate': fileObject.lastModifiedDate,
          'name': fileObject.name,
          'size': fileObject.size,
          'type': fileObject.type
        };
        scope.$apply();
		*/

        httpPostFactory('server/upload_image.php', formData, function (callback) {
            console.log(callback);
			scope.imagepath = "server/images/" + callback.replace(/"/g, '');
			scope.showimage = true;
        });
        
      });

    }
  };
});

app.factory('httpPostFactory', function($http) {
  return function(file, data, callback) {
    $http({
      url: file,
      method: "POST",
      data: data,
      headers: {
        'Content-Type': undefined
      }
    }).success(function(response) {
      callback(response);
    });
  };
});