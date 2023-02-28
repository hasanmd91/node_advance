'use strict';

(function(){
    let resultarea;
    let messagearea;
    let computerId;

    document.addEventListener('DOMContentLoaded',init);

    function init(){
        resultarea=document.getElementById('resultarea');
        computerId=document.getElementById('computerid');
        messagearea=document.getElementById('messagearea');
        document.getElementById('submit')
            .addEventListener('click', send);
    }

    async function send(){
        clearMessage();
        resultarea.innerHTML='';
        try{
            if (computerId.value.trim().length>0){
                const data =
                    await fetch(`http://localhost:4000/api/computers/${computerId.value}`,
                        { mode: 'cors' });
                const result = await data.json();
                if (result) {
                    if (result.message) {
                        updateMessage(result.message, result.type);
                    }
                    else {
                        updateComputer(result);
                    }
                }
            }
            
        }
        catch(error){
            updateMessage(`Not found. ${error.message}`,'error')
        }
    };

    function updateMessage(message,type){
        messagearea.textContent=message;
        messagearea.setAttribute('class',type);
    }

    function clearMessage(){
        messagearea.textContent = '';
        messagearea.removeAttribute('class');
    }

    function updateComputer(result){
        if(result.length===0) return;
        const computer=result[0];
        resultarea.innerHTML=`
        <p><span class="legend">Id</span> ${computer.id}</p>
        <p><span class="legend">Name</span> ${computer.name}</p>
        <p><span class="legend">Type</span> ${computer.type}</p>
        <p><span class="legend">Processor</span> ${computer.processor}</p>
        <p><span class="legend">Amount</span> ${computer.amount}</p>
        `
    }


})();