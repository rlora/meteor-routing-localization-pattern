/* jshint indent: 2 */
Template._index.today = function() {
  return {
    "date": Globalize.format(new Date(Date.now()), "dddd MMMM d, yyyy", Session.get("culture"))
  };
};