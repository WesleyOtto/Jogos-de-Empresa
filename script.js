        /*
         * =====================================
         * CONFIGURAÇÕES PRINCIPAIS
         * =====================================
         *
         * ALTERE AQUI:
         *
         * zoom:
         * 1.0 = 100%
         * 1.2 = 120%
         * 1.5 = 150%
         * 1.8 = 180%
         * 2.0 = 200%
         *
         * intervaloAtualizacao:
         * 15000  = 15 segundos
         * 30000  = 30 segundos
         * 60000  = 1 minuto
         * 120000 = 2 minutos
         * 300000 = 5 minutos
         */

        const CONFIG = {

            larguraOriginal: 527,

            alturaOriginal: 400,

            // Zoom de 150%
            zoom: 1.5,

            // ATUALIZAÇÃO A CADA 1 MINUTO
            intervaloAtualizacao: 15000

        };


        /*
         * =====================================
         * ELEMENTOS HTML
         * =====================================
         */

        const container =
            document.querySelector(".excel-container");

        const viewport =
            document.getElementById("excelViewport");

        const iframe =
            document.getElementById("excelFrame");

        const ultimaAtualizacao =
            document.getElementById("ultimaAtualizacao");


        /*
         * =====================================
         * URL ORIGINAL DO EXCEL
         * =====================================
         */

        const EXCEL_URL = iframe.src;


        /*
         * =====================================
         * AJUSTE RESPONSIVO
         * =====================================
         */

        function ajustarExcel() {

            // Zoom configurado
            const zoom = CONFIG.zoom;

            // Dimensões originais
            const larguraOriginal =
                CONFIG.larguraOriginal;

            const alturaOriginal =
                CONFIG.alturaOriginal;

            // Dimensões ampliadas
            const larguraAmpliada =
                larguraOriginal * zoom;

            // Largura disponível
            const larguraDisponivel =
                container.clientWidth;

            /*
             * Ajuste automático para
             * telas menores.
             */

            const escalaResponsiva = Math.min(
                1,
                larguraDisponivel / larguraAmpliada
            );

            // Zoom efetivamente aplicado
            const zoomFinal =
                zoom * escalaResponsiva;

            // Novas dimensões
            const larguraFinal =
                larguraOriginal * zoomFinal;

            const alturaFinal =
                alturaOriginal * zoomFinal;

            /*
             * AUMENTA A ÁREA PRETA
             * PROPORCIONALMENTE AO ZOOM
             */

            viewport.style.width =
                larguraFinal + "px";

            viewport.style.height =
                alturaFinal + "px";

            // Dimensões originais do iframe
            iframe.style.width =
                larguraOriginal + "px";

            iframe.style.height =
                alturaOriginal + "px";

            // Aplica o zoom
            iframe.style.transformOrigin =
                "top left";

            iframe.style.transform =
                `scale(${zoomFinal})`;

        }


        /*
         * =====================================
         * ATUALIZAÇÃO AUTOMÁTICA
         * =====================================
         */

        let carregando = false;

        function atualizar() {

            if (carregando) {
                return;
            }

            carregando = true;

            ultimaAtualizacao.textContent =
                "Atualizando classificação...";

            /*
             * Acrescenta um parâmetro para
             * solicitar uma nova visualização.
             */

            const url = new URL(EXCEL_URL);

            url.searchParams.set(
                "_refresh",
                Date.now().toString()
            );

            // Recarrega o Excel
            iframe.src = url.toString();

        }


        /*
         * =====================================
         * QUANDO O IFRAME CARREGA
         * =====================================
         */

        iframe.addEventListener("load", function() {

            carregando = false;

            const agora = new Date();

            ultimaAtualizacao.textContent =
                "Visualização carregada às " +
                agora.toLocaleTimeString("pt-BR");

        });


        /*
         * =====================================
         * AJUSTE AO REDIMENSIONAR A TELA
         * =====================================
         */

        window.addEventListener(
            "resize",
            ajustarExcel
        );


        /*
         * =====================================
         * INICIALIZAÇÃO
         * =====================================
         */

        ajustarExcel();


        /*
         * =====================================
         * ATUALIZAÇÃO A CADA 1 MINUTO
         * =====================================
         */

        setInterval(
            atualizar,
            CONFIG.intervaloAtualizacao
        );

