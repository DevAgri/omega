function initMap() {
    listarMedicao();
}

function montarPontos(dados) {
    var pontos = [{ pluv: '001', loc: { lat: -15.005399, lng: -57.342107 } },
        { pluv: '002', loc: { lat: -14.985713, lng: -57.332940 } },
        { pluv: '003', loc: { lat: -14.979642, lng: -57.315415 } },
        { pluv: '004', loc: { lat: -14.992467, lng: -57.321372 } },
        { pluv: '005', loc: { lat: -14.981264, lng: -57.303018 } },
        { pluv: '005', loc: { lat: -15.003652, lng: -57.310410 } },
        { pluv: '007', loc: { lat: -14.968996, lng: -57.325257 } },
        { pluv: '008', loc: { lat: -14.962540, lng: -57.299452 } },
        { pluv: '009', loc: { lat: -14.976004, lng: -57.291462 } },
        { pluv: '010', loc: { lat: -15.98, lng: -57.282601 } },
        { pluv: '011', loc: { lat: -14.992182, lng: -57.267528 } },
        { pluv: '012', loc: { lat: -14.979470, lng: -57.257956 } }
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: pontos[4].loc,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    var porcAgua = [
        { qtd: '100%', cor: '#1418ff' },
        { qtd: '75%', cor: '#ffff05' },
        { qtd: '50%%', cor: '#baff8a' },
        { qtd: '25%', cor: '#ffff05' },
        { qtd: '0%', cor: '#ff1e00' }
    ];

    var ii = 0;

    var color = '#4d004d';
    for (var i in pontos) {
        ii++;
        if (ii > 4) {
            ii = 0;
        }

        color = porcAgua[ii].cor;

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