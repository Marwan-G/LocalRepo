Todos = new Mongo.Collection('todos');

Lists = new Meteor.Collection('lists');
Router.route('/',{
  name: 'homee',
  template: 'home'

});
Router.configure({
    layoutTemplate: 'main'
});

Router.route('/register',function(){
  this.render('register');
});
Router.route('/login',function(){
  this.render('login');
});
//mTODO i have to check this router

if (Meteor.isClient) {
  Template.lists.helpers({
    "list":function(){
      return Lists.find({}, {sort: {name: 1}});
    }

  });
    Template.todoss.helpers({
        'tod': function() {
            return Todos.find({}, {
                sort: {
                    createdAt: -1
                }
            });
          }
        });
            Template.addTodo.events({
                'submit form': function(evt) {
                    evt.preventDefault();
                    // var AddTodo = evt.target.todoName.value;
                        var AddTodo = $('[name=todoName]').val();
                    Todos.insert({
                        name: AddTodo,
                        completed: false,
                        createdAt: new Date()
                    });

                    $('[name=todoName]').val('');
                }
              });

                Template.todoItem.events({
                'click .delete-todo':function(evt){
                //  evt.preventDefault();
                  var documentId= this._id;
                  var confirmDeletion = window.confirm("Delete this task");
                   if(confirmDeletion){
                    Todos.remove({_id:documentId});}

                },
                'keyup [name="todoItem"]':function(evt){
                  evt.preventDefault();
                        var todoItem =evt.target.value;
                        // var todoItem = $('[name=todoItem]').val();
                      var documentId= this._id;
                      Todos.update({_id:documentId},{$set:{name:todoItem}});
                      console.log("Task changed to : " + todoItem);
                }



              });
              Template.addList.events({
                'submit form':function(evt){
                  evt.preventDefault();
                  var listName=$("[name=listName]").val();
                  Lists.insert({
                    name:listName

                  });
                  $("[name=listName]").val("");
                }
              });

            }
