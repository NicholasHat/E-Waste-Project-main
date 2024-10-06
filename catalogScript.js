const cInput = document.getElementById('cInput');
const batInput = document.getElementById('batInput');
const cpuInput = document.getElementById('cpuInput');
const gpuInput = document.getElementById('gpuInput');

/*have to move this code to after html elements are added to page */
const cTitle = document.getElementById('cTitle');
const cLongevityText = document.getElementById('cLongevityText');
const cDisposalTitle = document.getElementById('cDisposalTitle');
const cDisposalText = document.getElementById('cDisposalText');
const batTitle = document.getElementById('batTitle');
const batLongevityTitle = document.getElementById('batLongevityTitle');
const batLongevityText = document.getElementById('batLongevityText');
const batDisposalTitle = document.getElementById('batDisposalTitle');
const batDisposalText = document.getElementById('batDisposalText');
const cpuTitle = document.getElementById('cpuTitle');
const cpuLongevityTitle = document.getElementById('cpuLongevityTitle');
const cpuLongevityText = document.getElementById('cpuLongevityText');
const cpuDisposalTitle = document.getElementById('cpuDisposalTitle');
const cpuDisposalText = document.getElementById('cpuDisposalText');
const gpuTitle = document.getElementById('gpuTitle');
const gpuLongevityTitle = document.getElementById('gpuLongevityTitle');
const gpuLongevityText = document.getElementById('gpuLongevityText');
const gpuDisposalTitle = document.getElementById('gpuDisposalTitle');
const gpuDisposalText = document.getElementById('gpuDisposalText');


let batDataLoad = false;
let cpuDataLoad = false;
let gpuDataLoad = false;

/*use for loop to search through each word in input prompt, use break if word found to exit loop*/

function getComputerInfo() {

    fetch('gpu.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const gpu = gpuInput.value;
            const gpuLines = data.split('\n');
            for (let i = 0; i < gpuLines.length; i++) {
                if (gpuLines[i].toLowerCase().includes(gpu.toLowerCase().trim()) && gpu!='') {
                    checkForDividingLine();
                    gpuDataLoad = true;
                    gpuTitle.innerText = gpuLines[i];
                    
                    const gpuLongLines = gpuLines[i+1].split(',');
                    gpuLongevityTitle.innerText = gpuLongLines[0];
                    gpuLongevityText.innerText = gpuLongLines[1];  

                    const gpuDispLines = gpuLines[i+2].split(','); 
                    gpuDisposalTitle.innerText = gpuDispLines[0];
                    gpuDisposalText.innerText = gpuDispLines[1];
                    recycleLink(gpuDisposalText);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });

    fetch('cpu.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const cpu = cpuInput.value;
            const cpuLines = data.split('\n');
            console.log('why');
            for (let i = 0; i < cpuLines.length; i++) {
                if (cpuLines[i].toLowerCase().includes(cpu.toLowerCase().trim()) && cpu!='') {
                    if (document.getElementById('cpuLn').innerHTML == '' && gpuDataLoad) {
                        const miniLine = elementFromHtml("<hr style='margin: 10px 25em; border-bottom: 3px solid black;'>");
                        document.getElementById('cpuLn').appendChild(miniLine);
                    }
                    checkForDividingLine();
                    cpuDataLoad = true;

                    cpuTitle.innerText = cpuLines[i];
                        
                    const cpuLongLines = cpuLines[i+1].split(',');
                    cpuLongevityTitle.innerText = cpuLongLines[0];
                    cpuLongevityText.innerText = cpuLongLines[1];

                    const cpuDispLines = cpuLines[i+2].split(','); 
                    cpuDisposalTitle.innerText = cpuDispLines[0];
                    cpuDisposalText.innerText = cpuDispLines[1];
                    recycleLink(cpuDisposalText);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });
    
    fetch('battery.txt')
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const bat = batInput.value;
            const batLines = data.split('\n');
            console.log('why');
            for(let i = 0; i < batLines.length; i++) {
                if(batLines[i].toLowerCase().includes(bat.toLowerCase().trim()) && bat!='') {
                    if(document.getElementById('batLn').innerHTML == '' && (cpuDataLoad || gpuDataLoad)) {
                        const miniLine = elementFromHtml("<hr style='margin: 10px 25em; border-bottom: 3px solid black;'>");
                        document.getElementById('batLn').appendChild(miniLine);
                    }
                    checkForDividingLine();
                    batDataLoad = true;
                    batTitle.innerText = batLines[i];
                        
                    const batLongLines = batLines[i+1].split(',');
                    batLongevityTitle.innerText = batLongLines[0];
                    batLongevityText.innerText = batLongLines[1];

                    const batDispLines = batLines[i+2].split(','); 
                    batDisposalTitle.innerText = batDispLines[0];
                    batDisposalText.innerText = batDispLines[1];
                    recycleLink(batDisposalText);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });
    
    fetch('computer.txt')
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const c = cInput.value;
            const cLines = data.split('\n');
            for(let i = 0; i < cLines.length; i++) {
                if(cLines[i].toLowerCase().includes(c.toLowerCase().trim()) && c!='') {
                    if(document.getElementById('cLn').innerHTML == '' && (batDataLoad || gpuDataLoad || cpuDataLoad)) {
                        const miniLine = elementFromHtml("<hr style='margin: 10px 25em; border-bottom: 3px solid black;'>");
                        document.getElementById('cLn').appendChild(miniLine); 
                    }
                    checkForDividingLine();
                    cTitle.innerText = cLines[i];
                        
                    const cLongLines = cLines[i+1].split(',');
                    cLongevityText.innerText = cLongLines[0];

                    const cDispLines = cLines[i+2].split(','); 
                    cDisposalTitle.innerText = cDispLines[0];
                    cDisposalText.innerText = cDispLines[1];
                    recycleLink(cDisposalText);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });

    function recycleLink(element) {
        const recycleLink = elementFromHtml("<a href='recyclePage.html' style='font-family: lowFont;'> Go Recycle</a>");
        element.appendChild(recycleLink);
    }
    
    function elementFromHtml(html) {
        const template = document.createElement("template");

        template.innerHTML = html.trim();
        
        return template.content.firstElementChild;
    }

    function checkForDividingLine() {
        if(document.getElementById('divLn').innerHTML == '') {
            const divLine = elementFromHtml("<hr style='margin: 0 20px;border-bottom: 3px solid black;'>");
            document.getElementById('divLn').appendChild(divLine);
        }
    }

}