var pe = null;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        console.log('device is ready!');

        pe = window.plugins.pokktExtension;

        pe.setDebug(true);

        pe.setPokktConfig('3569dadb8ab5f256b071bc7426852f9f', 'b5fed029a5b0aab4956db9a46db9197d');
    },

        onClickAdDemoScreen1: function() {
        window.location = "VideoScreen.html";
    },

    onClickAdDemoScreen2: function() {
        window.location = "interstitialScreen.html";
    },

    onClickShowBanner: function() {
        console.log("attempting to show a banner: ");
        pe.loadBanner('PhoneGapDemoBanner', '2'); // PhoneGapDemoBanner is the screenName(placement id)
    },

    onClickDemoOfferwall: function() {
        window.location = "offerwallScreen.html";
    },

    exportLog: function() {
        pe.exportLog();
    }
};
