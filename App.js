$(function () {
     var model = new MinefieldModel();
     var view = new MinefieldView(model);
     var controller = new MinefieldController(model, view);
 });
