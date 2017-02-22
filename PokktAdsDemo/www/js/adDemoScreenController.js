var rewardedAdShowRequested = false;
var currentScreenName = "";
var currentAdConfig = null;
var totalRewardEarned = 0;
var pe = null;

var adController = {
    initialize: function(screenName) {
        this.bindEvents();
        currentScreenName = screenName;
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        document.addEventListener('AdAvailability', this.handleAdAvailability, false);
        document.addEventListener('AdCachingCompleted', this.handleAdCachingCompleted, false);
        document.addEventListener('AdCachingFailed', this.handleAdCachingFailed, false);
        document.addEventListener('AdDisplayed', this.handleAdDisplayed, false);
        document.addEventListener('AdSkipped', this.handleAdSkipped, false);
        document.addEventListener('AdCompleted', this.handleAdCompleted, false);
        document.addEventListener('AdClosed', this.handleAdClosed, false);
        document.addEventListener('AdGratified', this.handleAdGratified, false);
    },

    onDeviceReady: function() {
        console.log('device is ready!');

        pe = window.plugins.pokktExtension;

        currentAdConfig = pe.createAdConfig();
        currentAdConfig.screenName = currentScreenName;

        document.getElementById('labelScreenName').innerHTML = currentAdConfig.screenName;
    },

    handleAdAvailability: function(params) {
        var adConfig = JSON.parse(params.param);
        var isAvailable = adConfig.extraValues['IS_AVAILABLE'];
        if (adConfig.isRewarded == "true")
            adConfig.isRewarded = true;

        if (currentAdConfig.screenName != adConfig.screenName)
            return;

        console.log((adConfig.isRewarded == true ? "rewarded" : "non-rewarded") + " ad for "
            + adConfig.screenName + ", is " + (isAvailable ? "available!" : "not available!"));

        document.getElementById('labelStatus').innerHTML = isAvailable ? "ad available!" : "no ads available";

        if (rewardedAdShowRequested && adConfig.isRewarded == true) {
            pe.showAd(adConfig);
            rewardedAdShowRequested = false;
        }
    },

    handleAdCachingCompleted: function(params) {
        pe.showLog(params);

        var adConfig = JSON.parse(params.param);
        var vc = adConfig.extraValues['AD_VC'];
        if (adConfig.isRewarded == "true")
            adConfig.isRewarded = true;

        console.log((adConfig.isRewarded == true ? "rewarded" : "non-rewarded") + " ad is cached for "
            + adConfig.screenName + ", associated vc is " + vc);

        if (currentAdConfig.screenName != adConfig.screenName)
            return;

        document.getElementById('labelStatus').innerHTML = "ad cached!";

        if (adConfig.isRewarded == true) {
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
        var adConfig = JSON.parse(params.param);
        var message = adConfig.extraValues['MESSAGE'];
        if (adConfig.isRewarded == "true")
            adConfig.isRewarded = true;

        console.log((adConfig.isRewarded == true ? "rewarded" : "non-rewarded") + " ad caching failed for "
            + adConfig.screenName + "! message: " + message);

        if (currentAdConfig.screenName != adConfig.screenName)
            return;

        document.getElementById('labelStatus').innerHTML = "ad caching failed!";

        if (adConfig.isRewarded == true) {
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
        var adConfig = JSON.parse(params.param);
        if (adConfig.isRewarded == "true")
            adConfig.isRewarded = true;

        if (currentAdConfig.screenName != adConfig.screenName)
            return;

        console.log((adConfig.isRewarded == true ? "rewarded" : "non-rewarded") + " ad is displayed for " + adConfig.screenName + "!");

        document.getElementById('labelStatus').innerHTML = "ad displayed!";

        if (adConfig.isRewarded == true) {
            document.getElementById('buttonCacheRewardedAd').disabled = true;
            document.getElementById('buttonShowRewardedAd').disabled = true;
        } else {
            document.getElementById('buttonCacheNonRewardedAd').disabled = true;
            document.getElementById('buttonShowNonRewardedAd').disabled = true;
        }
    },

    handleAdSkipped: function(params) {
        var adConfig = JSON.parse(params.param);
        if (adConfig.isRewarded == "true")
            adConfig.isRewarded = true;

        if (currentAdConfig.screenName != adConfig.screenName)
            return;

        console.log((adConfig.isRewarded == true ? "rewarded" : "non-rewarded") + " ad is skipped for " + adConfig.screenName + "!");

        document.getElementById('labelStatus').innerHTML = "ad skipped!";
    },

    handleAdCompleted: function(params) {
        var adConfig = JSON.parse(params.param);

        if (currentAdConfig.screenName != adConfig.screenName)
            return;

        console.log((adConfig.isRewarded == true ? "rewarded" : "non-rewarded") + " ad is completed for " + adConfig.screenName + "!");

        document.getElementById('labelStatus').innerHTML = "ad completed!";
    },

    handleAdClosed: function(params) {
        var adConfig = JSON.parse(params.param);
        var backPressed = adConfig.extraValues['BACK_BUTTON'];
        if (adConfig.isRewarded == "true")
            adConfig.isRewarded = true;

        if (currentAdConfig.screenName != adConfig.screenName)
            return;

        console.log((adConfig.isRewarded == true ? "rewarded" : "non-rewarded") + " ad is closed for " + adConfig.screenName + "!");

        if (adConfig.isRewarded == true) {
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
        var adConfig = JSON.parse(params.param);
        var reward = parseFloat(adConfig.extraValues['REWARD']);
        if (adConfig.isRewarded == "true")
            adConfig.isRewarded = true;

        if (currentAdConfig.screenName != adConfig.screenName)
            return;

        console.log("ad for " + adConfig.screenName + " is gratified! reward received: " + reward);
        totalRewardEarned += reward;
        document.getElementById('labelPointsEarned').innerHTML = "Points Earned: " + totalRewardEarned;
    },

    onClickCacheRewardedAd: function(isInterstitial) {
        document.getElementById('buttonCacheRewardedAd').value = 'rewarded ad is downloading...';
        document.getElementById('buttonCacheRewardedAd').disabled = true;
        document.getElementById('buttonShowRewardedAd').value = 'rewarded ad is downloading...';
        document.getElementById('buttonShowRewardedAd').disabled = true;

        currentAdConfig.isRewarded = true;
        currentAdConfig.adFormat = isInterstitial ? 3 : 0;
        pe.cacheAd(currentAdConfig);
    },

    onClickShowRewardedAd: function(isInterstitial) {
        currentAdConfig.isRewarded = true;
        currentAdConfig.adFormat = isInterstitial ? 3 : 0;
        if (!rewardedAdShowRequested) {
            rewardedAdShowRequested = true;
            console.log("checking for any available rewarded-ad...");

            pe.checkAdAvailability(currentAdConfig);
        } else {
            pe.showAd(currentAdConfig);
        }
    },

    onClickCacheNonRewardedAd: function(isInterstitial) {
        document.getElementById('buttonCacheNonRewardedAd').value = 'non-rewarded ad is downloading...';
        document.getElementById('buttonCacheNonRewardedAd').disabled = true;
        document.getElementById('buttonShowNonRewardedAd').value = 'non-rewarded ad is downloading...';
        document.getElementById('buttonShowNonRewardedAd').disabled = true;

        currentAdConfig.isRewarded = false;
        currentAdConfig.adFormat = isInterstitial ? 3 : 0;
        pe.cacheAd(currentAdConfig);
    },

    onClickShowNonRewardedAd: function(isInterstitial) {
        currentAdConfig.isRewarded = false;
        currentAdConfig.adFormat = isInterstitial ? 3 : 0;
        pe.showAd(currentAdConfig);
    },

    exportLog: function() {
        pe.exportLog();
    }
};