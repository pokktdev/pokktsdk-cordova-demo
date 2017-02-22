var rewardedAdShowRequested = false;
var currentScreenName = "";
var totalRewardEarned = 0;
var pe = null;

var videoScreenController = {
    initialize: function(screenName) {
        this.bindEvents();
        currentScreenName = screenName;
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('VideoAdAvailability', this.handleAdAvailability, false);
        document.addEventListener('VideoAdCachingCompleted', this.handleAdCachingCompleted, false);
        document.addEventListener('VideoAdCachingFailed', this.handleAdCachingFailed, false);
        document.addEventListener('VideoAdDisplayed', this.handleAdDisplayed, false);
        document.addEventListener('VideoAdSkipped', this.handleAdSkipped, false);
        document.addEventListener('VideoAdCompleted', this.handleAdCompleted, false);
        document.addEventListener('VideoAdClosed', this.handleAdClosed, false);
        document.addEventListener('VideoAdGratified', this.handleAdGratified, false);
        document.addEventListener('VideoAdFailedToShow', this.handleAdShowFailed, false);
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
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " video ad for "
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
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " video ad Caching completed for " + screenName + ", associated vc is " + object.REWARD);
        
        
        document.getElementById('labelStatus').innerHTML = "Video ad cached!";
        
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

        console.log ("Subhendu AdCaching Failed Came here");
        pe.showLog("params: " + params);
        
        var object = JSON.parse(params.param);
        
        var screenName = object.SCREEN_NAME;
        var isRewarded = false;
        
        if (object.SCREEN_NAME != currentScreenName)
            return;
        
        if (object.IS_REWARDED == true)
            isRewarded = true;
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " video ad Caching failed for "+ screenName + "! message: " + object.ERROR_MESSAGE);
        
        
        document.getElementById('labelStatus').innerHTML = "Video ad caching failed!";
        
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

        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " video ad displayed for "
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
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " video ad is skipped for "
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
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " video ad is completed for "
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
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " video ad is closed for "
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
        
        console.log("video ad for " + screenName + " is gratified! reward received: " + object.REWARD);
        
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
        
        console.log((isRewarded == true ? "Rewarded" : "Non-rewarded") + " video ad failed to show for "
                    + screenName + "! message: " + object.ERROR_MESSAGE);
        
        document.getElementById('labelStatus').innerHTML = "video ad show failed!";
        
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

        pe.cacheRewardedVideoAd(currentScreenName);
    },

    onClickShowRewardedAd: function() {
        pe.showRewardedVideoAd(currentScreenName);
    },

    onClickCacheNonRewardedAd: function() {
        document.getElementById('buttonCacheNonRewardedAd').value = 'non-rewarded ad is downloading...';
        document.getElementById('buttonCacheNonRewardedAd').disabled = true;
        document.getElementById('buttonShowNonRewardedAd').value = 'non-rewarded ad is downloading...';
        document.getElementById('buttonShowNonRewardedAd').disabled = true;

        pe.cacheNonRewardedVideoAd(currentScreenName);
    },

    onClickShowNonRewardedAd: function() {
        pe.showNonRewardedVideoAd(currentScreenName);
    },

    exportLog: function() {
        pe.exportLog();
    }
};
