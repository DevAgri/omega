
var dialogSalvar = null;
(() => {
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(function() {
        console.log('service worker registered');
    })
    .catch(function(error) {
        console.warn('service worker failed');
        console.error(error);
    });
}

main();

})();

function main() {
  listar();
  listarMedicao();
  eventos();
}

function eventos() {
    $("#salvar").on("click", function(e) {
        e.preventDefault();
        gravar();
    });
}

function listar(){
    $.ajax({
        url: "http://localhost:3000/pluviometro/list",
        type: "GET"
    }).done((data) => {
        //montarLista(data);
        montarPluviometro(data);
        console.info(data);
    }).fail(() => {
        snackedBar("processo inesperado ao carregar dados do servidor");
    });
}

function listarMedicao() {
    $.ajax({
        url: "http://localhost:3000/pluviometromedicao/listall",
        type: "GET"
    }).done((data) => {
        montarLista(data);
        console.info(data);
    }).fail(() => {
        snackedBar("processo inesperado ao carregar dados do servidor");
    });
}

function gravar() {
    $.ajax({
        url: "http://localhost:3000/pluviometromedicao/gravar?nome=" + $("#nome").val() + 
            "&valor=" + $("#nivel").val() + "&pluvId=" + $("#pluviometro").val(),
        type: "GET",
    }).done((data) => {
        dialogSalvar.close();

        $("#nome").val("");
        $("#nivel").val("");
        $("#pluviometro").val("")

        snackedBar("Medição salva!")
        listarMedicao();
    }).fail(() => {
        snackedBar("processo inesperado ao carregar dados do servidor");
    });
    
}


function montarPluviometro(data) {
    var select = $("#pluviometro");
    var html = "";
    data.forEach((item) => {
        var template = `<option value="${item.id}">${item.descricao}</option>`;
        html += template;
    });

    select.html(html);
}

function montarLista(dados) {
    var container = $(".mdl-layout__content");
    var html = "";

    dados.forEach((item, i) => {
        var template = 
        `<tr>
            <td class="mdl-data-table__cell--non-numeric">${item.descricao}</td>
            <td>${item.valor}</td>
            <td>${item.nome}</td>
            <td>
            <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation" style="color: rgb(0, 150, 136);">cloud_done</i>
            </td>
        </tr>`;

        html += template;
    });
    
    
    if (html == "") {
        html = 
        `<tr>
            <td collspan="5">Nenhum registro encontrado.</td>
        </tr>`;

        container.find("table").html(html);
    } else {
        container.find("tbody").html(html);
    }
}

function actionModal() {
    var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#view-source');
    
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    
    showDialogButton.addEventListener('click', function() {
      dialog.showModal();
    });

    dialogSalvar = dialog;
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });    
}

function snackedBar(text) {

    var snackbarContainer = document.querySelector("#snackbar");  
    var data = {
    message: text,
        timeout: 2000,
        actionHandler: undefined,
        actionText: undefined
    };

    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

//actionSnackedBar();
actionModal();