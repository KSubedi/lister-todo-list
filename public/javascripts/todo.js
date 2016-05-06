//Angular Controller
function TodoCtrl($scope, $http){
	$scope.input = ""; //Model to store the input on
	$scope.clear = true; //Model to store the visibility state of clear button
	$scope.loadinghidden = true; //Model that stores weather the loading animation is showing or hidden
	$scope.todos = []; //Model to store the todos on

	//Load data from the server when page loads
	$scope.init = function(){
		$scope.loadinghidden = false;
		$http.get('api/list')
		.then(function(res){
			if(res.data != ""){
				$scope.todos = res.data;
			}
			$scope.loadinghidden = true;
		});
	};

	//Calculate the total number of todos and if there are none, hide the clear button
	$scope.total = function(){
		if($scope.todos.length == 0){
			$scope.clear = true;
		}else{
			$scope.clear = false;
		}
		return $scope.todos.length;
	}

	//Check how many todo lists are pending
	$scope.pending = function(){
		var counter = 0;
		angular.forEach($scope.todos, function(value, key){
			if(!value.done) counter++;
		});
		return counter;
	}

	//Add a todo list
	$scope.addTodo = function(){
		if($scope.input != ""){
			$scope.todos.push({text:$scope.input, done:false});

			$scope.loadinghidden = false;
			$http.get('api/add?text=' + $scope.input + '&done=false')
			.then(function(res){
				$scope.loadinghidden = true;
			});

			$scope.input = "";
		}else{
			alert("Item cannot be empty!");
		}
	}

	//Clear completed todos
	$scope.clearCompleted = function(){
		var remove = [];

		angular.forEach($scope.todos, function(value, key){
			if(value.done){
				remove.push(key);

				$scope.loadinghidden = false;
				$http.get('api/remove/' + value._id)
				.then(function(res){
					$scope.loadinghidden = true;
				});

			}
		});

		//reverse values so that the splice option does not mess up index keys
		remove.reverse();

		angular.forEach(remove, function(value, key){
			$scope.todos.splice(value,1);
		});
	}

	$scope.toggle = function(todo){
		todo.done = !todo.done;
		$scope.loadinghidden = false;
		$http.get('api/update/' + todo._id + '?done=' + todo.done)
		.then(function(res){
			$scope.loadinghidden = true;
		});
	}
}
