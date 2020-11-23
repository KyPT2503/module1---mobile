let mobileList=[];
function newMobile(name)
{
    let index=mobileList.length;
    let nwm=new Mobile(name,index);
    mobileList.push(nwm);
    console.log('Created new mobile, name : '+name);

    /* HTML ? */
    let content='<div class="'+name+' mobile"><br>';

    /* ON / OFF, battery*/
    content+='<button class="on-off" onclick="switchOnOff('+index+')">OFF</button> ';
    content+='<button class="charge" onclick="chargePhone('+index+')">Charge</button> '
    content+='<button onclick="sendMessage('+index+')">Send Message</button><br><br>'
    content+='<button onclick="showReceivedMessage('+index+')">Received Message</button> '
    content+='<button onclick="showSentMessage('+index+')">Sent Message</button>'
    content+='<p class="battery-display">Battery : '+mobileList[index].battery+' %</p>';

    /*charge*/

    /*sent message*/
    /*received message*/
    /*send message*/

    /*display*/
    content+='<div class="display"></div> '

    content+=`</div>`
    document.getElementById(`mobiles`).innerHTML+=content;
}
function switchOnOff(index)
{
    mobileList[index].switchOnOff();
    if(mobileList[index].onMode==true) document.querySelector('.'+mobileList[index].className+' > .on-off').innerHTML='ON';
    else document.querySelector('.'+mobileList[index].className+' > .on-off').innerHTML='OFF';
    console.log(mobileList[index].className+' phone, onMode : '+mobileList[index].onMode);
}
function chargePhone(index)
{
    mobileList[index].charge();
    document.querySelector('.'+mobileList[index].className+' >.battery-display').innerHTML='Battery : '+mobileList[index].battery+' %';
    console.log(mobileList[index].className+' charged !');
}
function sendMessage(index)
{
    if(checkOnMode(index)==false)
    {
        document.querySelector('.'+mobileList[index].className+' > .display').innerHTML='This Phone is OFF now, turn ON to USE !';
        return;
    }
    let content='';
    content+='<textarea class="content" cols="55" rows="9">'+mobileList[index].draftMessage+'</textarea><br>';
    content+='<input type="text" class="receiver-className"> '
    content+='<button class="send-message" onclick="sendAndReceive('+index+')">Send</button><br>'
    content+='<button class="save-to-draft" onclick="saveToDraft('+index+')">Save to draft</button>'
    document.querySelector('.'+mobileList[index].className+' > .display').innerHTML=content;
}
function sendAndReceive(sender_index)
{
    let message_content=document.querySelector('.'+mobileList[sender_index].className+' > .display > .content').value;
    let receiver_index=+document.querySelector('.'+mobileList[sender_index].className+' > .display > .receiver-className').value;
    mobileList[sender_index].sentMessage.push('to '+sender_index+' / '+message_content);
    mobileList[receiver_index].receivedMessage.push('from '+receiver_index+' / '+message_content);
    document.querySelector('.'+mobileList[sender_index].className+' >.display').innerHTML='Sent Message To id = '+ receiver_index;
    document.querySelector('.'+mobileList[receiver_index].className+' >.display').innerHTML='New message from id = '+sender_index;
    lowBattery(sender_index);
}
function saveToDraft(index)
{
    mobileList[index].draftMessage=document.querySelector('.'+mobileList[index].className+' >.display >.content').value;
    document.querySelector('.'+mobileList[index].className+' > .display').innerHTML='Saved to Draft Message !';
    console.log('phone '+mobileList[index].className+', draft message : '+mobileList[index].draftMessage);
    lowBattery(index);
}
function showReceivedMessage(index)
{
    if(checkOnMode(index)==false)
    {
        document.querySelector('.'+mobileList[index].className+' > .display').innerHTML='This Phone is OFF now, turn ON to USE !';
        return;
    }
    let content='';
    for(let i=0;i<mobileList[index].receivedMessage.length;i++)
    {
        content+=(i+1)+'/ '+mobileList[index].receivedMessage[i]+'<br>';
    }
    document.querySelector('.'+mobileList[index].className+' >.display').innerHTML=content;
    lowBattery(index);
}
function showSentMessage(index)
{
    if(checkOnMode(index)==false)
    {
        document.querySelector('.'+mobileList[index].className+' > .display').innerHTML='This Phone is OFF now, turn ON to USE !';
        return;
    }
    let content='';
    for(let i=0;i<mobileList[index].sentMessage.length;i++)
    {
        content+=(i+1)+'/ '+mobileList[index].sentMessage[i]+'<br>';
    }
    document.querySelector('.'+mobileList[index].className+' >.display').innerHTML=content;
    lowBattery(index);
}

/*check OFF*/
function checkOnMode(index)
{
    if(mobileList[index].onMode==true) return true;
    else return false;
}
function lowBattery(index)
{
    mobileList[index].batteryReduction();
    document.querySelector('.'+mobileList[index].className+' >.battery-display').innerHTML='Battery : '+mobileList[index].battery+' %';
    if(mobileList[index].battery==0)
    {
        mobileList[index].turnOff();
        document.querySelector('.'+mobileList[index].className+' > .on-off').innerHTML='OFF';
        document.querySelector('.'+mobileList[index].className+' > .display').innerHTML='Battery is over, this phone was turn OFF';
    }
}