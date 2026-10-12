document.addEventListener("DOMContentLoaded", () => {
    const dados = JSON.parse(
        localStorage.getItem("caseStudyData") || "{}"
    );

    const campos = document.getElementById("campos");
    const botaoXML = document.getElementById("generateXML");

    // Metadados do perfil CSPM.
    const CAMPOS = [
        { id: "title", label: "Título", path: ["dc:title"], tipo: "input" },
        { id: "creator", label: "Autor(es)", path: ["dc:creator"], tipo: "input" },
        { id: "date", label: "Data", path: ["dc:date"], tipo: "input" },
        { id: "language", label: "Idioma", path: ["dc:language"], tipo: "select" },

        {
            id: "problem",
            label: "Problema de pesquisa",
            path: ["dc:subject.problemDefinition", "dc:description.problem"],
            tipo: "textarea"
        },
        {
            id: "objective",
            label: "Objetivo",
            path: ["dc:subject.problemDefinition", "dc:description.Objective"],
            tipo: "textarea"
        },
        {
            id: "studyNature",
            label: "Natureza do estudo",
            path: ["dc:subject.problemDefinition", "dc:description.studyNature"],
            tipo: "select"
        },

        {
            id: "unitName",
            label: "Nome da unidade-caso",
            path: [
                "dc:subject.unitCaseDefinition",
                "dc:description.unitCase",
                "dc:description.unitName"
            ],
            tipo: "input"
        },
        {
            id: "unitType",
            label: "Tipo da unidade-caso",
            path: [
                "dc:subject.unitCaseDefinition",
                "dc:description.unitCase",
                "dc:description.unitType"
            ],
            tipo: "input"
        },
        {
            id: "spatial",
            label: "Abrangência espacial",
            path: [
                "dc:subject.unitCaseDefinition",
                "dc:coverage",
                "dc:description.spatial"
            ],
            tipo: "input"
        },
        {
            id: "temporal",
            label: "Abrangência temporal",
            path: [
                "dc:subject.unitCaseDefinition",
                "dc:coverage",
                "dc:description.temporal"
            ],
            tipo: "input"
        },
    
        {
            id: "caseDesign",
            label: "Delineamento do estudo de caso",
            path: [
                "dc:subject.caseNumberDefinition",
                "dc:description.caseDesign"
            ],
            tipo: "select"
        },
        {
            id: "caseCount",
            label: "Quantidade de casos",
            path: [
                "dc:subject.caseNumberDefinition",
                "dc:description.caseCount"
            ],
            tipo: "input"
        },

        {
            id: "evidenceSources",
            label: "Fontes de evidência",
            path: ["dc:subject.dataCollection", "dc:description.evidenceSources"],
            tipo: "textarea"
        },
        {
            id: "techniques",
            label: "Técnicas de coleta de dados",
            path: [
                "dc:subject.dataCollection",
                "dc:description.dataCollectionTechniques",
                "dc:description.technique"
            ],
            tipo: "textarea"
        },
        {
            id: "validityStrategy",
            label: "Estratégia de validade",
            path: ["dc:subject.dataCollection", "dc:description.validityStrategy"],
            tipo: "textarea"
        },

        {
            id: "analysisNature",
            label: "Natureza da análise",
            path: ["dc:subject.dataAnalysis", "dc:description.analysisNature"],
            tipo: "select"
        },
        {
            id: "theoreticalFramework",
            label: "Referencial teórico",
            path: [
                "dc:subject.dataAnalysis",
                "dc:description.theoreticalFramework"
            ],
            tipo: "textarea"
        }
    ];

    // Organização dos campos nas mesmas seções do formulário.
    const SECOES = [
        {
            titulo: "Informações Gerais",
            campos: ["title", "creator", "date", "language"]
        },
        {
            titulo: "Formulação do Problema",
            campos: ["problem", "objective", "studyNature"]
        },
        {
            titulo: "Definição da Unidade-Caso",
            campos: [
                "unitName",
                "unitType",
                "spatial",
                "temporal"
            ]
        },
        {
            titulo: "Definição do Número de Casos",
            campos: ["caseDesign", "caseCount"]
        },
        {
            titulo: "Coleta de Dados",
            campos: [
                "evidenceSources",
                "techniques",
                "validityStrategy"
            ]
        },
        {
            titulo: "Análise e Interpretação dos Dados",
            campos: ["analysisNature", "theoreticalFramework"]
        }
    ];

    // Exibe os campos desabilitados e as opções de inclusão no XML.
    SECOES.forEach(secao => {
        const card = document.createElement("section");
        card.className = "card";

        const titulo = document.createElement("h2");
        titulo.textContent = secao.titulo;
        card.appendChild(titulo);

        secao.campos.forEach(id => {
            const campo = CAMPOS.find(item => item.id === id);

            if (!campo) return;

            const field = document.createElement("div");
            field.className = "field";

            const rotulo = document.createElement("label");
            rotulo.htmlFor = `revisao-${id}`;
            rotulo.textContent = campo.label;

            let input;

            if (campo.tipo === "textarea") {
                input = document.createElement("textarea");
                input.rows = 3;
                input.value = dados[id] ?? "";
            } else if (campo.tipo === "select") {
                input = document.createElement("select");

                const opcao = document.createElement("option");
                opcao.value = dados[id] ?? "";
                opcao.textContent = dados[id] || "Não informado";

                input.appendChild(opcao);
            } else {
                input = document.createElement("input");
                input.type = id === "caseCount" ? "number" : "text";
                input.value = dados[id] ?? "";
            }

            input.id = `revisao-${id}`;
            input.disabled = true;

            const labelInclusao = document.createElement("label");
            labelInclusao.className = "selecao-xml";
            labelInclusao.htmlFor = `campo-${id}`;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `campo-${id}`;
            checkbox.checked = true;

            labelInclusao.appendChild(checkbox);
            labelInclusao.appendChild(
                document.createTextNode(" Incluir este campo no XML")
            );

            field.appendChild(rotulo);
            field.appendChild(input);
            field.appendChild(labelInclusao);

            card.appendChild(field);
        });

        campos.appendChild(card);
    });

    botaoXML.addEventListener("click", gerarXML);

    // Gera o XML de acordo com os campos selecionados.
    function gerarXML() {
        const selecionados = new Set(
            CAMPOS
                .filter(campo => {
                    const checkbox = document.getElementById(
                        `campo-${campo.id}`
                    );

                    return checkbox && checkbox.checked;
                })
                .map(campo => campo.id)
        );

        function escaparXML(valor) {
            return String(valor ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&apos;");
        }

        function incluido(id) {
            return selecionados.has(id);
        }

        function tag(nome, id, nivel) {
            if (!incluido(id)) return "";

            const espacos = "    ".repeat(nivel);
            const valor = escaparXML(dados[id]);

            return `${espacos}<${nome}>${valor}</${nome}>\n`;
        }

        // Mantém as tags consecutivas dentro de cada seção.
        function secao(nome, conteudo, nivel) {
            if (!conteudo.trim()) return "";

            const espacos = "    ".repeat(nivel);

            return (
                `${espacos}<${nome}>\n` +
                conteudo +
                `${espacos}</${nome}>\n`
            );
        }

        let xml =
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<dc:subject.caseStudyProfile xmlns:dc="http://purl.org/dc/elements/1.1/">\n';

        // 1. Informações gerais.
        xml += tag("dc:title", "title", 1);
        xml += tag("dc:creator", "creator", 1);
        xml += tag("dc:date", "date", 1);
        xml += tag("dc:language", "language", 1);
        xml += '    <dc:type>Estudo de Caso</dc:type>\n';

        // 2. Formulação do problema.
        let problema = "";
        problema += tag("dc:description.problem", "problem", 2);
        problema += tag("dc:description.Objective", "objective", 2);
        problema += tag("dc:description.studyNature", "studyNature", 2);

        xml += "\n";
        xml += secao("dc:subject.problemDefinition", problema, 1);

        // 3. Definição da unidade-caso.
        let unidade = "";

        let dadosUnidade = "";
        dadosUnidade += tag("dc:description.unitName", "unitName", 3);
        dadosUnidade += tag("dc:description.unitType", "unitType", 3);

        unidade += secao(
            "dc:description.unitCase",
            dadosUnidade,
            2
        );

        let cobertura = "";
        cobertura += tag("dc:description.spatial", "spatial", 3);
        cobertura += tag("dc:description.temporal", "temporal", 3);

        unidade += secao("dc:coverage", cobertura, 2);

        xml += "\n";
        xml += secao("dc:subject.unitCaseDefinition", unidade, 1);

        // 4. Definição do número de casos.
        let casos = "";
        casos += tag("dc:description.caseDesign", "caseDesign", 2);
        casos += tag("dc:description.caseCount", "caseCount", 2);

        xml += "\n";
        xml += secao("dc:subject.caseNumberDefinition", casos, 1);

        // 5. Coleta de dados.
        let coleta = "";

        coleta += tag(
            "dc:description.evidenceSources",
            "evidenceSources",
            2
        );

        let tecnicas = "";
        tecnicas += tag("dc:description.technique", "techniques", 3);

        coleta += secao(
            "dc:description.dataCollectionTechniques",
            tecnicas,
            2
        );

        coleta += tag(
            "dc:description.validityStrategy",
            "validityStrategy",
            2
        );

        xml += "\n";
        xml += secao("dc:subject.dataCollection", coleta, 1);

        // 6. Análise de dados.
        let analise = "";

        analise += tag(
            "dc:description.analysisNature",
            "analysisNature",
            2
        );

        analise += tag(
            "dc:description.theoreticalFramework",
            "theoreticalFramework",
            2
        );

        xml += "\n";
        xml += secao("dc:subject.dataAnalysis", analise, 1);

        xml += "\n</dc:subject.caseStudyProfile>\n";

        // Cria o arquivo para download.
        const blob = new Blob([xml], {
            type: "application/xml;charset=utf-8"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "CaseStudyProfile.xml";

        document.body.appendChild(link);
        link.click();
        link.remove();

        // Limpa os dados para o próximo preenchimento.
        localStorage.removeItem("caseStudyData");

        // Libera a URL e retorna ao formulário inicial.
        setTimeout(() => {
            URL.revokeObjectURL(url);
            window.location.href = "index.html";
        }, 1000);
    }
});
