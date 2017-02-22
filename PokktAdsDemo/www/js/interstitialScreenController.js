var rewardedAdShowRequested = false;
var currentScreenName = "";
var currentAdConfig = null;
var totalRewardEarned = 0;
var pe = null;

var interstitialScreenController = {
    initialize: function(screenName) {
        this.bindEvents();
        currentScreenName = screenName;
        console.log('interstitial controller for ' + screenName);
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('InterstitialAvailability', this.handleAdAvailability, false);
        document.addEventListener('InterstitialCachingCompleted', this.handleAdCachingCompleted, false);
        document.addEventListener('InterstitialCachingFailed', this.handleAdCachingFailed, false);
        document.addEventListener('InterstitialDisplayed', this.handleAdDisplayed, false);
        document.addEventListener('InterstitialSkipped', this.handleAdSkipped, false);
        document.addEventListener('InterstitialCompleted', this.handleAdCompleted, false);
        document.addEventListener('InterstitialClosed', this.handleAdClosed, false);
        document.addEventListener('InterstitialGratified', this.handleAdGratified, false);
        document.addEventListener('InterstitialFailedToShow', this.handleAdShowFailed, false);
    },

    onDeviceReady: function() {
        console.log('device is ready!');

        pe = window.plugins.pokktExtension;

        document.getElementById('labelScreenName').innerHTML = currentScreenName;
    },

    handleAdAvailability: function(params) {
        pe.showLog("params: " + params);
        
        var object = JSON.parse(params.param);
        
        var screenName = object.SCREEN_NAME;
        var isRewarded = false;
        var isAvailable = object.IS_AVAILABLE;
        
        if (object.SCREEN_NAME != currentScreenName)
            return;
        
        if (object.IS_REWARDED == true)
            isRewarded = true;
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " interstitial for "
                    + screenName + ", is " + (isAvailable ? "available!" : "not available!"));
        
        document.getElementById('labelStatus').innerHTML = isAvailable ? "ad available!" : "no ads available";
    },

    handleAdCachingCompleted: function(params) {
        pe.showLog("params: " + params);
        
        var object = JSON.parse(params.param);
        
        var screenName = object.SCREEN_NAME;
        var isRewarded = false;
        
        if (object.SCREEN_NAME != currentScreenName)
            return;
        
        if (object.IS_REWARDED == true)
            isRewarded = true;
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " interstitial Caching completed for "
                    + screenName + ", associated vc is " + object.REWARD);
        
        document.getElementById('labelStatus').innerHTML = "ad cached!";
        
        if (isRewarded == true) {
            document.getElementById('buttonCacheRewardedAd').value = 'rewarded ad is cached!';
            document.getElementById('buttonShowRewardedAd').value = 'Show Rewarded Ad (Cached)';
            document.getElementById('buttonShowRewardedAd').disabled = false;
        } else {
            document.getElementById('buttonCacheNonRewardedAd').value = 'non-rewarded ad is cached!';
            document.getElementById('buttonShowNonRewardedAd').value = 'Show Non-Rewarded Ad (Cached)';
            document.getElementById('buttonShowNonRewardedAd').disabled = false;
        }
    },

    handleAdCachingFailed: function(params) {
        pe.showLog("params: " + params);
        
        var object = JSON.parse(params.param);
        
        var screenName = object.SCREEN_NAME;
        var isRewarded = false;
        
        if (object.SCREEN_NAME != currentScreenName)
            return;
        
        if (object.IS_REWARDED == true)
            isRewarded = true;
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " interstitial Caching failed for "
                    + screenName + "! message: " + object.ERROR_MESSAGE);
        
        document.getElementById('labelStatus').innerHTML = "ad caching failed!";
        
        if (isRewarded == true) {
            document.getElementById('buttonCacheRewardedAd').value = 'Cache Rewarded Ad';
            document.getElementById('buttonShowRewardedAd').value = 'Show Rewarded Ad';
            document.getElementById('buttonCacheRewardedAd').disabled = false;
            document.getElementById('buttonShowRewardedAd').disabled = false;
        } else {
            document.getElementById('buttonCacheNonRewardedAd').value = 'Cache Non-Rewarded Ad';
            document.getElementById('buttonShowNonRewardedAd').value = 'Show Non-Rewarded Ad';
            document.getElementById('buttonCacheNonRewardedAd').disabled = false;
            document.getElementById('buttonShowNonRewardedAd').disabled = false;
        }
    },

    handleAdDisplayed: function(params) {

        var object = JSON.parse(params.param);
        
        var screenName = object.SCREEN_NAME;
        var isRewarded = false;
        
        if (object.SCREEN_NAME != currentScreenName)
            return;
        
        if (object.IS_REWARDED == true)
            isRewarded = true;
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " interstitial ad displayed for "
                    + screenName);
        
        document.getElementById('labelStatus').innerHTML = "ad displayed!";
        
        if (isRewarded == true) {
            document.getElementById('buttonCacheRewardedAd').disabled = true;
            document.getElementById('buttonShowRewardedAd').disabled = true;
        } else {
            document.getElementById('buttonCacheNonRewardedAd').disabled = true;
            document.getElementById('buttonShowNonRewardedAd').disabled = true;
        }
    },

    handleAdSkipped: function(params) {
        
        var object = JSON.parse(params.param);
        
        var screenName = object.SCREEN_NAME;
        var isRewarded = false;
        
        if (object.SCREEN_NAME != currentScreenName)
            return;
        
        if (object.IS_REWARDED == true)
            isRewarded = true;
        
        if (object.AD_FORMAT == "INTERSTITIAL")
            console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " interstitial ad is skipped for "
                        + screenName );
        
        document.getElementById('labelStatus').innerHTML = "ad skipped!";
    },

    handleAdCompleted: function(params) {

        var object = JSON.parse(params.param);
        var screenName = object.SCREEN_NAME;
        var isRewarded = false;
        
        if (object.SCREEN_NAME != currentScreenName)
            return;
        
        if (object.IS_REWARDED == true)
            isRewarded = true;
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " interstitial ad is completed for "
                    + screenName );
        
        document.getElementById('labelStatus').innerHTML = "ad completed!";
    },

    handleAdClosed: function(params) {
        var object = JSON.parse(params.param);
        var screenName = object.SCREEN_NAME;
        var isRewarded = false;
        
        if (object.SCREEN_NAME != currentScreenName)
            return;
        
        if (object.IS_REWARDED == true)
            isRewarded = true;
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " interstitial ad is closed for "
                    + screenName + "!" );
        
        if (isRewarded == true) {
            document.getElementById('buttonCacheRewardedAd').value = 'Cache Rewarded Ad';
            document.getElementById('buttonShowRewardedAd').value = 'Show Rewarded Ad';
            document.getElementById('buttonCacheRewardedAd').disabled = false;
            document.getElementById('buttonShowRewardedAd').disabled = false;
        } else {
            document.getElementById('buttonCacheNonRewardedAd').value = 'Cache Non-Rewarded Ad';
            document.getElementById('buttonShowNonRewardedAd').value = 'Show Non-Rewarded Ad';
            document.getElementById('buttonCacheNonRewardedAd').disabled = false;
            document.getElementById('buttonShowNonRewardedAd').disabled = false;
        }
    },

    handleAdGratified: function(params) {
        var object = JSON.parse(params.param);
        var screenName = object.SCREEN_NAME;
        var isRewarded = false;
        
        if (object.SCREEN_NAME != currentScreenName)
            return;
        
        if (object.IS_REWARDED == true)
            isRewarded = true;
        
        console.log("Interstitial ad for " + screenName + " is gratified! reward received: " + object.REWARD);
        
        totalRewardEarned += reward;
        document.getElementById('labelPointsEarned').innerHTML = "Points Earned: " + totalRewardEarned;
    },

    handleAdShowFailed: function(params) {
        pe.showLog("params: " + params);
        
        var object = JSON.parse(params.param);
        
        var screenName = object.SCREEN_NAME;
        var isRewarded = false;
        
        if (object.SCREEN_NAME != currentScreenName)
            return;
        
        if (object.IS_REWARDED == true)
            isRewarded = true;
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " interstitial show ad failed for "
                    + screenName + "! message: " + object.ERROR_MESSAGE);
        
        document.getElementById('labelStatus').innerHTML = "Interstitial ad show failed!";
        
        if (isRewarded == true) {
            document.getElementById('buttonCacheRewardedAd').value = 'Cache Rewarded Ad';
            document.getElementById('buttonShowRewardedAd').value = 'Show Rewarded Ad';
            document.getElementById('buttonCacheRewardedAd').disabled = false;
            document.getElementById('buttonShowRewardedAd').disabled = false;
        } else {
            document.getElementById('buttonCacheNonRewardedAd').value = 'Cache Non-Rewarded Ad';
            document.getElementById('buttonShowNonRewardedAd').value = 'Show Non-Rewarded Ad';
            document.getElementById('buttonCacheNonRewardedAd').disabled = false;
            document.getElementById('buttonShowNonRewardedAd').disabled = false;
        }
    },

    onClickCacheRewardedAd: function() {
        document.getElementById('buttonCacheRewardedAd').value = 'rewarded ad is downloading...';
        document.getElementById('buttonCacheRewardedAd').disabled = true;
        document.getElementById('buttonShowRewardedAd').value = 'rewarded ad is downloading...';
        document.getElementById('buttonShowRewardedAd').disabled = true;

        console.log('interstitial controller cache rewarded ad for ' + currentScreenName);


        pe.cacheRewardedInterstitial(currentScreenName);
    },

    onClickShowRewardedAd: function() {
        pe.showRewardedInterstitial(currentScreenName);
    },

    onClickCacheNonRewardedAd: function() {
        document.getElementById('buttonCacheNonRewardedAd').value = 'non-rewarded ad is downloading...';
        document.getElementById('buttonCacheNonRewardedAd').disabled = true;
        document.getElementById('buttonShowNonRewardedAd').value = 'non-rewarded ad is downloading...';
        document.getElementById('buttonShowNonRewardedAd').disabled = true;

        console.log('interstitial controller cache non rewarded ad for ' + currentScreenName);

        pe.cacheNonRewardedInterstitial(currentScreenName);
    },

    onClickShowNonRewardedAd: function(isInterstitial) {
        pe.showNonRewardedInterstitial(currentScreenName);
    },

    exportLog: function() {
        pe.exportLog();
    }
};
