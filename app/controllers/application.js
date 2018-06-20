import Controller from '@ember/controller';
import $ from 'jquery';
export default Controller.extend({
    openAcc : true,
    openAcc1 : true,
    omx:'',
    circuitId:'',
    address:'',
    actions: {
        onSubmit(omxSearch, gpsSearch){
            console.log(omxSearch);
            console.log(gpsSearch);
            if(omxSearch !== undefined){
                let url = "http://localhost:1337/nicsd.bhdc.att.com/watsonapi/v1/ocx/getorderdata/"+omxSearch;
                $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    headers:{
                            ContentType:"application/x-www-form-urlencoded",
                            Authorization:'Basic ' + btoa('UD:R7iDFT8W2r')
                        }
                    }).then(data=>{
                        console.log(data.OrderNumber);
                        this.set('omx',data.OrderNumber);
                        this.set('circuitId',data.CktId);
                        let add = data.AddressStreet + ", "+data.AddressCity +", "+ data.AddressState +", "+data.AddressZip; 
                        this.set('address',add);
                        this.set('customer',data.Customer);
                        this.set('lcon',data.ContactList[0].FirstName+" "+data.ContactList[0].LastName );
                        this.set('email',data.ContactList[0].Email);
                        this.$().on('click', 'acc');
                    });

            }
        },
        toggleAccordian(){
            console.log("inside toggleacc");
            
            this.toggleProperty('openAcc');
           
                
            
        },
        toggleAccordian1(){
            console.log("inside toggleacc1");
            
            this.toggleProperty('openAcc1');
           
                
            
        }
            

    }

    
})