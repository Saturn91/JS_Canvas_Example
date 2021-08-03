let lastTitle = undefined;
let testRuns = 0;
let passedTests = 0;
let failedTests = 0;

let runAllTestsComplete = true;

let summaryLine = document.getElementById('summary');

function testTitle(title) {
    var titleElement = document.createElement("h2");
    titleElement.innerText = title;
    titleElement.classList.add('green');
    titleElement.classList.add('test-title')
    document.body.appendChild(titleElement);
    lastTitle = titleElement;
}

function testResultLine(string, passed) {
    var testLine = document.createElement('p');
    testLine.innerText = string;    
    let cssText = '';
    passed ? cssText = 'green' : cssText = 'red';

    if(lastTitle) {
        if(!lastTitle.classList.contains(cssText)) {
            lastTitle.classList.remove('green');
            lastTitle.classList.add(cssText);
            summaryLine.classList.remove('light-green');
            summaryLine.classList.add('red');
        }
    }

    testLine.classList.add('test-line');
    testLine.classList.add(cssText);
    document.body.appendChild(testLine);
}

function assert(testDescription, test, expection) {
    testRuns ++;
    let passed = test == expection;
    passed ? passedTests ++ : failedTests++;
    if(!passed || runAllTestsComplete) {
        testResultLine(testDescription, passed);
    }    
    summaryLine.innerText = `${testRuns} tests ran, ${passedTests}/${testRuns} passed, ${failedTests}/${testRuns} failed`
}

document.getElementById('rerun-test-btn').addEventListener('click', () => {
    location.reload();
});
