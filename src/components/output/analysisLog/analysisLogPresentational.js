class AnalysisLogPresentational {
	constructor({ $target, stringifiedData }) {
		this.render($target, stringifiedData);
	}

	render($target, stringifiedData) {
		const $analysisLog_section = document.createElement("section");
		$analysisLog_section.className = "analysis-log-section";
		$target.appendChild($analysisLog_section);

		const $analysisLog = `<pre class="analysis-log">${stringifiedData}</pre>`;

		$analysisLog_section.insertAdjacentHTML("beforeend", $analysisLog);
	}
}

export default AnalysisLogPresentational;
