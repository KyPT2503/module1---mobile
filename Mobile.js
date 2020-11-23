class Mobile
{
    constructor(name,index)
    {
        this.onMode=false;
        this.battery=10;
        this.draftMessage='';
        this.sentMessage=[];
        this.receivedMessage=[];
        this.className=name;
        this.index=index;
    }
    turnOff()
    {
        this.onMode=false;
    }
    switchOnOff()
    {
        this.onMode=!this.onMode;
    }
    charge()
    {
        this.battery+=10;
        if(this.battery>100) this.battery=100;
    }
    batteryReduction()
    {
        this.battery-=5;
        if(this.battery<=0) this.onMode=false;
        console.log('battery reduction : '+this.battery);
    }/*
    receiveMessage(message)
    {
        this.receivedMessage.push(message);
    }
    showReceivedMessage()
    {
        let content='Message received : <br>';
        for(let i=0;i<this.receivedMessage.length;i++)
        {
            content+=i+' / : '+this.receivedMessage[i]+'<br>';
        }
        console.log(content);
    }
    showSentMessage()
    {
        let content='Message Sent :<br>';
        for(let i=0;i<this.sentMessage.length;i++)
        {
            content+=i+' / '+this.sentMessage[i]+'<br>';
        }
        console.log(content);
    }
    attendSendMessage()
    {
        /!*show draft message in textarea*!/
        /!*creat interface send message*!/
    }*/


}