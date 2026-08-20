document.addEventListener("DOMContentLoaded", () => {

    const dados =
        JSON.parse(
            localStorage.getItem("caseStudyData")
        );

    const campos =
        document.getElementById("campos");

    campos.innerHTML = `

    <div class="field">
        <label>Título</label>
        <textarea id="title" disabled>${dados.title}</textarea>
    </div>

<div class="field">
    <label>Autor(es)</label>
    <textarea id="creator" disabled>${dados.creator}</textarea>
</div>

<div class="field">
    <label>Data</label>
    <textarea id="date" disabled>${dados.date}</textarea>
</div>

<div class="field">
    <label>Idioma</label>
    <textarea id="language" disabled>${dados.language}</textarea>
</div>

<div class="field">
    <label>Problema</label>
    <textarea id="problem" disabled>${dados.problem}</textarea>
</div>

<div class="field">
    <label>Objetivo</label>
    <textarea id="objective" disabled>${dados.objective}</textarea>
</div>

<div class="field">
    <label>Natureza do Estudo</label>
    <textarea id="studyNature" disabled>${dados.studyNature}</textarea>
</div>

<div class="field">
    <label>Nome da Unidade</label>
    <textarea id="unitName" disabled>${dados.unitName}</textarea>
</div>

<div class="field">
    <label>Tipo da Unidade</label>
    <textarea id="unitType" disabled>${dados.unitType}</textarea>
</div>

<div class="field">
    <label>Cobertura Espacial</label>
    <textarea id="spatial" disabled>${dados.spatial}</textarea>
</div>

<div class="field">
    <label>Cobertura Temporal</label>
    <textarea id="temporal" disabled>${dados.temporal}</textarea>
</div>

<div class="field">
    <label>Desenho do Caso</label>
    <textarea id="caseDesign" disabled>${dados.caseDesign}</textarea>
</div>

<div class="field">
    <label>Quantidade de Casos</label>
    <textarea id="caseCount" disabled>${dados.caseCount}</textarea>
</div>

<div class="field">
    <label>Fontes de Evidência</label>
    <textarea id="evidenceSources" disabled>${dados.evidenceSources}</textarea>
</div>

<div class="field">
    <label>Técnicas de Coleta</label>
    <textarea id="techniques" disabled>${dados.techniques}</textarea>
</div>

<div class="field">
    <label>Estratégia de Validação</label>
    <textarea id="validityStrategy" disabled>${dados.validityStrategy}</textarea>
</div>

<div class="field">
    <label>Natureza da Análise</label>
    <textarea id="analysisNature" disabled>${dados.analysisNature}</textarea>
</div>

<div class="field">
    <label>Quadro Teórico</label>
    <textarea id="theoreticalFramework" disabled>${dados.theoreticalFramework}</textarea>
</div>

`;

    document
        .getElementById("generateXML")
        .addEventListener("click", gerarXML);

});

function gerarXML() {

    const title = document.getElementById("title").value;
    const creator = document.getElementById("creator").value;
    const date = document.getElementById("date").value;
    const language = document.getElementById("language").value;

    const problem = document.getElementById("problem").value;
    const objective = document.getElementById("objective").value;
    const studyNature = document.getElementById("studyNature").value;

    const unitName = document.getElementById("unitName").value;
    const unitType = document.getElementById("unitType").value;

    const spatial = document.getElementById("spatial").value;
    const temporal = document.getElementById("temporal").value;

    const caseDesign = document.getElementById("caseDesign").value;
    const caseCount = document.getElementById("caseCount").value;

    const evidenceSources = document.getElementById("evidenceSources").value;
    const techniques = document.getElementById("techniques").value;
    const validityStrategy = document.getElementById("validityStrategy").value;

    const analysisNature = document.getElementById("analysisNature").value;
    const theoreticalFramework = document.getElementById("theoreticalFramework").value;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>

<dc:subject.caseStudyProfile>

<dc:title>${title}</dc:title>
<dc:creator>${creator}</dc:creator>
<dc:date>${date}</dc:date>
<dc:language>${language}</dc:language>

<dc:type>Estudo de Caso</dc:type>

<dc:subject.problemDefinition>
<dc:description.problem>${problem}</dc:description.problem>
<dc:description.Objective>${objective}</dc:description.Objective>
<dc:description.studyNature>${studyNature}</dc:description.studyNature>
</dc:subject.problemDefinition>

<dc:subject.unitCaseDefinition>

<dc:description.unitCase>
<dc:description.unitName>${unitName}</dc:description.unitName>
<dc:description.unitType>${unitType}</dc:description.unitType>
</dc:description.unitCase>

<dc:coverage>
<dc:description.spatial>${spatial}</dc:description.spatial>
<dc:description.temporal>${temporal}</dc:description.temporal>
</dc:coverage>

</dc:subject.unitCaseDefinition>

<dc:subject.caseNumberDefinition>
<dc:description.caseDesign>${caseDesign}</dc:description.caseDesign>
<dc:description.caseCount>${caseCount}</dc:description.caseCount>
</dc:subject.caseNumberDefinition>

<dc:subject.dataCollection>

<dc:description.evidenceSources>${evidenceSources}</dc:description.evidenceSources>

<dc:description.dataCollectionTechniques>
<dc:description.technique>${techniques}</dc:description.technique>
</dc:description.dataCollectionTechniques>

<dc:description.validityStrategy>${validityStrategy}</dc:description.validityStrategy>

</dc:subject.dataCollection>

<dc:subject.dataAnalysis>

<dc:description.analysisNature>${analysisNature}</dc:description.analysisNature>

<dc:description.theoreticalFramework>${theoreticalFramework}</dc:description.theoreticalFramework>

</dc:subject.dataAnalysis>

</dc:subject.caseStudyProfile>`;

    const blob = new Blob([xml], {
        type: "application/xml"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "CaseStudyProfile.xml";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}