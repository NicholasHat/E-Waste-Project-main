const cInput = document.getElementById('cInput');
const batInput = document.getElementById('batInput');
const cpuInput = document.getElementById('cpuInput');
const gpuInput = document.getElementById('gpuInput');

/*have to move this code to after html elements are added to page */
const recyclingInfo = document.getElementById('recyclingInfo');
const recyclingMap = document.getElementById('recyclingMap');
const magnifyingGlass = document.getElementById('magnifyingGlass');
const recyclingBelowText = document.getElementById('recyclingBelowText');
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
const memoryTitle = document.getElementById('memoryTitle');
const memoryLongevityTitle = document.getElementById('memoryLongevityTitle');
const memoryLongevityText = document.getElementById('memoryLongevityText');
const memoryDisposalTitle = document.getElementById('memoryDisposalTitle');
const memoryDisposalText = document.getElementById('memoryDisposalText');
const ecommerceTitle = document.getElementById('ecommerceTitle');
const ecommerceText = document.getElementById('ecommerceText');

let batDataLoad = false;
let cpuDataLoad = false;
let gpuDataLoad = false;



/*use for loop to search through each word in input prompt, use break if word found to exit loop*/

function getComputerInfo() {
    doMap();
    fetch('../data/gpu.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const gpu = gpuInput.value;
            const gpuValues = gpu.split(' ');
            const gpuLines = data.split('\n');
            for (let i = 0; i < gpuLines.length; i++) {
                if (gpuLines[i].toLowerCase().includes(gpuValues[0].toLowerCase().trim()) && gpu!='') {
                    checkForDividingLine();
                    
                    gpuDataLoad = true;
                    gpuTitle.innerText = gpuLines[i];
                    
                    const gpuLongLines = gpuLines[i+1].split('*');
                    console.log(gpuLongLines);
                    gpuLongevityTitle.innerHTML = gpuLongLines[0];
                    gpuLongevityText.innerHTML = gpuLongLines[1];  

                    const gpuDispLines = gpuLines[i+2].split('*'); 
                    gpuDisposalTitle.innerHTML = gpuDispLines[0];
                    gpuDisposalText.innerHTML = gpuDispLines[1];

                    break;
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
            const cpuValues = cpu.split(' ');
            const cpuLines = data.split('\n');
            console.log('why');
            for (let i = 0; i < cpuLines.length; i++) {
                if (cpuLines[i].toLowerCase().includes(cpuValues[0].toLowerCase().trim()) && cpu!='') {
                    if (document.getElementById('cpuLn').innerHTML == '' && gpuDataLoad) {
                        const miniLine = elementFromHtml("<hr style='margin: 10px 25em; border-bottom: 3px solid black;'>");
                        document.getElementById('cpuLn').appendChild(miniLine);
                    }
                    checkForDividingLine();
                    
                    cpuDataLoad = true;

                    cpuTitle.innerText = cpuLines[i];
                        
                    const cpuLongLines = cpuLines[i+1].split('*');
                    cpuLongevityTitle.innerHTML = cpuLongLines[0];
                    cpuLongevityText.innerHTML = cpuLongLines[1];

                    const cpuDispLines = cpuLines[i+2].split('*'); 
                    cpuDisposalTitle.innerHTML = cpuDispLines[0];
                    cpuDisposalText.innerHTML = cpuDispLines[1];
    
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
            const batValues = bat.split(' ');
            const batLines = data.split('\n');
            console.log('why');
            for(let i = 0; i < batLines.length; i++) {
                if(batLines[i].toLowerCase().includes(batValues[0].toLowerCase().trim()) && bat!='') {
                    if(document.getElementById('batLn').innerHTML == '' && (cpuDataLoad || gpuDataLoad)) {
                        const miniLine = elementFromHtml("<hr style='margin: 10px 25em; border-bottom: 3px solid black;'>");
                        document.getElementById('batLn').appendChild(miniLine);
                    }
                    checkForDividingLine();
                    
                    batDataLoad = true;
                    batTitle.innerText = batLines[i];
                    const batLongLines = batLines[i+1].split('*');
                    console.log(batLines[i+1]);
                    batLongevityTitle.innerText = batLongLines[0];
                    batLongevityText.innerHTML = batLongLines[1];
                    batGeneral.innerHTML = "<div class='text'>UPDATE SOFTWARE: Keep your operating system and drivers updated, as optimizations can improve battery management. <br>BATTERY HEALTH MONITORING: Use software tools to monitor battery health and usage patterns, allowing you to adjust settings for better longevity. <br>AVOID CONSTANT PLUGGING: While it’s okay to keep the laptop plugged in, try not to do so constantly; occasional discharging is beneficial.</div>";
                    

                    const batDispLines = batLines[i+2].split('*'); 
                    batDisposalTitle.innerText = batDispLines[0];
                    batDisposalText.innerHTML = batDispLines[1];
                    batGeneralDisposal.innerHTML = "<div class='text'><br>KEEP BATTERIES SAFE: When transporting used batteries for disposal, keep them in a plastic bag or a battery container to prevent short-circuiting.<br>AVOID INCIERNATION: Never burn batteries as this can cause toxic fumes and explosions.<br>CHECK LOCAL REGULATIONS: Always check local regulations regarding battery disposal and recycling, as guidelines can vary by location.</div>"


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
            const cValues = c.split(' ');
            const cLines = data.split('\n');
            for(let i = 0; i < cLines.length; i++) {
                if(cLines[i].toLowerCase().includes(cValues[0].toLowerCase().trim()) && c!='') {
                    if(document.getElementById('cLn').innerHTML == '' && (batDataLoad || gpuDataLoad || cpuDataLoad)) {
                        const miniLine = elementFromHtml("<hr style='margin: 10px 25em; border-bottom: 3px solid black;'>");
                        document.getElementById('cLn').appendChild(miniLine); 
                    }
                    checkForDividingLine();
                    
                    
                    cTitle.innerHTML = cLines[i];

                    const cLongLines = cLines[i+1].split('*');
                    cLongevityText.innerText = cLongLines[0];

                    const cDispLines = cLines[i+2].split('*'); 
                    cDisposalTitle.innerText = cDispLines[0];
                    cDisposalText.innerText = cDispLines[1];
                    
                    break;
                }

            }
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });
        memoryTitle.innerHTML = "Memory Components(HD, SSD, RAM)";
        memoryLongevityTitle.innerText = "How to keep Memory Components in Good Condition";
        memoryLongevityText.innerHTML = "<div class='text'>MAINTAIN OPTIMAL OPERATING CONDITIONS: Keep your computer in a cool dry place, avoinding extreme temperatures and humidity. Also ensure proper airflow through device by cleaning dust and dirt from vents and fans regularly.<br>MONITOR HEALTH: Use software to monitor the health of memory components through SMART data and run diagnostics regularly to check for errors.<br>AVOID OVERFILLING DRIVES: Leave at least 10-20% of the drive space free to maintain performance, especially for SSDs.</div>";
        memoryDisposalTitle.innerText = "How to properly Recycle your Memory Components";
        memoryDisposalText.innerHTML = "<div class='text'>DATA SECRUITY: Before getting rid of your memory components make sure to wipe all data securely. For sensitive data consider destroying the drive by shredding it or drilling holes.<br><br>Some companies, like Samsung and Western Digital may offer trade-in programs but they are often very limited.</div>";
        
        ecommerceTitle.innerHTML = "Selling and Trading your Devices and Components";
        ecommerceText.innerHTML = "<div class='text'>There are many ways to trade in or sell your computers and components. You can trade-in your full computer through websites like Swappa, Uptrade, and TradeMore.<br>Or you can sell your devices and components on <br><div class='text'>ONLINE MARKETPLACES like eBay and Craigslist<br>SPECIALIZED WEBSITES like Newegg and PCPartPicker<br>TECH FORUMS like HardForum and Reddit<br>LOCAL SHOPS like Pawn shops and Computer Repair shops.</div></div>";

    function elementFromHtml(html) {
        const template = document.createElement("template");

        template.innerHTML = html.trim();
        
        
        return template.content.firstElementChild;
    }
    
    function doMap(){
        recyclingInfo.innerHTML = "<div font style='bold'><font size='5'><font color='black'><span style='color:green;'>Electronics Recycling Centers</span> in Los Angeles Below<br>Find an <span style='color:green;'>Electronics Recycling Center</span> Near You!</p></div>";
        recyclingInfo.style.marginTop = '10vh';
        
        
        recyclingMap.innerHTML = "<iframe id='googleMap' src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d520942.06484790624!2d-118.49836743977119!3d34.05014862538946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1slos%20angeles%20electronics%20recycling!5e0!3m2!1sen!2sus!4v1728949512626!5m2!1sen!2sus'  style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>";
        recyclingMap.style.marginTop=  '5vh'; 
        recyclingMap.style.marginLeft=  'auto'; 
        recyclingMap.style.marginBottom=  '1vh'; 
        recyclingMap.style.marginRight = 'auto';
        recyclingMap.style.width= '60vh';
        recyclingMap.style.height= '60vh';
        recyclingMap.style.borderStyle = 'solid';

        magnifyingGlass.style.backgroundImage = "url('catalog/Untitled document.jpg')";
        
        recyclingBelowText.innerHTML = "<div style='margin: 0 10vh 20vh;'>If trading or selling your electronic devices/components is not available, recycling would be a great option for you!</div>";

    }

    function checkForDividingLine() {
        if(document.getElementById('divLn').innerHTML == '') {
            const divLine = elementFromHtml("<hr style='margin: 0 20px;border-bottom: 3px solid black;'>");
            document.getElementById('divLn').appendChild(divLine);
        }
    }

}
