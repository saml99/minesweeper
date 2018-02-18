$(function () {
     var model = new MinefieldModel(5, 4, 10);
     var view = new MinefieldView(model);
     var controller = new MinefieldController(model, view);

     view.show();
 });
