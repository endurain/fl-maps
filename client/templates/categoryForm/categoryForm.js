AutoForm.hooks({
	 'new-category-form': {
			 onSuccess: function (operation, result, template) {
				 	// TODO: Close modal
					 $("#categoryFormModal").hide();
					 Materialize.toast('Category submitted successfully and will be reviewed!', 4000);

					 GAnalytics.event("Category","created");
			 },
			 onError: function(formType, error) {
					 GAnalytics.event("Category","form_error");
					 console.error(error);
			 }
	 }
});

Template.categoryForm.onCreated(function() {
	this.subscribe('categories');
	this.categories = [];
	var instance = this;

	Tracker.autorun(function() {
		instance.categories = Categories.find({}).fetch();
	});
});

Template.categoryForm.onRendered(function() {
	Template.autoForm.onRendered(function() {
		$("#category-color").spectrum({
			color: "#000",
			preferredFormat: "hex"
		});
	});
});