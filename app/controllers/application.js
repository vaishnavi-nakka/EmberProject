import Controller from '@ember/controller';
import $ from 'jquery';
export default Controller.extend({
    openAcc : true,
    openAcc1 : true,
    actions: {
        onSubmit(omxSearch, gpsSearch){
            console.log(omxSearch);
            console.log(gpsSearch);
            if(omxSearch !== undefined){
                let url = "http://localhost:1337/nicsd.bhdc.att.com/watsonapi/v1/ocx/getorderdata/302552488";
                $.post(url,
                        {"auth":{
                                "type":"basic",
                                "password":"R7iDFT8W2r",
                                "username":"UD"
                        }
                    },function(data,status){
                        this.results = data;
                        console.log(status);
                        },"json");

            }else{

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