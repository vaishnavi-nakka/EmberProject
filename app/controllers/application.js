import Controller from '@ember/controller';
import $ from 'jquery';
export default Controller.extend({
    openAcc : true,
    openAcc1 : true,
    omx:'',
    circuitId:'',
    address:'',
    isLoading: false,
    checkOmxGps: true,
    omxSearch: '',
    actions: {
        omxGpsCheck: function(){
            if((this.omxSearch !== '') || (this.gpsSearch !=="") ){
                this.set('checkOmxGps',false);
            }else{
                this.set('checkOmxGps',true);
            }
            
        },
        onSubmit(omxSearch, gpsSearch){
            this.toggleProperty('isLoading');
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
                        this.set('omx',data.OrderNumber);
                        this.set('circuitId',data.CktId);
                        let add = data.AddressStreet + ", "+data.AddressCity +", "+ data.AddressState +", "+data.AddressZip; 
                        this.set('address',add);
                        this.set('customer',data.Customer);
                        this.set('lcon',data.ContactList[0].FirstName+" "+data.ContactList[0].LastName );
                        this.set('email',data.ContactList[0].Email);
                        this.set('lc',data.ContactList[0].PhoneWork);
                        this.set('isLoading',false);
                        this.set('omxSearch','');
                       this.set('checkOmxGps',true);
                       document.getElementById('ember298').click();
                       document.getElementById('ember330').click();
                    });

            }
        },
        toggleAccordian(){
            
            this.toggleProperty('openAcc');
           
                
            
        },
        toggleAccordian1(){
            
            this.toggleProperty('openAcc1');
           
                
            
        }
            

    }

    
})