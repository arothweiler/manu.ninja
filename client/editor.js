Template.editor.helpers({
    preview: function () {
        return Session.get('preview');
    }
});
Template.editor.events({
    'input textarea': function (event) {
        Session.set('preview', event.target.value);
    },
    'submit form': function (event) {
        event.preventDefault();
        var data = {
            _id: event.target._id.value,
            title: event.target.title.value,
            category: event.target.category.value,
            content: event.target.content.value
        };
        if (data._id) {
            Meteor.call('updateArticle', data);
        } else {
            Meteor.call('insertArticle', data);
            Router.go('/article/' + slugify(data.title));
        }
    }
});
