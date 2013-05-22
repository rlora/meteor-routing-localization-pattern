/* jshint indent: 2 */
//
// Handlebars helpers
//
Handlebars.registerHelper("formatDatetime", function(when) {
  return _.formatDatetime(when);
});
Handlebars.registerHelper("localize", function(text) {
  return Globalize.localize(text, Session.get("culture"));
});
Handlebars.registerHelper("culture", function() {
  return Session.get("culture") ? Session.get("culture") : "en";
});