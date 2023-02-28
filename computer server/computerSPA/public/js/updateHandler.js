'use strict';

(function(){
    let idField;
    let nameField;
    let typeField;
    let processorField;
    let amountField;
    let messagearea;
    let searchState=true;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        idField = document.getElementById('id');
        nameField = document.getElementById('name');
        typeField = document.getElementById('type');
        processorField = document.getElementById('processor');
        amountField = document.getElementById('amount');
        messagearea = document.getElementById('messagearea');


        updateFields();

        document.getElementById('submit')
            .addEventListener('click',send);
        
        idField.addEventListener('focus', clearAll);
    }

    function updateMessage(message, type) {
        messagearea.textContent = message;
        messagearea.setAttribute('class', type);
    }

    function clearMessage() {
        messagearea.textContent = '';
        messagearea.removeAttribute('class');
    }

    function clearAll(){
        if(searchState){
            clearFieldValues();
            clearMessage();
        }
    }

    function updateFields(){
        if(searchState){
            idField.removeAttribute('readonly');
            nameField.setAttribute('readonly',true);
            typeField.setAttribute('readonly',true);
            processorField.setAttribute('readonly',true);
            amountField.setAttribute('readonly',true);
        }
        else{
            idField.setAttribute('readonly',true);
            nameField.removeAttribute('readonly');
            typeField.removeAttribute('readonly');
            processorField.removeAttribute('readonly');
            amountField.removeAttribute('readonly');
        }
    } //updateFields end

    function clearFieldValues(){
        idField.value='';
        nameField.value='';
        typeField.value='';
        processorField.value='';
        amountField.value='';
        searchState=true;
        updateFields();
    } //end of clearFieldValues

    function updateComputer(result){
        if (result.length === 0) return;
        const computer = result[0];
        idField.value = computer.id;
        nameField.value = computer.name;
        typeField.value = computer.type;
        processorField.value = computer.processor;
        amountField.value = computer.amount;
        searchState = false;
        updateFields();
    }

    async function send(){
        try{
            if(searchState){ //get computer
                if (idField.value.trim().length > 0) {
                    const data =
                        await fetch(`http://localhost:4000/api/computers/${idField.value}`,
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
            else{ //put computer
                const computer={
                    id:idField.value,
                    name:nameField.value,
                    type:typeField.value,
                    processor:processorField.value,
                    amount:amountField.value
                };

                const options={
                    method:'PUT',
                    body:JSON.stringify(computer),
                    headers:{
                        'Content-Type':'application/json'
                    },
                    mode:'cors'
                }

                const data = 
                    await fetch(`http://localhost:4000/api/computers/${computer.id}`,
                                options);

                const status=await data.json();

                if (status.message) {
                    updateMessage(status.message, status.type);
                }

                searchState=true;
                updateFields();
            }

        }
        catch(err){
            updateMessage(err.message,'error');
        }
    }

})();