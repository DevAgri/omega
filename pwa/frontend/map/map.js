function initMap() {
    listarMedicao();
}

function montarPontos(dados) {
    var pontos = [];
    /*var porcAgua = [
        { qtd: 100, cor: '#1418ff' },
        { qtd: 75, cor: '#ffff05' },
        { qtd: 50, cor: '#baff8a' },
        { qtd: 25, cor: '#ffff05' },
        { qtd: 0, cor: '#ff1e00' }
    ];*/

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: -14.976004, lng: -57.291462},
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    for (var i=0, len = dados.length; i < len; i++){
        var row = dados[i];
        pontos.push({
            pluv: row.descricao,
            loc: {
                lat: Number(row.latitude),
                lng: Number(row.longitude)
            }
        });

        var porcentagem = (row.total * 100) / 1700;
        console.warn(row.total); 
        console.log(porcentagem);
        var color = "#ff1e00";
        if (porcentagem >= 0 && porcentagem < 25) {
            color = "#ff1e00";
        } else
        if (porcentagem >= 25 && porcentagem < 50) {
            color = "#ffff05";
        } else
        if (porcentagem >= 50 && porcentagem < 75) {
            color = "#baff8a";
        } else
        if (porcentagem >= 75 && porcentagem < 100) {
            color = "#ffff05";
        } else {
            color = "#1418ff"; 
        }


        var marker = new google.maps.Marker({
            position: pontos[i].loc,
            map: map,
            //icon: 'https://maps.google.com/mapfiles/arrow.png',
            title: 'Pluviometro - ' + pontos[i].pluv
        });

        var cityCircle = new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.2,
            map: map,
            center: pontos[i].loc,
            radius: 800
        });
    }
    
    

}

function montarLista(dados) {
    var container = $(".mdl-layout__content");
    var html = "";

    dados.forEach((item, i) => {
        var template =
            `<tr>
            <td class="mdl-data-table__cell--non-numeric">${item.descricao}</td>
            <td>${item.total}</td>
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

function listarMedicao() {
    $.ajax({
        url: "http://localhost:3000/pluviometromedicao/maplist",
        type: "GET"
    }).done((dados) => {
        debugger;
        montarLista(dados);
        montarPontos(dados);
        console.info(dados);
    }).fail(() => {
        snackedBar("processo inesperado ao carregar dados do servidor");
    });
}