document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("verRespostas")
        .addEventListener("click", salvarDados);

    const caseDesign = document.getElementById("caseDesign");

    caseDesign.addEventListener("change", verificaQtdCasos);

    // Executa ao carregar a página
    verificaQtdCasos();

});

function verificaQtdCasos() {

    const caseDesign = document.getElementById("caseDesign");
    const caseCount = document.getElementById("caseCount");

    if (caseDesign.value === "Caso Único") {

        caseCount.value = 1;
        caseCount.disabled = true;

    } else {

        caseCount.value = '';
        caseCount.disabled = false;

    }

}

function salvarDados() {

    const dados = {

        title: document.getElementById("title").value,
        creator: document.getElementById("creator").value,
        date: document.getElementById("date").value,
        language: document.getElementById("language").value,

        problem: document.getElementById("problem").value,
        objective: document.getElementById("objective").value,
        studyNature: document.getElementById("studyNature").value,

        unitName: document.getElementById("unitName").value,
        unitType: document.getElementById("unitType").value,

        spatial: document.getElementById("spatial").value,
        temporal: document.getElementById("temporal").value,

        caseDesign: document.getElementById("caseDesign").value,
        caseCount: document.getElementById("caseCount").value,

        evidenceSources: document.getElementById("evidenceSources").value,
        techniques: document.getElementById("techniques").value,
        validityStrategy: document.getElementById("validityStrategy").value,

        analysisNature: document.getElementById("analysisNature").value,
        theoreticalFramework: document.getElementById("theoreticalFramework").value

    };

    localStorage.setItem(
        "caseStudyData",
        JSON.stringify(dados)
    );

    window.location.href = "respostas.html";

}