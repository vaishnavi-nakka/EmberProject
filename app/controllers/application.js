import Controller from '@ember/controller';
import $ from 'jquery';
export default Controller.extend({
    openAcc: true,
    openAcc1: true,
    isLoading: false,
    checkOmxGps: true,
    omxSearch: '',
    gpsSearch: '',
    checkReset: true,
    fields: ['omxSearch', 'gpsSearch', 'omx','lcon','sr','lc','customer','email','history','pim','address','le','pm','techinfo','ip','vLan','circuitId','perInfo','hostName','lte','mac','vnfInfo','demarc'],
    actions: {
        omxGpsCheck: function () {

            if ((this.omxSearch.match(/\d{9}/)) || (this.gpsSearch.match(/\d{9}/))) {
                this.set('checkOmxGps', false);
            } else {
                this.set('checkOmxGps', true);
            }
            // document.getElementById("omx-id").addEventListener("keyup",function(event){
            //     event.preventDefault();
            //     if(event.keyCode===13){
            //         document.getElementById("search-btn").click();
            //     }
            // });

        },
        onSubmit(omxSearch, gpsSearch) {
            console.log("inside onsubmit");
            this.toggleProperty('isLoading');
            if (omxSearch !== undefined) {
                let url = "http://localhost:1337/nicsd.bhdc.att.com/watsonapi/v1/ocx/getorderdata/" + omxSearch;
                $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    headers: {
                        ContentType: "application/x-www-form-urlencoded",
                        Authorization: 'Basic ' + btoa('UD:R7iDFT8W2r')
                    }
                }).then(data => {
                    console.log(data);
                    this.set('omx', data.OrderNumber);
                    if (data.Product == "UCPE") {
                        this.set('hostName', data.CktId);
                    } else {
                        this.set('circuitId', data.CktId);
                    }
                    let add = data.AddressStreet + ", " + data.AddressCity + ", " + data.AddressState + ", " + data.AddressZip;
                    this.set('address', add);
                    this.set('customer', data.Customer);
                    console.log(this.customer);
                    this.set('lcon', data.ContactList[0].FirstName + " " + data.ContactList[0].LastName);
                    this.set('email', data.ContactList[0].Email);
                    this.set('lc', data.ContactList[0].PhoneWork);
                    this.set('isLoading', false);
                    this.set('omxSearch', '');
                    this.set('checkOmxGps', true);
                    document.getElementById('ember299').click();
                    document.getElementById('ember331').click();
                    this.toggleProperty('checkReset');
                });

            }
        },
        insertNewline: function() {
            Ember.$('#search-btn').click();
        },
        onReset() {
            console.log('inside reset');
            for (let i = 0; i < this.fields.length; i++) {
                this.set(this.fields[i],'');
            }
            document.getElementById('ember299').click();
            document.getElementById('ember331').click();
            this.toggleProperty('checkReset');

        },
        toggleAccordian() {

            this.toggleProperty('openAcc');



        },
        toggleAccordian1() {

            this.toggleProperty('openAcc1');



        }


    }


})