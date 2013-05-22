/* jshint indent: 2 */
_.mixin({
  buildTemplateName: function(routeArray) {
    var name;
    if (Array.isArray(routeArray) && routeArray.length > 0) {
      name = "_" + routeArray[0];
      for (var i = 1; i < routeArray.length; i++) {
        name += _.ucfirst(routeArray[i]);
      }
    }
    return name;
  },
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  },
  ucfirst: function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
  },
  deparam: function(paramString) {
    var result = {};
    if (!paramString) {
      return result;
    }
    $.each(paramString.split("&"), function(index, value) {
      if (value) {
        var param = value.split("=");
        result[param[0]] = param[1];
      }
    });
    return result;
  }
});