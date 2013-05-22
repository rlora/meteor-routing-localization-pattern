/* jshint indent: 2 */
//
// Application router
//
var AppRouter = Backbone.Router.extend({

  routes: {
    "": "indexAction",
    "index": "indexAction",
    ":culture/index": "indexAction",
    ":culture/:collection": "listAction",
    ":culture/:collection/:id": "showAction",
    ":culture/:collection/:id/:subcollection": "listAction",
    ":culture/:collection/:id/:subcollection/?:params": "listAction",
    ":culture/:collection/new": "newAction",
    ":culture/:collection/edit/:1": "editAction",
    ":culture/admin": "adminAction"
  },

  indexAction: function(culture) {
    Session.set("culture", culture);
    Session.set("page", ["index"]);
  },

  listAction: function(culture, collection, id, subcollection, params) {
    Session.set("culture", culture);
    if (id && subcollection) {
      Session.set("parent", [collection, id]);
      Session.set("page", [subcollection, "list"]);
      Session.set("childPage", [collection, subcollection]);
    } else {
      Session.set("page", [collection, "list"]);
    }
    if (params) {
      Session.set("params", _.deparam(params));
    }
  },

  showAction: function(culture, collection, id) {
    Session.set("culture", culture);
    Session.set("page", [collection, "show"]);
  },

  newAction: function(culture, collection) {
    Session.set("culture", culture);
    Session.set("page", [collection, "new"]);
  },

  editAction: function(culture, collection, id) {
    Session.set("culture", culture);
    Session.set("page", [collection, "edit"]);
  },

  adminAction: function(culture) {
    Session.set("culture", culture);
    Session.set("page", ["admin"]);
  }

});

//
// Bind events for routing navigation on-click
//
Template.NavBar.events({
  "click a": function(e) {
    route = e.target.getAttribute("data-route");
    if (route) {
      Router.navigate(route, {
        trigger: true
      });
    }
  }
});

//
// Bind events for routing navigation on-click
//
Template.ContentEngine.events({
  "click a": function(e) {
    route = e.target.getAttribute("data-route");
    if (route) {
      Router.navigate(route, {
        trigger: true
      });
    }
  },
  "click button[data-route]": function(e) {
    var button = e.target, route = button.getAttribute("data-route");
    if (route === null) {
      button = $(e.target).parents("button[data-route]")[0];
      route = button.getAttribute("data-route");
    }
    if (route && button.classList.contains("disabled") === false) {
      App.log.debug(route, button);
      Router.navigate(route, {
        trigger: true
      });
    }
  }
});

//
// Content engine
//
Template.ContentEngine.content = function() {
  var page, childPage, templateName, childTemplateName, name;

  page = Session.get("page");
  childPage = Session.get("childPage");
  try {
    templateName = _.buildTemplateName(page);
    childTemplateName = _.buildTemplateName(childPage);
    name = Template[templateName] ? templateName : (Template[childTemplateName] ? childTemplateName : "NotFound");
    return Template[name]();
  } catch (err) {
    // Error
    return {};
  }
};

Router = new AppRouter();

//
// Application entry point
//
Meteor.startup(function() {
  Backbone.history.start({
    pushState: true
  });
});
