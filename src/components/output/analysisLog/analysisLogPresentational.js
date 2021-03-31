class AnalysisLogPresentational {
	constructor({ $target }) {
		this.render($target)
	}

	render($target) {
		const $analysisLog_section = document.createElement("section");
		$analysisLog_section.className = "analysis-log-section";
		$target.appendChild($analysisLog_section);

		const $analysisLog = `<div class="analysis-log">분석 결과</div>`

		$analysisLog_section.insertAdjacentHTML("beforeend", $analysisLog);
	}
}

export default AnalysisLogPresentational