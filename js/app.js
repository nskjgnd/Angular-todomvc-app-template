(function (angular) {
	'use strict';
	//test = 3
	// Your starting point. Enjoy the ride!
	var app = angular.module('todosApp',['service'])
	app.controller('todosController',['$scope','$location','$log','MyService',function ($scope,$location,$log,MyService) {
		$scope.todos = MyService.get()
		$scope.newTodo =''
		$scope.add = function () {
			if (!$scope.newTodo){
				return
			}
			MyService.add($scope.newTodo)
			$scope.newTodo =''
		}

		$scope.remove = function (id) {
			MyService.remove(id)
		}
		$scope.isEditingId = -1
		$scope.edit = function (id) {
			$scope.isEditingId = id
		}
		$scope.save = function () {
			$scope.isEditingId = -1
			MyService.save()
		}
		$scope.statusChange = function () {
			this.save()
		}
		$scope.selectAll = false
		$scope.toggleAll = function () {
			MyService.toggleAll($scope.selectAll)
		}
		$scope.getActive = function () {
			return MyService.getActive()
		}
		$scope.clearAll = function () {
			MyService.clearAll()
		}
		$scope.isCompleted = {}
		$scope.active = function () {
			$scope.isCompleted = {completed : false}
		}
		$scope.completed = function () {
			$scope.isCompleted = {completed : true}
		}
		$scope.all = function () {
			$scope.isCompleted = {}
		}

		$scope.loca = $location
		$scope.$watch('loca.url()',function (now,old) {
			switch (now){
				case '/active':
				$scope.isCompleted = {completed:false}
				break;
				case '/completed':
				$scope.isCompleted = {completed:true}
				break;
				default:
				$scope.isCompleted = {}
			}
		})
	}])
}) (angular);
