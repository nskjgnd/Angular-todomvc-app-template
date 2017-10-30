/**
 * Created by justinjing on 30/10/17.
 */
(function (angular) {
	var app = angular.module('service',[])
	app.service('MyService',['$window',function ($window) {
		var str = $window.localStorage.getItem('mytodos') || '[]'

		var todos = JSON.parse(str)
		this.get = function () {
			return todos
		}
		this.add = function (newTodo) {
			todos.push({
				id:Math.random(),
				name:newTodo,
				complated:false
			})

		}
		this.remove = function (id) {
			for (var i = 0 ; i < todos.length;i++){
				var item = todos[i]
				if (item.id === id){
					todos.splice(i,1)

					var str = JSON.stringify(todos)
					$window.localStorage.setItem
					this.save()
					return
				}
			}
		}
		this.save = function () {
			var str = JSON.stringify(todos)
			$window.localStorage.setItem('mytodos',str)
		}
		this.toggleAll = function (selectAll) {
			for (var i = 0 ; i < todos.length; i++){
				var item = todos[i]
				item.completed = selectAll;
			}
			this.save()
		}

		this.getActive = function () {
			var count = 0
			for(var  i = 0; i < todos.length; i++){
				var  item  = todos[i]
				if (!item.completed){
					count++
				}
			}
			return count
		}
		this.clearAll = function () {
			for (var i = todos.length - 1 ; i >= 0; i--){
				var item = todos[i]
				if (item.completed){
					todos.splice(i,1)
				}
			}
			this.save()
		}


	}])
})(angular)
