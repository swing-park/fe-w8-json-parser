class AnalysisInfoPresentational {
	constructor({ $target }) {
		this.render($target)
	}

	render($target) {
		const $analysisInfo_section = document.createElement("section");
		$analysisInfo_section.className = "analysis-info-section";
		$target.appendChild($analysisInfo_section);

		const $analysisInfo = `<span class="analysis-info">분석 결과입니다 홀홀</span>`

		$analysisInfo_section.insertAdjacentHTML("beforeend", $analysisInfo);
	}
}

export default AnalysisInfoPresentational