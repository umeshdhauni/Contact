var contactApp=angular.module("contactApp",[]);
var files=[];
contactApp.controller("contactController",['$scope','$http',function($scope,$http){
	$scope.appTitle="Contact Details App";
	$scope.cd_phone;
	$scope.cd_contactname;
	$scope.cd_email;
	$scope.cd_age;
	$scope.cd_image;
	$scope.cd_index;
	$scope.contacts=[];
	$scope.completeDetails=function(index){
		$scope.cd_index=index;
		$scope.cd_contactname=$scope.contacts[index].name;
		$scope.cd_phone=$scope.contacts[index].phone;
		$scope.cd_email=$scope.contacts[index].email;
		$scope.cd_age=$scope.contacts[index].age;
		$scope.cd_image=$scope.contacts[index].image;
		var myEi=angular.element(document.querySelector(".completedetail-section"));
		myEi.show();
		var myEi=angular.element(document.querySelector(".completedetail-section"));
		myEi.css('opacity','1');
	}

	$scope.submitDetails=function(){
		$scope.contacts.push({
			name:$scope.contactname,
			phone:$scope.phone,
			email:$scope.email,
			age:$scope.age,
			image:'image/'+files[0].name
		});
		var image=files[0].name;
		var myEi=angular.element(document.querySelector("#newcontact-modal"));
		myEi.modal('toggle');

		// on submit form reset

		$('form').children('*').each(function(){
      	$(this).val('');
		});
		$('form').children(".submit-form").val("Done");

		//php side

		$http.post("insert.php", {
		'name':$scope.contactname,
		'phone':$scope.phone,
		'email':$scope.email,
		'age':$scope.age,
		'image':'image/'+image
			}).success(function(data,status,headers,config){
				 console.log("Data Inserted Successfully");
			});    
	}
		$http.get("get.php").success(function(data){
					$scope.contacts=data;
				}).error(function(){
					console.log("error");
		});

	$scope.deleteContact=function(){
		$http.post("delete.php", {
		'id':$scope.cd_phone,
		});
		$scope.contacts.splice($scope.cd_index,1);	
		var myEi=angular.element(document.querySelector(".completedetail-section"));
		myEi.hide();
	}

	$scope.editContact=function(){
		
		// display value in form for edit

		$scope.contactname=$scope.cd_contactname;
		$scope.phone=$scope.cd_phone;
		$scope.email=$scope.cd_email;
		$scope.age=$scope.cd_age;

		var myEi=angular.element(document.querySelector("#done"));
		myEi.css('display','none');
		var myEu=angular.element(document.querySelector(".update"));
		myEu.css('display','block').val("Update");
	}

	$scope.updateContact=function(){

		// take updated value to send database
		
		$scope.cd_contactname=$scope.contactname;
		$scope.cd_phone=$scope.phone;
		$scope.cd_email=$scope.email;
		$scope.cd_age=$scope.age;
		var id=$scope.cd_index;
		var image=files[0].name;
		$http.post("update.php",{
			'name':$scope.cd_contactname,
			'phone':$scope.cd_phone,
			'email':$scope.cd_email,
			'age':$scope.cd_age,
			'image':'image/'+image,
			'id':id+1
		}).success(function(){
			console.log("Successfully")
		});

			//display on update

			$scope.contacts[id].name=$scope.contactname;
			$scope.contacts[id].phone=$scope.phone;
			$scope.contacts[id].email=$scope.email;
			$scope.contacts[id].age=$scope.age;
			$scope.contacts[id].image='image/'+image;
		var myEi=angular.element(document.querySelector("#newcontact-modal"));
		myEi.modal('toggle');
	}

	$scope.modelOpen=function(){
		$('form').children('*').each(function(){
	    $(this).val('');
		});
		$('form').children(".submit-form").val("Done");
		var myEi=angular.element(document.querySelector("#done"));
		myEi.css('display','block');
		var myEu=angular.element(document.querySelector(".update"));
		myEu.css('display','none');
	}
}]);

contactApp.directive('fileUpload',function(){
		return{
			link:function(scope,element,attrs){
			element.on('change',function(evt){
				files=evt.target.files;
			});
		}
	}
	});