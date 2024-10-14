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
const batGeneral = document.getElementById('batGeneral');
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
const batGeneralDisposal = document.getElementById('batGeneralDisposal');

let batDataLoad = false;
let cpuDataLoad = false;
let gpuDataLoad = false;



/*use for loop to search through each word in input prompt, use break if word found to exit loop*/

function getComputerInfo() {

    fetch('../data/gpu.txt')
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

    fetch('../data/cpu.txt')
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
                    break;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });
    
    fetch('../data/battery.txt')
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
                    console.log(batLines[i+1]);
                    batLongevityTitle.innerText = batLongLines[0];
                    batLongevityText.innerHTML = batLongLines[1];
                    batGeneral.innerHTML = "<div class='text'><br>UPDATE SOFTWARE: Keep your operating system and drivers updated, as optimizations can improve battery management. <br>BATTERY HEALTH MONITORING: Use software tools to monitor battery health and usage patterns, allowing you to adjust settings for better longevity. <br>AVOID CONSTANT PLUGGING: While it’s okay to keep the laptop plugged in, try not to do so constantly; occasional discharging is beneficial.</div>";
                    

                    const batDispLines = batLines[i+2].split(','); 
                    batDisposalTitle.innerText = batDispLines[0];
                    batDisposalText.innerHTML = batDispLines[1];
                    batGeneralDisposal.innerHTML = "<div class='text'><br>KEEP BATTERIES SAFE: When transporting used batteries for disposal, keep them in a plastic bag or a battery container to prevent short-circuiting.<br>AVOID INCIERNATION: Never burn batteries as this can cause toxic fumes and explosions.<br>CHECK LOCAL REGULATIONS: Always check local regulations regarding battery disposal and recycling, as guidelines can vary by location.</div>"
                    recycleLink(batDisposalText);

                    break;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });
    
    fetch('../data/computer.txt')
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
                    break;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });
        
    function clicky(){
        console.log('ruff');
    }

    function recycleLink(element) {
        const recycleLink = elementFromHtml("<button style='background-color:gray;' onclick='clicky()' >push me</button>");
        
        element.appendChild(recycleLink);
    }

    //adds event listener for modal
    function startModal() {
        document.getElementById('modalButton').addEventListener('click', function(e) {
            if(document.getElementById('modal').style.display == 'none'){
                document.getElementById('modal').style.display = 'block';
            }
            else{
                
                document.getElementById('modal').style.display = 'none';
            }
            console.log("hi");
        })
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
