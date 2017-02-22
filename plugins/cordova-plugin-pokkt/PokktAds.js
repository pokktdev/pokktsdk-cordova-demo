var PokktExtension = function () {};

/**
 * Pokkt Standard APIs
 **/
 
PokktExtension.prototype.setPokktConfig = function (appId, securityKey) {
 	var param = {};
    param.appId = appId;
    param.securityKey = securityKey;
    notifyNative('setPokktConfig', undefined, param);
};

PokktExtension.prototype.setThirdPartyUserId = function (thirdPartyUserId) {
    notifyNative('setThirdPartyUserId', undefined, thirdPartyUserId);
};

PokktExtension.prototype.getSDKVersion = function (callback) {
    notifyNative('getSDKVersion', callback);
};

PokktExtension.prototype.setAdPlayerViewConfig = function(adPlayerViewConfig) {
    notifyNative('setAdPlayerViewConfig', undefined, adPlayerViewConfig);
};

PokktExtension.prototype.setUserDetails = function(userDetails) {
    notifyNative('setUserDetails', undefined, userDetails);
};

/**
 * Debugging related APIs
 **/
 
PokktExtension.prototype.setDebug = function (debug) {
    notifyNative('Debugging_shouldDebug', undefined, debug);
};

PokktExtension.prototype.exportLog = function () {
    notifyNative('Debugging_exportLog');
};

PokktExtension.prototype.exportLogToCloud = function () {
    notifyNative('Debugging_exportLogToCloud');
};

PokktExtension.prototype.showLog = function (message) {
    notifyNative('Debugging_showLog', undefined, message);
};

PokktExtension.prototype.showToast = function (message) {
    notifyNative('Debugging_showToast', undefined, message);
};


/**
 * Video Ad related APIs
 **/

PokktExtension.prototype.cacheRewardedVideoAd = function(screenName) {
    notifyNative('VideoAd_cacheRewarded', undefined, screenName);
};

PokktExtension.prototype.cacheNonRewardedVideoAd = function(screenName) {
    notifyNative('VideoAd_cacheNonRewarded', undefined, screenName);
};

PokktExtension.prototype.showRewardedVideoAd = function(screenName) {
    notifyNative('VideoAd_showRewarded', undefined, screenName);
};

PokktExtension.prototype.showNonRewardedVideoAd = function(screenName) {
    notifyNative('VideoAd_showNonRewarded', undefined, screenName);
};

PokktExtension.prototype.checkRewardedVideoAdAvailability = function(screenName) {
    notifyNative('VideoAd_checkAdAvailability_rewarded', undefined, screenName);
};

PokktExtension.prototype.checkNonRewardedVideoAdAvailability = function(screenName) {
    notifyNative('VideoAd_checkAdAvailability_nonRewarded', undefined, screenName);
};

/**
 * Interstitial related APIs
 **/

PokktExtension.prototype.cacheRewardedInterstitial = function(screenName) {
    notifyNative('Interstitial_cacheRewarded', undefined, screenName);
};

PokktExtension.prototype.cacheNonRewardedInterstitial = function(screenName) {
    notifyNative('Interstitial_cacheNonRewarded', undefined, screenName);
};

PokktExtension.prototype.showRewardedInterstitial = function(screenName) {
    notifyNative('Interstitial_showRewarded', undefined, screenName);
};

PokktExtension.prototype.showNonRewardedInterstitial = function(screenName) {
    notifyNative('Interstitial_showNonRewarded', undefined, screenName);
};

PokktExtension.prototype.checkRewardedInterstitialAvailability = function(screenName) {
    notifyNative('Interstitial_checkAdAvailability_rewarded', undefined, screenName);
};

PokktExtension.prototype.checkNonRewardedInterstitialAvailability = function(screenName) {
    notifyNative('Interstitial_checkAdAvailability_nonRewarded', undefined, screenName);
};

/**
 * InGame Ad related Methods
 **/

PokktExtension.prototype.fetchAssetsOfInaGameAd = function(screenName) {
    notifyNative('InGameAd_fetchAssets', undefined, screenName);
};

/**
 * Analytics related APIs
 **/

PokktExtension.prototype.setAnalyticsDetails = function(analyticsDetails) {
    notifyNative('Analytics_setAnalyticsDetails', undefined, analyticsDetails);
};

PokktExtension.prototype.updateIGAData = function(igaData) {
    notifyNative('Analytics_updateIGAData', undefined, igaData);
};

PokktExtension.prototype.notifyAppInstall= function () {
    notifyNative('Analytics_notifyAppInstall');
};

PokktExtension.prototype.trackIAP= function (details) {
    notifyNative('Analytics_trackIAP', undefined, details);
};

/**
 * createAdPlayerViewConfig Method
 **/

PokktExtension.prototype.createAdPlayerViewConfig = function () {
    return {
        defaultSkipTime: 5,
        shouldAllowSkip: true,
        shouldAllowMute: true,
        shouldConfirmSkip: true,
        skipConfirmMessage: 'Do you want to skip the video?',
        skipConfirmYesLabel: 'Okay',
        skipConfirmNoLabel: 'Nope',
        skipTimerMessage: 'Must watch for ## seconds',
        incentiveMessage: 'more seconds to go!',
        shouldCollectFeedback: true
    };
};

/**
 * createUserDetails Method
 **/

PokktExtension.prototype.createUserDetails = function () {
    return {
     	name: '',
        age: '',
        sex: '',
        mobileNo: '',
        emailAddress: '',
        location: '',
        birthday: '',
        maritalStatus: '',
        facebookId: '',
        twitterHandle: '',
        education: '',
        nationality: '',
        employment: '',
        maturityRating: ''
    };
};

PokktExtension.prototype.createAnalyticsDetails = function () {
    return {
     	googleAnalyticsID: '',
        mixPanelProjectToken: '',
        flurryApplicationKey: '',
        selectedAnalyticsType: ''
		};
};

// ------- NATIVE NOTIFIERS -------

function notifyNative(operation, successCallback, param) {
    if (successCallback == null || successCallback == undefined) {
        successCallback = function (result) {
            console.log(operation + ' was successful! result: ' + result);
        };
    }

    var errorCallback = function(error) {
        console.log(operation + ' failed! error: ' + error);
    };

    console.log('executing operation: ' + operation + ' with param: ' + param);
    cordova.exec(successCallback, errorCallback, 'PokktNativeExtension', operation, [param]);
}


// ------------------------------

if (!window.plugins) {
    window.plugins = {};
}

if (!window.plugins.pokktExtension) {
    window.plugins.pokktExtension = new PokktExtension();
}

if (typeof module != 'undefined' && module.exports) {
    module.exports = PokktExtension;
}
// ------------------------------
