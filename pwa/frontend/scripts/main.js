
//actionSnackedBar();
actionModal();

function actionModal() {
    var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#view-source');
    
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    
    showDialogButton.addEventListener('click', function() {
      dialog.showModal();
    });

    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });    
}

function actionSnackedBar() {

    var snackbarContainer = document.querySelector("#snackbar");  
    var data = {
    message: 'Button color changed.',
        timeout: 2000,
        actionHandler: handler,
        actionText: 'Undo'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);

}