var angular = require('angular');

memberService.$inject = ['$http'];

function memberService($http) {


	var service = {};

	service.GetById = GetById;
	service.GetByUsername = GetByUsername;
	service.IsExisting = IsExisting;
	service.IsExistingByEmail = IsExistingByEmail;
	service.GetCount = GetCount;
	service.GetAll = GetAll;
	service.IsFollowedBy = IsFollowedBy;
	service.GetAllFollowedSellersBy = GetAllFollowedSellersBy;
	service.follow = follow;
	service.unfollow = unfollow;
	service.Create = Create;
	service.ChangePassword = ChangePassword;
	service.Update = Update;
	service.Delete = Delete;

	return service;

	function GetById(id) {
		return $http.get('api/members/id/' + id).then(handleSuccess, handleError('Error getting user by id'));
	}

	function GetByUsername(username) {
		return $http.get('api/members/login/' + username).then(handleSuccess, handleError('Error getting user by username'));
	}

	function IsExisting(username) {
		return $http.get('api/members/exists/' + username).then(handleSuccess, handleError('Error getting user by username'));
	}

	function IsExistingByEmail(email) {
		return $http.get('api/members/exists/email/' + email).then(handleSuccess, handleError('Error getting user by username'));
	}

	function GetAll() {
		return $http.get('api/members/').then(handleSuccess, handleError('Error getting all users'));
	}
	function GetAllFollowedSellersBy(follower){
		return $http.get('api/members/id/'+follower+'/follows').then(handleSuccess, handleError('Error getting all followed sellers'));
	}

	function GetCount(){
		return $http.get('api/members/count').then(handleSuccess, handleError('Error getting the total number of members'));
	}

	function IsFollowedBy(followed, follower){
		return $http.get('api/members/id/'+followed+'/isfollowedby/'+follower).then(handleSuccess, handleError('Error getting the boolean value: followedby'));
	}

	function follow(follower, followed){
		return $http.post('api/members/id/'+follower+'/follow/'+followed).then(handleSuccess, handleError('Error when trying to make the user follow a seller'));
	}

	function unfollow(follower, followed){
		return $http.post('api/members/id/'+follower+'/unfollow/'+followed).then(handleSuccess, handleError('Error when trying to make the user unfollow a seller'));
	}

	function Create(user) {
		var validUser = parseUser(user);
		if(validUser != null)
			return $http.post('api/members', user).then(handleSuccess, handleError("Error when creating the user"));
		return { success : false, message : "not valid user"};
	}

	function Update(user) {
		if(validMember(user))
			return $http.put('api/members/update/id/'+user.memberID, user).then(handleSuccess, handleError('Error updating user'));
		return {success : false, message : "not valid user"};
	}

	function ChangePassword(user, newPSW) {
		return $http.put('api/members/id/'+user.memberID+'/pwd/'+newPSW, user).then(handleSuccess, handleError('Error changing the password'));
	}

	function Delete(id) {
		return $http.delete('api/members/id/' + id).then(handleSuccess, handleError('Error deleting user'));
	}

//	private functions

	function handleSuccess(res) {
		return res.data;
	}

	function handleError(error) {
		return function () {
			return { success: false, message: error };
		};
	}

	function parseUser(user) {
		var validUser = {
				email: "",
				firstName: "",
				lastName: "",
				accountType: 'M'
		};

		if(!user.login) return null;
		if(!user.password) return null;

		validUser.login = user.login;
		validUser.email = user.email;
		validUser.firstNale = user.firstName;
		validUser.lastName = user.lastName;
		validUser.password = user.password;
		return validUser;
	}

	function validMember(user){
		if (!user.memberID)
			return false;
		else
			return true;
	}


};

module.exports = memberService;
