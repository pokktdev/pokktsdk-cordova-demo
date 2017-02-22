var offerwallController = {

    initialize: function() {
        this.bindEvents()
	},

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        document.addEventListener('CoinResponse', this.onCoinResponse, false);
        document.addEventListener('CoinResponseWithTransId', this.onCoinResponseWithTransId, false);
        document.addEventListener('CoinResponseFailed', this.onCoinResponseFailed, false);
        document.addEventListener('CampaignAvailability', this.onCampaignAvailability, false);
        document.addEventListener('OfferwallClosed', this.onOfferwallClosed, false);
    },

    onDeviceReady: function() {
        console.log('device is ready!');
    },

    onCoinResponse: function(params) {
        console.log('onCoinResponse: ' + params.param);
        var labelPointsEarned = document.getElementById('labelPointsEarned');
        labelPointsEarned.innerHTML = params.param;
    },

    onCoinResponseWithTransId: function(params) {
        console.log('onCoinResponseWithTransId: ' + params.param);
        var labelPointsEarned = document.getElementById('labelPointsEarned');
        labelPointsEarned.innerHTML = params.param;
    },

    onCoinResponseFailed: function(params) {
        console.log('onCoinResponseFailed: ' + params.param);
    },

    onCampaignAvailability: function(params) {
        console.log('onCampaignAvailability: ' + params.param);
    },

    onOfferwallClosed: function(params) {
        console.log('onOfferwallClosed: ' + params.param);
    },

    getOfferwallAnyValue: function() {
        window.plugins.pokktExtension.getCoins(0);
    },

    getOfferwallFixedValue: function() {
        var textAssetValue = document.getElementById('textAssetValue');
        window.plugins.pokktExtension.getCoins(textAssetValue.value);
    },

    getPendingCoins: function() {
        window.plugins.pokktExtension.getPendingCoins();
    },
    
    exportLog: function() {
        window.plugins.pokktExtension.exportLog();
    }
};
