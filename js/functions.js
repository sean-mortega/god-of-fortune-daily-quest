// global
Vue.use(window.vuelidate.default);

// local mixin
var validationMixin = window.vuelidate.validationMixin;
const {
    required,
    minLength, 
    maxLength,
} = window.validators;


axios.defaults.baseURL = 'https://xmas2022-api-test.rgbhu.io';

// update to production by Jason 
//axios.defaults.baseURL = 'https://xmas2022-api-z0huw4zn4udn.happistar.info';



var app = new Vue({
    el: '#app',
    data: {
        countryCode: 91,
        otp: null,
        mobileNumber: null,
        maxChars: 10,
        languages: [],
        teams: [],
        formErrors: [],
        predictionResults: [],
        isSelected: false,
        instructions: false,
        successPrediction: false,
        showPredResults: false,
        errorOTP: false,
        errorOTPused: false,
        wrongOTP: false,
        otpSent: false,
        errorInvalidPhone: false,
        isRegisterClicked: false,
        errorPrediction: false,
        predictRecordExist: false,
        phoneNumberLength: 10,
        tickerTime: '0:00',
        predStartTime: 0,
        predEndTime: 0,
        predId: 0,
        getInfoResult: [],
        errorMessage: '',
        selectedPrediction: '',
        predictionTotal: 0,
        predictionResultA: 0,
        predictionResultB: 0,
        styleObject: {},
        predictionData: [],
        hasContent: false,


        /* new variables */
        showHowtoPlay: false,
        showPlayNow: false,
        showMyPresents: false,
        showFaq: false,
        isLoading: false,
        userName: '',
        hostName: '',

        mainOfferData: [],
        activeOfferId: 0,

        apiError: false,
        errorMessage: '',
        errorTitle: '',
        isOpenOffer: true,
        show2popUps: false,

        langVal: 'eng',
        countdownMode: false,
        cd_days: '',
        cd_hours: '',
        cd_minutes: '',
        cd_seconds: '',

        done_days: [],
        remain_days: []

    },
    validations: {
        
        
        playNow__prediction_form: {
            PredictorData: {
                $each: {
                    TeamAResult: 
                    { required,
                        integer: validators.integer,
                        maxLength: maxLength(2) },
                    TeamBResult: 
                    { required,
                        integer: validators.integer,
                        maxLength: maxLength(2) }
                }
            }
        }
    },

    methods: {


        openEnvelope: function(mode, id) {
            
            console.log("#envelope" + "-" + id  );

            if(mode==='pc') {
                $("#envelope" + "-" + id  ).attr("src","./assets/gifts/open-" + id + '.png');
            } else{
                $("#envelopeMb" + "-" + id  ).attr("src","./assets/gifts/open-" + id + '.png');
            }
            

        },

        closeEnvelope: function(mode, id) {

            if(mode==='pc') {
                $("#envelope" + "-" + id  ).attr("src","./assets/gifts/closed-" + id + '.png');
            } else{
                $("#envelopeMb" + "-" + id  ).attr("src","./assets/gifts/closed-" + id + '.png');
            }

        },



        /* function when switching thru How to Play, FAQ and My Presents Page */
        switchPage: function( page ) {

            var that = this;

            that.successPrediction = false;
            this.showMyPresents =  false;
            this.showHowtoPlay =  false;
            this.showFaq =  false;

            if(page === 1) {

                this.showMyPresents =  true;
                this.showHowtoPlay =  false;
                this.showFaq =  false;
                
                try {
                    document.getElementById( 'myPresentsM' ).classList.add('activex');
                    document.getElementById( 'howToPlayM' ).classList.remove('activex');
                    document.getElementById( 'faqM' ).classList.remove('activex');
                } catch(err) {
                    console.log(err)
                }
                
               
            }  else if (page=== 2) {

                this.showMyPresents =  false;
                this.showHowtoPlay =  true;
                this.showFaq =  false;

                try {
                    document.getElementById( 'myPresentsM' ).classList.remove('activex');
                    document.getElementById( 'howToPlayM' ).classList.add('activex');
                    document.getElementById( 'faqM' ).classList.remove('activex');
                } catch(err) {
                    console.log(err)
                }

            } else if (page=== 3) {

                this.showMyPresents =  false;
                this.showHowtoPlay =  false;
                this.showFaq =  true;
                
                try {
                    document.getElementById( 'myPresentsM' ).classList.remove('activex');
                    document.getElementById( 'howToPlayM' ).classList.remove('activex');
                    document.getElementById( 'faqM' ).classList.add('activex');
                    
                    // show FAQ item by default

                    setTimeout( function() {
                        if($('#list-item-1')) {
                            $('#list-item-1').prop('checked', true);
                        }
                    }, 300);
                    
                    

                } catch(err) {
                    console.log(err)
                }

            } else {

                this.showMyPresents =  false;
                this.showHowtoPlay =  false;
                this.showFaq =  false;

                try {
                    document.getElementById( 'myPresentsM' ).classList.remove('activex');
                    document.getElementById( 'howToPlayM' ).classList.remove('activex');
                    document.getElementById( 'faqM' ).classList.remove('activex');
                } catch(err) {
                    console.log(err)
                }
            }

        },
        

        /* function to check  the client device type */
        isMobile: function() {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                return true;
            }
            return false;
        },




        showInstructions: function() {

            var that = this;
            $('#myModal').fadeIn('slow');
            (function fun() {
                $('.modal-content').css({
                    'transform': that.isMobile()=== true ? 'translateY(0px)' : 'translateY(0px)'
                });
            })();
        },

        showOffersInPopUp: function() {
            
            var that = this;
            $('#myModal2').fadeIn('slow');
            (function fun() {
                $('.modal-content').css({
                    'transform': that.isMobile()=== true ? 'translateY(0px)' : 'translateY(0px)'
                });
            })();
            
        },


        /* hide the pop ups */
        hideModals: function() {
            $('#myModal').fadeOut('fast');
            $('#myModal2').fadeOut('fast');
            /* reset modal content */
            //this.successPrediction = false;
            this.instructions = false;
            this.otpSent = false;
            this.errorOTP = false;
            this.errorPrediction = false;
            this.errorOTPused = false;
            this.errorInvalidPhone = false;
            this.errorMessage = '';
            this.errorTitle = '';
        },


        

        retDays: function(mode) {

            var that = this;

            if(mode==='0') {
                if(that.langVal === 'jpn') {
                    return '残り日！';
                } else if(that.langVal === 'vnm') {
                    return  'vài ngày nữa';
                } else if(that.langVal === 'ind') {
                    return  'hari lagi!';
                } else if(that.langVal === 'tha') {
                    return 'เหลืออีก วัน!';
                } else {
                    return 'days to go';
                } 
            } else {
                if(that.langVal === 'jpn') {
                    return '残り日！';
                } else if(that.langVal === 'vnm') {
                    return  'ngày nữa ';
                } else if(that.langVal === 'ind') {
                    return  'hari lagi!';
                } else if(that.langVal === 'tha') {
                    return 'เหลืออีก วัน!';
                } else {
                    return 'day to go';
                } 
            }
        },

        /* function to get the Gift and History Data */
        getHowToPlay: function() {
            var that = this;
            try {
                axios.post('/getOfferByUser', 
                    {
                        "userName": that.userName
                    })
                    .then(function(response) {
                        if (response.data.code === 200 && response.data.message === 'SUCCESS') {


                            that.mainOfferData = response.data.data;


                            
                            //that.activeOfferId = that.mainOfferData.currentOfferId;



                            /* add the upcoiming days to the 'My presents' Table */ 

                            //get the available number of days from the API
                            // var daysFromRes = Object.keys(that.mainOfferData['2'].days).length;
                            var daysFromRes = Object.keys(that.mainOfferData.days).length;

                                // add placeholder days
                                // example, If we have 3 items from the result, only add 4 rows 
                                // to make it 7 days

                                console.log( that.languages );
                                if(daysFromRes !==7) {
                                    for( var i=(daysFromRes + 1); i <= 7 ; i++) {
                                        //append placeholder rows
                                        if(i !==0 ) { 
                                            that.mainOfferData.days[i] = [{
                                                "offerId": i,
                                                "reward": '',
                                                "status": `${i-daysFromRes} ${ (i-daysFromRes)>1 ? that.retDays('0') : that.retDays('1') }`,
                                                "upcoming": true
                                            }]
                                        }
                                        
                                    }
                                }
                                

                        } else {
                            console.log(
                             'no offer data'   
                            );

                            that.generateMockData();

                            
                        }
                    })
                    .catch(function(error) {
                        console.log(error);

                        console.log(
                            'from API error offer data'   
                           );
                        
                           that.generateMockData();

                    })
            } catch (error) {
                console.info(error);

                that.generateMockData();
            }
        },

        showReward: function() {
            var that = this;
            
            let indexDay = that.mainOfferData.currentDay - 1;
            return that.mainOfferData.days[ that.mainOfferData.currentDay-1 ][0]['reward'];
        },


        generateMockData: function() {
            var that = this;
            that.mainOfferData = {
                "username": "noaccount",
                "currentDay": 3,
                "currentStatus": null,
                "offerData": [
                    {
                        "currentOfferId": 18,
                        "currentOfferNote": "Setor sekarang Rp800,000",
                        "ctaURL": "/?action=deposit",
                        "ctaText": "Setor sekarang!",
                        "reward": "Rp160,000 Bonus kasino",
                        "selected": null
                    },
                    {
                        "currentOfferId": 32,
                        "currentOfferNote": "Setor sekarang Rp800,000",
                        "ctaURL": "/?action=deposit",
                        "ctaText": "Setor sekarang!",
                        "reward": "Rp160,000 Bonus kasino",
                        "selected": null
                    }
                ],
                "days": {
                    "1": [
                      {
                        "reward": "250,000? Ti?n thu?ng sòng b?c",
                        "status": 1
                      }
                    ],
                    "2": [
                      {
                        "reward": "250,000? Ti?n thu?ng sòng b?c",
                        "status": 0
                      }
                    ],
                    "3": [
                      {
                        "reward": "50,000? Ti?n thu?ng sòng b?c",
                        "status": 0
                      }
                    ]
                  }
        
            }

            var daysFromRes = Object.keys(that.mainOfferData.days).length;


                if(daysFromRes !==7) {
                    for( var i=(daysFromRes + 1); i <= 7 ; i++) {
                        //append placeholder rows
                        if(i !==0 ) { 
                            that.mainOfferData.days[i] = [{
                                "offerId": i,
                                "reward": '',
                                "status": `${i-daysFromRes} ${ (i-daysFromRes)>1 ? that.languages?.days2go || 'days to go!' : that.languages?.day2go || 'day to go!'  }`,
                                "upcoming": true
                            }]
                        }
                        
                    }
                }
        },




        /* function to run every time user clicks the featured gift*/
        openOffer: function() {

            var that = this;
            that.apiError = false;
            that.errorMessage = '';
            that.errorTitle = '';

            try {
                axios.post('/openOffer', 
                    {
                        "userName": that.userName,
                        "hostName": that.hostName
                    })
                    .then(function(response) {
                        if (response.data.code === 200 && response.data.message === 'SUCCESS') {

                            console.log('success openoffer');

                            // add 'is Today GiftOpened' to the browser storage
                            // expires afer 1 day ttl=seconds of 1 day
                            // ls.set('isTodayGiftOpened', true, { ttl: 86400 });
                            that.getHowToPlay();
                            that.switchPage(1);

                            



                        } else {
                            console.log('fail openoffer');
                            that.apiError = true;

                            if( response.data.code === 10002 ) {
                                that.errorMessage = that.languages.alreadyOpenedTheBox;
                                that.errorTitle = that.languages.error;
                            }
                        }
                    })
                    .catch(function(error) {
                        console.log(error, 'fail openoffer');
                        that.apiError = true;
                    });

                    // that.showOffersInPopUp();


            } catch (error) {
                console.info(error);
                that.hideModals();
                that.showOffersInPopUp();
                that.apiError = true;
        
            }

        },







        redirectCta( ctaLink ) {

            var that = this;
            var redLink = '';
            
            if(that.isMobile() === true ) {
                redLink = `https://${that.hostName}/${ ctaLink }`; 
                console.log(redLink);
                window.open(redLink, '_blank').focus();
            } else {
                let desktopDomain = (new URL(that.hostName));
                redLink = `https://${desktopDomain.hostname}/${ ctaLink }`;
                console.log(desktopDomain, desktopDomain.hostname);
                console.log(redLink);
                window.open(redLink, '_blank').focus();
                
            }

        },




        // fix Jan 22, 2023 
        // function to save offerId and redirectlink for the day
        
        
        getSelectedOfferId: function() {

            var that = this;

            for(i=0; i<=that.mainOfferData.offerData.length; i++) {
                if(that.mainOfferData.offerData[i].selected === true) {
                    return that.mainOfferData.offerData[i].currentOfferId;
                }
            }

        },


        getSelectedCtaLink: function() {
            
            var that = this;

            
            for(i=0; i<=that.mainOfferData.offerData.length; i++) {
                if(that.mainOfferData.offerData[i].selected === true) {
                    return that.mainOfferData.offerData[i].ctaURL;
                }
            }

        },




        /* function if user accepts the current Mission */
        acceptOffer: function( offerId ) {


            var that = this;
            that.apiError = false;
            that.errorMessage = '';
            that.isOpenOffer = false;


            try {

                
               setTimeout( function() {
                    axios.post('/acceptOffer', 
                    {
                        "userName": that.userName,
                        "offerId": offerId,
                        "hostName": that.hostName
                    })
                    .then(function(response) {
                        if (response.data.code === 200 && response.data.message === 'SUCCESS') {

                            console.log('success acceptOffer');
                            that.getHowToPlay();

                            that.hideModals();


                        } else {
                            console.log('fail acceptOffer');
                            that.hideModals();
                            that.showInstructions();
                            that.apiError = true;

                            if( response.data.code === 10002 ) {
                                that.errorMessage = that.languages.alreadyClaimedTheBonus;
                                that.errorTitle = that.languages.error;
                            }


                        }
                    })
                    .catch(function(error) {
                        console.log(error, 'fail acceptOffer');
                        that.hideModals();
                        that.showInstructions();
                        that.apiError = true;
                    });
               },300)



            } catch (error) {
                console.info(error);
                that.hideModals();
                that.showInstructions();
                that.apiError = true;
            }

        },
        



        checkOnSelectedStatus: function() {

            var that = this;

            // to search for the todays current offers if any has been selected by the user
            // this function will return a true or false value
            // the purpose of this function is for me to determine which pop-up should show when user clicks on the envelope of the day
            // if checkOnSelectedStatus=== true, then show the almostThere, congratulations, or mission complete pop-up
            // else show the twin pop-up for the offer selection

            that.openOffer();

            try {
                if( that.mainOfferData.offerData[0].selected === null && that.mainOfferData.offerData[1].selected === null ) {

                    console.log('show the twin pop ups 1');
    
                    that.showOffersInPopUp();
    
                } else {
    
                    if (that.mainOfferData.offerData[0].selected === false && that.mainOfferData.offerData[1].selected === false ) {
                        
                        console.log('show the twin pop ups 2');
    
                        that.showOffersInPopUp();
    
                    } else {
    
                        console.log(' show single pop up');
    
                        that.showInstructions();
    
                    }
                    
    
                }
            } catch(err) {
                that.checkOnSelectedStatus();
            }

                
              

            


        },







        /* For mobile users only, check if How it works message is accepted */
        finishTut: function() {

            var that = this;
            localStorage.setItem('howItWorksTutorial', true);
            console.log('finished tutorial');
            that.instructions = false;

        },




        
        
        hideTodaysRewardInTable: function(index ) {

            var that = this;


            if (that.mainOfferData?.currentDay === index ) {
                
                if( that.mainOfferData?.offerData[0].selected===null && that.mainOfferData?.offerData[1].selected===null ) {
                    return true;
                } else {
                    return false;
                }


            } else {
                return false;
            }


            
        },






        /* To check if reward should be hidden */
        needToHideThisReward: function( index, rewardText ) {

            var that = this;

            // check if this reward is the 'AVAILABLE' reward
            // if(that.mainOfferData?.currentDay === index ) {
            //     // check if gift is already opened, then show the reward text
            //     if(ls.get('isTodayGiftOpened')) {
            //         return rewardText;
            //     } else {
            //         return '';
            //     }
            // } else {
            //     return rewardText;
            // }

        },





        /* function to get the language */
        getLang: function( lang ) {

            /* get and set languages */
            var that = this;
            let rand = Math.floor(1000000 + Math.random() * 900000);

            document.documentElement.setAttribute("lang", 'en'); 

            that.langVal = lang;
            
            if( lang === 'eng') {
                $.getJSON('https://res.cloudinary.com/blackbox/raw/upload/v' + rand + '/2023%20God%20of%20Fortune%20Quest/languages/en.json', function(data) {
                    that.languages = data;
                });
            } else if ( lang === 'ind' ) {
                $.getJSON('https://res.cloudinary.com/blackbox/raw/upload/v' + rand + '/2023%20God%20of%20Fortune%20Quest/languages/id.json', function(data) {
                    that.languages = data;
                });
            } else if ( lang === 'vnm' ) {
                $.getJSON('https://res.cloudinary.com/blackbox/raw/upload/v' + rand + '/2023%20God%20of%20Fortune%20Quest/languages/vi.json', function(data) {
                    that.languages = data;
                });
                document.documentElement.setAttribute("lang", 'vi');
            } else if ( lang === 'tha' ) {
                $.getJSON('https://res.cloudinary.com/blackbox/raw/upload/v' + rand + '/2023%20God%20of%20Fortune%20Quest/languages/th.json', function(data) {
                    that.languages = data;
                });
            } else if ( lang === 'jpn' ) {
                $.getJSON('https://res.cloudinary.com/blackbox/raw/upload/v' + rand + '/2023%20God%20of%20Fortune%20Quest/languages/jp.json', function(data) {
                    that.languages = data;
                });
            } else {
                $.getJSON('https://res.cloudinary.com/blackbox/raw/upload/v' + rand + '/2023%20God%20of%20Fortune%20Quest/languages/en.json', function(data) {
                    that.languages = data;
                });
            }

            return that.languages;
            

        },







        /* get the list of past days in the main banner */
        getDoneDays: function() {

            var that = this;
            var days = [1,2,3,4,5,6,7];
            var doneDay = that.mainOfferData.currentDay;
            
            return days.splice(0, (Number(doneDay) - 1) );

        },




        /* get the list of remaining days in the main banner */

        getRemainDays: function() {

            var that = this;
            var days = [1,2,3,4,5,6,7];
            var currentDay = that.mainOfferData.currentDay;
            
            return days.splice(Number(currentDay));

        },

        returnReverseDays: function() {
            return [1,2,3,4,5,6,7].reverse();
        },

        
        



        checkSingleDigit: function( val ) {
            var valAsString = val.toString();
            if (valAsString.length === 1) {
                return true;
            }
            return false;
        },

        tensOnes: function(get, num) {
            
            let tens = Math.floor(num / 10);
            let ones = num % 10;

            if(get==='tens') {
                return tens;
            } else {  
                return ones;
            }


        },

        initCountdown: function() {

            var that = this;
            var eventTime, currentTime, duration, interval, intervalId;

                interval = 1000; // 1 second

            // get time element
            // calculate difference between two times
            // Sun, 20 Nov 2022 15:50:00 GMT

            eventTime = moment.tz(  '20230513', "Asia/Yerevan");
            // based on time set in user's computer time / OS

            currentTime = moment.utc();
            // get duration between two otimes
            
            duration = moment.duration(eventTime.diff(currentTime));



            // loop to countdown every 1 second
            setInterval(function() {

                // get updated duration
                duration = moment.duration(duration - interval, 'milliseconds');

                // if duration is >= 0
                if (duration.asSeconds() <= 0) {
                    clearInterval(intervalId);
                    // hide the countdown element
                    that.countdownMode = false;
                } else {
                    // otherwise, show the updated countdown
                    that.cd_days = duration.days();
                    that.cd_hours = duration.hours();
                    that.cd_minutes = duration.minutes();
                    that.cd_seconds = duration.seconds();
                    
                }
                }, interval);

        },

    },

   





    mounted() {
     
        
        const that = this;


        $('#close-modal').on("click", function() {
            that.hideModals();
        });

    },

    created() {
        
        const that = this;

        /* set language from URL Params */
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
          });
        let langVal = params.lang; 

        that.userName = params.jwt || 'lVLaa123432';
        that.hostName = params.host || 'https://happistar.org';


        that.getLang(langVal);
        that.getHowToPlay();
        that.getRemainDays();
        that.initCountdown();

        if(that.countdownMode === false) {
            that.switchPage(1);
        }

        /* hide the video after it ends*/
        // setTimeout( function(){
        //     $('#video-first').fadeOut('slow');
        //     // then show the real gift boxes
        //     setTimeout( function() {
        //         $('#real-second').fadeIn('fast');
        //         //then show the how it works pop up if the device is mobile
                
        //             // if(that.isMobile() === true) {
        //             //     console.log('is mobile')
        //             //     // if user has not seen the tutorial yet
        //             //     if(!localStorage.getItem('howItWorksTutorial')) {
        //             //         that.instructions = true;
        //             //         that.showInstructions();
        //             //     }
        //             // } else {
        //             //     console.log('not mobile')
        //             // }
                
        //     },500);


        //     //remove this on January 22, 2023
            
        //     // $('#myModal3').fadeIn('slow');
        //     // (function fun() {
        //     //     $('.modal-content').css({
        //     //         'transform': that.isMobile()=== true ? 'translateY(0px)' : 'translateY(0px)'
        //     //     });
        //     // })();

        //     //end remove


        // }, 9000);

      

          

    
    }
    
});

